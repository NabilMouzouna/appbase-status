# AppBase — PFE Project Context

> This document is the single source of truth for the AppBase PFE project. It captures the project vision, architectural decisions, scope, and execution plan. Use this as context when working on any part of the project.

---

## Project Identity

**Name:** AppBase
**Type:** Final Year Project (PFE) — Network and Telecommunications Engineering
**Duration:** ~1 month remaining for build + buffer days for report and defense preparation
**Developer:** Solo project, TypeScript-based, leveraging Claude Code for implementation speed

---

## What AppBase Is

AppBase is a **self-hosted, plug-and-play backend infrastructure platform** designed for small organizations (specifically clinics) that need cloud-like developer experience without sending data outside their local network.

Think of it as a **Synology NAS for developers**: install once on any machine in the LAN, and the organization gets a complete backend platform — auth, database, file storage, frontend hosting — accessible from any device on the network via friendly subdomains.

**One-line pitch:** *"AppBase turns any machine in a clinic into a private cloud — one installation gives every developer on the network stable URLs, shared backend services, and hosted frontends, with zero internet dependency and zero configuration after setup."*

---

## The Problem AppBase Solves

Small clinics need internal applications (patient records, task management, employee tools) but face a dilemma:

| Existing Solution | Why It Fails for Clinics |
|---|---|
| Firebase / Supabase Cloud | Patient data cannot leave premises (compliance) |
| Self-hosted Supabase / Appwrite | Requires DevOps expertise the clinic doesn't have |
| PocketBase / single-binary tools | No multi-app isolation, no LAN-native networking |
| Custom servers per app | Heavy footprint, no shared services, no SSO |

**The gap:** No solution combines BaaS services + LAN-native networking + plug-and-play installation in a single product deployable on commodity hardware in under 10 minutes.

**Target user:** A small clinic (10-50 staff) with one IT-capable person, no DevOps team, and a need to keep patient data on-premises.

---

## Core Architectural Decisions

### Decision 1 — Single-host, multi-tenant (not per-app instances)

**Choice:** One AppBase installation per organization, hosting many apps as logical tenants.

**Why:** The original "one instance per app" model produced 1.25GB containers per app — unsustainable for a clinic running 5+ apps. Shifting to shared services with tenant isolation matches what Firebase, Supabase, and Amplify Gen 2 actually do.

**Rejected alternative:** Per-app containers (too heavy, no SSO, no shared services).

### Decision 2 — Docker Compose, not Kubernetes

**Choice:** Single-host deployment with Docker Compose orchestrating ~5-6 containers.

**Why:** Kubernetes solves multi-machine clustering, auto-scaling, and high-availability — none of which apply to a single clinic on a mini-PC. Compose is the correct tool for single-host orchestration.

**Rejected alternative:** Kubernetes, Docker Swarm, Nomad.

### Decision 3 — Apps are database rows, not containers

**Choice:** When a developer creates an app, AppBase inserts a row in an `apps` table with an API key. No container is spawned.

**Why:** Apps consume shared services (auth, database, storage) via API key scoping. No per-app process means trivial scaling — 1000 apps cost the same as 1 app in memory.

### Decision 4 — Frontends are static files served by Caddy

**Choice:** Developers build SPAs (React, Vue, Svelte) locally and upload `dist/` folders. AppBase serves them as static files.

**Why:** Apps don't need a Node.js runtime because AppBase IS the backend. Static hosting is simple, fast, and matches the BaaS model (Firebase Hosting, Amplify).

**Limitation accepted:** No SSR (Next.js with `output: 'export'` works; Next.js with API routes does not). Documented in perspectives.

### Decision 5 — Postgres, not SQLite

**Choice:** Switch from SQLite (used in original per-instance design) to PostgreSQL for the multi-tenant model.

**Why:** Multi-tenant concurrent writes need real concurrency support. SQLite was correct for one-app-per-instance; Postgres is correct for shared.

### Decision 6 — DNS resolution: mDNS primary, CoreDNS fallback

**Choice:** Both mDNS (for zero-config) and CoreDNS (for production reliability) included in the stack.

**Why:** mDNS handles ~85% of devices automatically (the "magic" of plug-and-play). CoreDNS covers the remaining 15% (Android, corporate networks blocking multicast) when the LAN router's DNS is pointed at AppBase.

**Defense strategy:** Bring a pre-configured router to defense day — controls the demo network entirely.

### Decision 7 — Caddy for reverse proxy

**Choice:** Caddy over nginx or Traefik.

**Why:** Automatic HTTPS for local domains, simple config syntax (Caddyfile), built-in subdomain routing. Nginx requires more boilerplate; Traefik is overkill for this scope.

### Decision 8 — Custom organization domain

**Choice:** During install, the user enters their organization name (e.g., "nuble") and the entire platform uses `*.nuble.local` as its domain.

**Why:** A clinic accessing `nuble.local` feels personal and professional. Generic `appbase.local` feels like a tool. Costs almost nothing to implement (template substitution at install time).

### Decision 9 — Enforced authorization at platform layer

**Choice:** AppBase enforces user-to-app access at the API layer, not delegated to developers.

**Why:** Compliance environments cannot tolerate "the developer forgot to check." Centralized authorization is a defensible architectural choice that prevents data leaks.

**Implementation:** `user_app_access` table + middleware that checks permissions on every API call.

### Decision 10 — Ops-first build order

**Choice:** Build the infrastructure shell (installer, Caddy, DNS, Compose stack) before refactoring the service layer.

**Why:** The Ops layer is what makes this a *PFE* rather than another web app. If time runs short, the existing single-instance services can fall back as the service layer behind the new infrastructure.

---

## The Architecture

### Component Map

```
LAN — *.nuble.local
│
└── Single Host Machine (mini-PC, server, or laptop)
      │
      └── Docker Compose Stack
            ├── Caddy           (reverse proxy, port 80/443)
            ├── CoreDNS         (DNS authority for *.nuble.local)
            ├── mDNS Announcer  (broadcasts on LAN)
            ├── API Server      (TypeScript: auth, db, storage APIs)
            ├── Console (UI)    (Next.js admin dashboard)
            ├── PostgreSQL      (tenant-scoped data)
            └── File Storage    (local volume: /var/appbase/)
```

### Routing Map

| URL | Routes To |
|---|---|
| `console.nuble.local` | Admin dashboard |
| `console.nuble.local/apps/{name}` | Per-app developer dashboard |
| `api.nuble.local` | API server |
| `{appname}.nuble.local` | Static files of deployed frontend |

### Data Model (Conceptual)

```
organizations  (one row — the clinic itself)
├── users           (admins + end users)
├── apps            (created by admins; each gets API key)
│   ├── api_keys    (scoped credentials)
│   └── deployments (frontend versions)
├── user_app_access (which user can use which app)
└── per-app data    (scoped by app_id everywhere)
```

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Language | TypeScript | Already chosen, no change |
| API Framework | Hono or Fastify | TBD — Hono is lighter, Fastify is more battle-tested |
| Frontend (Console) | Next.js 14 | Already built |
| Database | PostgreSQL 16 | Switch from SQLite |
| ORM | Drizzle or Prisma | Either works |
| Auth | Lucia or custom | Sessions + API keys |
| Reverse Proxy | Caddy 2 | New |
| DNS | CoreDNS | New |
| Service Discovery | mDNS (Avahi/bonjour-style) | New |
| Container Runtime | Docker + Compose | New role (orchestrating shell only) |
| File Storage | Local filesystem | MinIO mentioned as future option |
| Job Queue | BullMQ + Redis | If needed for deployments |
| Monorepo | Turborepo | Already in place |
| Testing | Vitest + Playwright | Already in place |
| CI | GitHub Actions | Already in place |

---

## End-to-End User Flow

### Phase 1 — Installation (5 minutes)
1. Clinic IT runs `curl -sSL https://appbase.io/install | bash`
2. Installer checks/installs Docker
3. Prompts for organization name (`nuble`) and admin password
4. Generates `.env`, downloads `docker-compose.yml`
5. Adds entries to `/etc/hosts` for the host machine
6. Starts the stack with `docker compose up -d`
7. mDNS begins announcing `*.nuble.local`
8. Prints success: `✅ Open http://console.nuble.local`

### Phase 2 — Admin Setup
1. Admin opens `console.nuble.local` from any LAN device
2. Logs in with admin credentials
3. Creates an app named "tasks" → AppBase reserves `tasks.nuble.local`
4. Sees SDK config (endpoint + API key) to share with developer
5. Manages users and grants per-app access

### Phase 3 — Developer Build & Deploy
1. Developer creates a Vite/React project locally
2. Installs `@appbase/sdk` and pastes config
3. Codes against AppBase API (auth, db, storage)
4. Runs `npm run build` then `appbase deploy --app tasks`
5. CLI zips `dist/` and uploads via API
6. Caddy serves the build at `tasks.nuble.local`

### Phase 4 — End User Access
1. Nurse opens `tasks.nuble.local` on tablet
2. mDNS resolves the domain to the host machine
3. App loads, nurse logs in once
4. Switches to `records.nuble.local` — already authenticated (SSO)
5. AppBase enforces whether nurse has access to records app

---

## Scope for the Remaining Month

### Week 1 — The Empty Shell (Ops First)
- Bash install script (Linux/macOS)
- `docker-compose.yml` with Caddy, CoreDNS, Postgres, nginx placeholders
- `Caddyfile` with subdomain routing using `${ORG_NAME}` substitution
- `/etc/hosts` injection for the host
- **Milestone:** `console.nuble.local` shows a placeholder page after one install command

### Week 2 — LAN Resolution
- Add mDNS announcer
- Configure CoreDNS as production fallback
- Test from phone/tablet on same WiFi
- Document router-DNS configuration path
- **Milestone:** Other devices on the LAN reach AppBase by domain

### Week 3 — Service Layer (Refactor or Plug In)
- **Plan A (preferred):** Refactor existing API/dashboard for shared multi-tenant model
- **Plan B (fallback):** Plug existing single-instance services behind the new shell
- Connect to Postgres
- Wire up enforced authorization middleware
- **Milestone:** Working backend behind the infrastructure

### Week 4 — Frontend Deploy + Polish
- Build the `appbase` CLI (zip + upload)
- Configure Caddy to serve uploaded static folders
- Polish admin dashboard
- Write report
- Prepare defense slides + demo script
- **Milestone:** Full demo flow working end-to-end

### Buffer Days (post-Week 4)
- Reserved for report writing and defense preparation
- No new features

---

## Defense Strategy

### Demo Setup
- **Hardware:** Laptop running AppBase + pre-configured travel router
- **Router:** DNS pointed at laptop's IP for guaranteed `.local` resolution
- **Backup:** Phone hotspot with router + AppBase as a self-contained network

### Demo Script
1. Show fresh Ubuntu VM (no AppBase installed)
2. Run `curl ... | bash` — show the install
3. Open `console.nuble.local` — empty dashboard
4. Create app "tasks" live
5. Show SDK config
6. Switch to a pre-prepared frontend project
7. Run `appbase deploy` — show it become live at `tasks.nuble.local`
8. **Pull the ethernet cable to the internet** — show everything still works
9. Stop a container — show health monitor detects + restarts
10. Show network topology dashboard

### Strong Defensive Sentences
- *"AppBase enforces tenant isolation at the platform level, not at the application level."*
- *"Single-host architecture is a deliberate choice — it matches the use case. Multi-host orchestration would solve problems clinics don't have."*
- *"mDNS provides zero-config resolution; CoreDNS is the documented production fallback when networks block multicast."*
- *"Apps are tenants in a database, not running processes. This is what makes the platform scale to dozens of apps on commodity hardware."*

### Anticipated Questions + Answers
- **"Why not Kubernetes?"** → Single-host doesn't need orchestration of clusters. K8s would add operational complexity without solving any problem the clinic has.
- **"How does this scale?"** → Vertically (bigger machine) and across organizations (each clinic has its own instance). Horizontal scaling within one org wasn't the design goal because data sovereignty per-org is the value prop.
- **"What about backups?"** → Postgres + filesystem volume can be snapshotted. Future work could include built-in backup scheduling.
- **"What about HTTPS?"** → Caddy auto-generates certificates for local domains via internal CA, accepted by browsers when the CA root is installed (documented for production).
- **"What if Docker isn't available?"** → Future work: native package builds. The PFE scope is Linux + Docker.

---

## What's Already Built (Pre-PFE Refactor)

The developer has an existing monorepo with:
- Working API (auth, storage, database) for single-instance model
- Working Next.js admin dashboard
- Working TypeScript SDK
- Tested end-to-end in the original "one instance per app" architecture

This serves as both a starting point for the refactor AND a fallback if time runs short on the multi-tenant rewrite.

---

## Out of Scope (Explicit Non-Goals)

These are intentionally NOT in the PFE scope, to keep focus:

- ❌ Local LLM API (mentioned as future work only)
- ❌ Cross-OS native installers (Linux only for demo; mention Windows/macOS as future)
- ❌ Git-based deployment (CLI deploy only)
- ❌ SSR frontend hosting (static SPAs only)
- ❌ Multi-host clustering (single-host by design)
- ❌ Auto-scaling, load balancing
- ❌ Built-in CI/CD pipelines
- ❌ S3-compatible storage layer (local filesystem only; MinIO is future)
- ❌ Mobile native SDK (web SDK only)

---

## Working Style Notes

- **Code language:** TypeScript primary
- **Time pressure:** ~1 month total, with last days reserved for report/defense
- **AI assistance:** Claude Code subscription available — coding speed is not the bottleneck
- **Bottleneck:** Architectural clarity and scope discipline
- **Risk management:** Plan A (full refactor) with Plan B (use existing services behind new shell) as documented fallback
- **Decision log:** Maintain ADRs in `/docs/adr/` — every major choice gets 2-3 sentences of rationale for defense preparation

---

## Project Story Arc (For Report)

The narrative for the PFE report should follow this arc:

1. **The Problem** — Small clinics need backends but cannot use the cloud
2. **Existing Solutions Are Insufficient** — Each fails on different axis (compliance, complexity, completeness)
3. **The Insight** — Combine BaaS services with LAN-native networking in a plug-and-play package
4. **The Architecture** — Single-host, multi-tenant, infrastructure-first design
5. **The Implementation** — Ops layer (installer, Caddy, DNS) + Service layer (API, console, SDK)
6. **The Demo** — End-to-end flow proving the concept works
7. **Perspectives** — What's missing (mobile SDK, local LLM, native installers), what could grow (federation across clinics, edge backups)

---

*This document represents the agreed-upon scope and architecture as of project planning completion. Any deviation should be a conscious decision with documented rationale.*