import type { Dictionary } from "./en";

const fr: Dictionary = {
  "meta.title": "AppBase — Avancement PFE",
  "meta.description":
    "Suivi d'avancement d'AppBase, une plateforme Backend-as-a-Service auto-hébergée pour les environnements LAN.",
  "meta.beta": "BETA",
  "meta.beta.title": "AppBase — Avancement Beta (architecture par-app)",

  "banner.message":
    "Du nouveau ! Appbase est désormais Nublestation. Profitez de fonctionnalités améliorées en visitant notre site",
  "banner.cta": "Voir l'avancement Beta d'origine →",
  "banner.close": "Ignorer",

  "whatsnew.title": "Quoi de neuf",
  "whatsnew.close": "Fermer",

  "progress.current": "En cours actuellement",
  "progress.next": "Prochaine étape",
  "progress.complete": "Terminé",

  "header.badge": "Projet de Fin d'Études · ENSA Fès",
  "header.degree": "Génie des Réseaux et Télécommunications",
  "header.github": "Voir sur GitHub",
  "header.tagline":
    "Backend-as-a-Service auto-hébergé pour les réseaux locaux et VPC privés.",

  "what.heading": "Qu'est-ce qu'AppBase ?",
  "what.p1":
    "AppBase est une plateforme Backend-as-a-Service auto-hébergée qui offre aux petites organisations — cliniques, écoles, administrations locales, équipes d'ingénierie — la même expérience développeur que Firebase ou Supabase : authentification, stockage de fichiers et API de base de données. La différence est qu'elle fonctionne entièrement sur votre propre infrastructure, dans votre propre réseau, sans qu'aucune donnée ne quitte les locaux.",
  "what.p2":
    "Vous déployez une instance sur n'importe quelle machine. Les développeurs y enregistrent leurs applications, reçoivent des clés API scopées et construisent sur la plateforme. Tout fonctionne hors ligne. Débranchez le câble réseau vers Internet — la plateforme continue de fonctionner.",

  "problem.heading": "Le Problème",
  "problem.intro":
    "Les solutions BaaS existantes échouent pour les organisations ne pouvant pas envoyer leurs données vers le cloud :",
  "problem.firebase": "Dépendant du cloud. Les données quittent le réseau. Non viable pour les environnements soumis à des contraintes de conformité.",
  "problem.supabase": "Requiert une expertise DevOps et une infrastructure complexe. Non conçu pour un fonctionnement LAN-first.",
  "problem.appwrite": "Architecture monolithique. Aucune mise en réseau native LAN ni découverte de services intégrée.",
  "problem.pocketbase": "Binaire unique sans isolation multi-applications et sans fonctionnalités au niveau réseau.",
  "problem.gap":
    "Aucune solution existante ne combine des services BaaS avec une mise en réseau native LAN dans une plateforme unique déployable sur du matériel standard en moins de dix minutes.",

  "how.heading": "Comment ça fonctionne",
  "how.m1":
    "Dans le premier jalon, AppBase est une instance BaaS unique : une API Fastify, une base de données SQLite, un espace de stockage et un tableau de bord dédié. Les développeurs l'utilisent via un SDK qui gère automatiquement le renouvellement des tokens, l'upload de fichiers et les abonnements en temps réel.",
  "how.m2":
    "À partir de M2, un plan de contrôle maître sur appbase.local provisionne des instances BaaS isolées par application via Docker. Chaque application obtient son propre port, sa propre base de données et son propre espace de stockage — gérés automatiquement.",
  "how.m3":
    "M3 ajoute la couche réseau : un reverse proxy Caddy route le trafic vers des adresses sous-domaine, mDNS annonce les services sur le LAN pour une découverte automatique, et un moniteur de santé redémarre les conteneurs défaillants automatiquement.",

  "progress.heading": "Avancement",
  "progress.tasks": "tâches",
  "progress.of": "sur",

  "legend.done": "Terminé",
  "legend.inprogress": "En cours",
  "legend.upcoming": "À venir",

  "status.done": "Terminé",
  "status.in-progress": "En cours",
  "status.upcoming": "À venir",

  "milestones.heading": "Jalons",

  "tech.heading": "Stack Technique",

  "about.heading": "À propos du projet",
  "about.body":
    "AppBase est le Projet de Fin d'Études (PFE) pour un diplôme de Génie des Réseaux et Télécommunications à l'ENSA Fès. Il se situe à l'intersection du génie logiciel et du génie réseau — démontrant la conception d'API REST, l'isolation multi-applications, l'orchestration de conteneurs, la découverte de services LAN et les pipelines de données en temps réel dans une plateforme cohérente.",

  "nav.overview": "Aperçu",
  "nav.problem": "Le Problème",
  "nav.how": "Fonctionnement",
  "nav.progress": "Avancement",
  "nav.milestones": "Jalons",
  "nav.documents": "Documents",
  "nav.tech": "Stack Technique",
  "nav.contact": "Contact",
  "nav.architecture": "Architecture",
  "nav.what": "Qu'est-ce qu'AppBase",
  "nav.usecases": "Cas d'usage",
  "nav.comparison": "Comparaison",
  "nav.demo": "Démo & Docs",
  "nav.beta": "Avancement Beta",
  "nav.beta.back": "← Retour à l'avancement actuel",

  "documents.heading": "Documents",
  "documents.presentation": "Présentation PFE",
  "documents.report": "Rapport PFE",
  "documents.status.unavailable": "Pas encore disponible",
  "documents.status.in-progress": "En cours",
  "documents.status.available": "Disponible",
  "documents.open": "Ouvrir",

  "contact.heading": "Contact",
  "contact.github": "GitHub",
  "contact.linkedin": "LinkedIn",
  "contact.email": "Email",

  "footer.admin": "Mettre à jour l'avancement",

  "ms.planning.title": "Planification & Architecture",
  "ms.planning.subtitle": "Recherche, ADRs et conception système",
  "ms.planning.weeks": "Pré-M1",
  "ms.planning.deliverable": "README, docs d'architecture, ADRs, spec API, scaffold monorepo",
  "ms.planning.w0.label": "Recherche & Décisions",
  "ms.planning.w0.summary": "Évaluation des frameworks, rédaction des ADRs, conception de la surface API",
  "ms.planning.w0.t0": "Évaluation des frameworks (Fastify, Express, Hono)",
  "ms.planning.w0.t1": "ADR-001 : sélection du framework API",
  "ms.planning.w0.t2": "ADR-002 : stratégie ORM et migration",
  "ms.planning.w0.t3": "ADR-003 : stratégie d'implémentation Auth",
  "ms.planning.w0.t4": "Conception de la spec API (surface REST)",
  "ms.planning.w0.t5": "Document d'architecture (M1 → M4)",

  "ms.setup.title": "Mise en place du projet",
  "ms.setup.subtitle": "Monorepo, outillage, pipeline CI",
  "ms.setup.weeks": "Pré-M1",
  "ms.setup.deliverable": "Monorepo Turborepo avec CI, linting et packages partagés",
  "ms.setup.w0.label": "Infrastructure",
  "ms.setup.w0.summary": "Scaffold monorepo, configs partagées, workflows CI",
  "ms.setup.w0.t0": "Mise en place du monorepo Turborepo",
  "ms.setup.w0.t1": "tsconfig, ESLint, Prettier partagés",
  "ms.setup.w0.t2": "GitHub Actions CI (lint, typecheck, tests)",
  "ms.setup.w0.t3": "Structure des packages (api, dashboard, sdk, db, types)",

  "ms.m1.title": "M1 — Instance BaaS Unique",
  "ms.m1.subtitle": "Auth, base de données, stockage, SDK, tableau de bord",
  "ms.m1.weeks": "Semaines 1–4",
  "ms.m1.deliverable": "Une unité BaaS, un SDK fonctionnel et une démo tournant entièrement hors ligne",
  "ms.m1.w0.label": "Semaine 1 — Auth + Clés API",
  "ms.m1.w0.summary": "Système d'authentification et middleware de clé API",
  "ms.m1.w0.t0": "Intégration better-auth (register, login, refresh)",
  "ms.m1.w0.t1": "Émission et validation des clés API",
  "ms.m1.w0.t2": "Module auth du SDK",
  "ms.m1.w1.label": "Semaine 2 — API Base de données",
  "ms.m1.w1.summary": "CRUD collections et premier checkpoint démo",
  "ms.m1.w1.t0": "Endpoints de gestion des collections",
  "ms.m1.w1.t1": "CRUD complet sur les enregistrements",
  "ms.m1.w1.t2": "Module db du SDK",
  "ms.m1.w1.t3": "L'app démo stocke et récupère des données",
  "ms.m1.w2.label": "Semaine 3 — Stockage",
  "ms.m1.w2.summary": "Upload/download de fichiers et module stockage SDK",
  "ms.m1.w2.t0": "Endpoints upload/download par bucket",
  "ms.m1.w2.t1": "Isolation des fichiers par utilisateur",
  "ms.m1.w2.t2": "Module storage du SDK",
  "ms.m1.w3.label": "Semaine 4 — Temps réel + Tableau de bord",
  "ms.m1.w3.summary": "Abonnements SSE, interface admin, packaging Docker",
  "ms.m1.w3.t0": "SSE temps réel sur les collections DB",
  "ms.m1.w3.t1": "Méthode subscribe() du SDK",
  "ms.m1.w3.t2": "Tableau de bord admin dédié à l'app",
  "ms.m1.w3.t3": "Packaging Docker (un seul docker run)",

  "ms.m2.title": "M2 — Orchestration de Conteneurs",
  "ms.m2.subtitle": "Provisionnement et isolation multi-applications",
  "ms.m2.weeks": "Semaines 5–6",
  "ms.m2.deliverable": "Plan de contrôle maître provisionnant des instances BaaS isolées par app",
  "ms.m2.w0.label": "Semaine 5 — Plan de contrôle",
  "ms.m2.w0.summary": "Processus maître et provisionnement des apps",
  "ms.m2.w0.t0": "Plan de contrôle maître sur appbase.local",
  "ms.m2.w0.t1": "Service de provisionnement / suppression d'apps",
  "ms.m2.w0.t2": "Intégration Docker SDK (dockerode)",
  "ms.m2.w1.label": "Semaine 6 — Isolation",
  "ms.m2.w1.summary": "Bases de données, stockage et gestion des ports par app",
  "ms.m2.w1.t0": "Espaces SQLite et stockage par application",
  "ms.m2.w1.t1": "Assignation et gestion des ports",
  "ms.m2.w1.t2": "Le maître suit l'état et le cycle de vie des apps",

  "ms.m3.title": "M3 — Couche Réseau",
  "ms.m3.subtitle": "Routage, mDNS, contrôles de santé",
  "ms.m3.weeks": "Semaines 7–8",
  "ms.m3.deliverable": "Routage sous-domaine, découverte de services et récupération automatique",
  "ms.m3.w0.label": "Semaine 7 — Routage & Découverte",
  "ms.m3.w0.summary": "Reverse proxy et annonces mDNS",
  "ms.m3.w0.t0": "Reverse proxy Caddy (routage sous-domaine)",
  "ms.m3.w0.t1": "Annonce et découverte de services mDNS",
  "ms.m3.w1.label": "Semaine 8 — Résilience",
  "ms.m3.w1.summary": "Surveillance de santé et isolation réseau",
  "ms.m3.w1.t0": "Contrôles de santé avec redémarrage automatique",
  "ms.m3.w1.t1": "Isolation réseau entre conteneurs d'apps",

  "ms.m4.title": "M4 — Observabilité & Finalisation",
  "ms.m4.subtitle": "Tableaux de bord, documentation, démo complète",
  "ms.m4.weeks": "Semaines 9–10",
  "ms.m4.deliverable": "Tableau de bord topologie réseau, docs API, scénario de démo complet",
  "ms.m4.w0.label": "Semaines 9–10",
  "ms.m4.w0.summary": "Outillage d'observabilité et finition",
  "ms.m4.w0.t0": "Tableau de bord topologie réseau",
  "ms.m4.w0.t1": "État de santé en direct et cartographie des ports",
  "ms.m4.w0.t2": "Documentation API (Swagger UI)",
  "ms.m4.w0.t3": "Démo complète (hors ligne, multi-apps, redémarrage auto)",

  // ── modal ────────────────────────────────────────────────
  "modal.title": "AppBase évolue vers une architecture à services partagés",
  "modal.subtitle":
    "La conception initiale « un conteneur par application » produisait des images de 1,25 Go par app — insoutenable au-delà de cinq applications. La nouvelle architecture est partagée, multi-locataires, et bien plus légère.",
  "modal.bullet1":
    "Postgres partagé, authentification partagée, stockage partagé — une seule pile, plusieurs applications.",
  "modal.bullet2":
    "Les applications sont des locataires en base de données, et non des conteneurs en cours d'exécution. Cent apps ne coûtent pas plus cher qu'une seule.",
  "modal.bullet3":
    "Portable, hors ligne par défaut, plug-and-play — fonctionne sur n'importe quelle machine standard du réseau local.",
  "modal.cta": "Voir l'architecture officielle",
  "modal.dismiss": "Rester sur la version beta",
  "modal.close": "Fermer",

  // ── architecture page : meta + nav ───────────────────────
  "arch.meta.title": "AppBase — Architecture officielle",
  "arch.meta.description":
    "L'architecture multi-locataires à services partagés d'AppBase : composants, modèle de données, comparaison avec Firebase / AWS Amplify / Supabase, et cas d'usage pour les cliniques et les écoles.",
  "nav.arch.overview": "Vue d'ensemble",
  "nav.arch.why": "Pourquoi ce changement",
  "nav.arch.components": "Composants",
  "nav.arch.routing": "Routage",
  "nav.arch.data": "Modèle de données",
  "nav.arch.comparison": "Comparaison",
  "nav.arch.usecases": "Cas d'usage",
  "nav.arch.compliance": "Conformité",
  "nav.arch.back": "← Voir l'avancement (beta)",

  // ── architecture page : hero + why ──────────────────────
  "arch.heading": "Architecture officielle",
  "arch.intro":
    "AppBase est une plateforme backend auto-hébergée à services partagés, destinée aux organisations qui ne peuvent pas envoyer leurs données dans le cloud. Une installation par organisation, plusieurs applications comme locataires logiques. Fonctionne entièrement hors ligne sur du matériel standard, en moins de dix minutes.",
  "arch.why.heading": "Pourquoi nous avons changé",
  "arch.why.before":
    "Avant — un conteneur Docker par application : chaque app produisait une image de 1,25 Go avec sa propre auth, sa base et son stockage. Cinq apps représentaient 6+ Go de services dupliqués, sans SSO.",
  "arch.why.after":
    "Après — services partagés : un seul Postgres, une seule auth, une seule couche de stockage. Les applications sont des lignes en base, scopées par clé API. Ajouter la centième app ne coûte pas plus de mémoire que la première.",

  // ── architecture page : diagrams ─────────────────────────
  "arch.diagram.components.title": "Carte des composants",
  "arch.diagram.components.caption":
    "Une seule machine sur le LAN exécute toute la pile via Docker Compose. Caddy est en tête de tout ; les données des locataires sont isolées au niveau applicatif.",
  "arch.diagram.routing.title": "Carte de routage",
  "arch.diagram.routing.caption":
    "Sous-domaines lisibles *.{org}.local, résolus par mDNS sur le LAN avec CoreDNS en repli pour la production.",
  "arch.diagram.data.title": "Modèle de données",
  "arch.diagram.data.caption":
    "Chaque ligne porte un org_id et un app_id. L'autorisation est imposée au niveau de la plateforme, pas déléguée aux développeurs.",
  "arch.node.lan": "LAN — *.{org}.local",
  "arch.node.host": "Machine unique (mini-PC, serveur ou laptop)",
  "arch.node.compose": "Pile Docker Compose",
  "arch.node.caddy": "Caddy",
  "arch.node.caddy.role": "reverse proxy · 80/443",
  "arch.node.coredns": "CoreDNS",
  "arch.node.coredns.role": "autorité DNS · *.{org}.local",
  "arch.node.mdns": "Annonceur mDNS",
  "arch.node.mdns.role": "découverte de services LAN",
  "arch.node.api": "Serveur API",
  "arch.node.api.role": "auth · db · stockage",
  "arch.node.console": "Console UI",
  "arch.node.console.role": "tableau de bord Next.js",
  "arch.node.postgres": "PostgreSQL",
  "arch.node.postgres.role": "données isolées par locataire",
  "arch.node.storage": "Stockage de fichiers",
  "arch.node.storage.role": "/var/appbase/",
  "arch.route.console": "console.{org}.local",
  "arch.route.console.target": "Tableau de bord admin",
  "arch.route.api": "api.{org}.local",
  "arch.route.api.target": "Serveur API",
  "arch.route.app": "console.{org}.local/apps/{name}",
  "arch.route.app.target": "Tableau de bord développeur par app",
  "arch.route.frontend": "{appname}.{org}.local",
  "arch.route.frontend.target": "Fichiers statiques du frontend déployé",
  "arch.data.org": "organizations",
  "arch.data.org.note": "une ligne — la clinique / l'école elle-même",
  "arch.data.users": "users",
  "arch.data.users.note": "administrateurs + utilisateurs finaux",
  "arch.data.apps": "apps",
  "arch.data.apps.note": "créées par les admins ; chacune reçoit une clé API",
  "arch.data.keys": "api_keys",
  "arch.data.keys.note": "identifiants scopés par app",
  "arch.data.deployments": "deployments",
  "arch.data.deployments.note": "versions du frontend",
  "arch.data.access": "user_app_access",
  "arch.data.access.note": "quel utilisateur peut utiliser quelle app",

  // ── architecture page : comparison ───────────────────────
  "arch.cmp.heading": "Comparaison avec les solutions existantes",
  "arch.cmp.intro":
    "Les plateformes BaaS existantes excellent chacune sur des axes différents. Aucune ne combine fonctionnement hors ligne, résidence des données sur site, isolation multi-applications et déploiement zéro-ops pour des équipes non-DevOps.",
  "arch.cmp.product.appbase": "AppBase",
  "arch.cmp.product.firebase": "Firebase",
  "arch.cmp.product.amplify": "AWS Amplify",
  "arch.cmp.product.supabase": "Supabase Cloud",
  "arch.cmp.axis.residency": "Résidence des données",
  "arch.cmp.axis.compliance": "Conformité loi 09-08",
  "arch.cmp.axis.complexity": "Complexité de mise en place",
  "arch.cmp.axis.footprint": "Empreinte",
  "arch.cmp.axis.isolation": "Isolation multi-apps",
  "arch.cmp.axis.lan": "Natif LAN",
  "arch.cmp.axis.plug": "Plug-and-play",
  "arch.cmp.appbase.residency": "Sur site · LAN uniquement",
  "arch.cmp.appbase.compliance": "Adapté nativement — les données ne quittent jamais les locaux",
  "arch.cmp.appbase.complexity": "Un seul script d'installation",
  "arch.cmp.appbase.footprint": "~500 Mo pour toute la pile",
  "arch.cmp.appbase.isolation": "Locataires scopés au niveau plateforme",
  "arch.cmp.appbase.lan": "Oui — mDNS + CoreDNS",
  "arch.cmp.appbase.plug": "Oui — moins de 10 minutes",
  "arch.cmp.firebase.residency": "Google Cloud (régions US/UE)",
  "arch.cmp.firebase.compliance": "Nécessite l'autorisation CNDP de transfert (Article 43)",
  "arch.cmp.firebase.complexity": "Faible côté cloud, mais nécessite Internet",
  "arch.cmp.firebase.footprint": "Cloud — aucune empreinte locale",
  "arch.cmp.firebase.isolation": "Au niveau du projet uniquement",
  "arch.cmp.firebase.lan": "Non — dépend d'Internet",
  "arch.cmp.firebase.plug": "Non — ne fonctionne pas hors ligne",
  "arch.cmp.amplify.residency": "Régions AWS (souvent UE/US)",
  "arch.cmp.amplify.compliance": "Même problématique de transfert · DPA complexe",
  "arch.cmp.amplify.complexity": "Élevée — IAM, CDK, configuration",
  "arch.cmp.amplify.footprint": "Cloud — aucune empreinte locale",
  "arch.cmp.amplify.isolation": "Par environnement, par stack",
  "arch.cmp.amplify.lan": "Non",
  "arch.cmp.amplify.plug": "Non — DevOps requis",
  "arch.cmp.supabase.residency": "Régions adossées à AWS",
  "arch.cmp.supabase.compliance": "Même problématique de transfert",
  "arch.cmp.supabase.complexity": "Faible en cloud · moyenne en auto-hébergé",
  "arch.cmp.supabase.footprint": "Cloud — aucune empreinte locale",
  "arch.cmp.supabase.isolation": "Politiques RLS par projet",
  "arch.cmp.supabase.lan": "Non",
  "arch.cmp.supabase.plug": "Cloud uniquement — la version auto-hébergée demande du DevOps",
  // ── architecture page : use cases ────────────────────────
  "arch.uc.heading": "Cas d'usage",
  "arch.uc.intro":
    "Deux scénarios concrets où le fonctionnement sur site n'est pas une préférence mais une contrainte forte.",
  "arch.uc.clinics.title": "Cliniques — dossiers patients, planning, messagerie interne",
  "arch.uc.clinics.body":
    "Une clinique de 30 personnes à Fès a besoin d'applications internes pour les dossiers patients, la prise de rendez-vous et le suivi des prescriptions. Les données patients sont des données personnelles sensibles au sens de la loi 09-08 — les envoyer vers Firebase ou AWS exigerait une autorisation explicite de la CNDP pour le transfert transfrontalier, plus le consentement du patient, plus un DPA documenté. La plupart des petites cliniques ne peuvent pas franchir ce parcours.",
  "arch.uc.clinics.flow":
    "Avec AppBase, l'informaticien de la clinique installe un mini-PC derrière le bureau d'accueil. Les médecins ouvrent records.clinic.local sur tablette ; les infirmiers ouvrent tasks.clinic.local sur smartphone. Le SSO fonctionne automatiquement entre les apps. Débrancher le câble Internet prouve que rien ne sort des locaux. La sauvegarde tient sur un dump Postgres mis sur une clé USB rangée dans le coffre.",
  "arch.uc.schools.title": "Écoles — notes, présences, portail parents",
  "arch.uc.schools.body":
    "Une école gère les notes, les présences et un portail parents. Les données personnelles des enfants sont doublement protégées — par la loi 09-08 et par les règles d'agrément de l'école. Les enseignants veulent une expérience numérique fluide ; le directeur ne peut pas se permettre une fuite de données ou une enquête de la CNDP.",
  "arch.uc.schools.flow":
    "AppBase tourne sur une seule machine dans le bureau du directeur. Les enseignants se connectent à grades.school.local depuis les portables des classes, à attendance.school.local depuis les tablettes à l'entrée. Le portail parents tourne sur la même pile. Le prestataire informatique installe une fois et ne revient pas — pas de compte cloud à gérer, pas de facture mensuelle, pas de panne Internet qui interrompt la journée scolaire.",

  // ── architecture page : compliance ───────────────────────
  "arch.law.heading": "Conformité — Loi 09-08 et résidence des données au Maroc",
  "arch.law.intro":
    "Les organisations marocaines qui traitent des données personnelles évoluent dans un cadre juridique spécifique. Les plateformes cloud conçues pour le marché américain ou européen ne le couvrent pas nativement.",
  "arch.law.what":
    "La loi 09-08, promulguée en 2009, encadre la protection des personnes physiques à l'égard du traitement des données à caractère personnel au Maroc. Elle définit les données personnelles, les données sensibles (dont les données de santé), les droits des personnes concernées et les obligations des responsables de traitement.",
  "arch.law.cnpd":
    "La CNDP (Commission Nationale de contrôle de la Protection des Données à caractère Personnel) est l'autorité nationale. La majorité des traitements doivent lui être déclarés ; certains traitements — notamment ceux portant sur des données sensibles — exigent une autorisation préalable, et non une simple déclaration.",
  "arch.law.cloud":
    "L'article 43 de la loi 09-08 interdit le transfert de données à caractère personnel vers un État étranger n'assurant pas un niveau de protection suffisant, sauf autorisation préalable de la CNDP. En pratique, stocker des données patients ou élèves sur Firebase (régions US/UE) ou AWS (Francfort, Irlande) impose un parcours d'autorisation documenté — DPA, consentement explicite de la personne concernée, examen par la CNDP. La plupart des petites organisations ne mènent jamais ce parcours et opèrent dans une zone grise juridique.",
  "arch.law.appbase":
    "Comme AppBase fonctionne entièrement sur site, sur une machine du réseau de l'organisation, aucun transfert transfrontalier n'a lieu. La question juridique qui bloque l'adoption du cloud ne se pose tout simplement pas. C'est la raison architecturale d'être d'AppBase, pas une simple accroche marketing.",
  "arch.law.disclaimer":
    "Cette page est informative et reflète la lecture par l'auteur de sources juridiques publiques. Elle ne constitue pas un avis juridique. Les organisations soumises à la loi 09-08 doivent consulter un avocat marocain qualifié en protection des données pour leur cas particulier.",

  // ── nouveaux jalons (post-pivot) ─────────────────────────
  "ms.core.title": "BaaS Core",
  "ms.core.subtitle": "Auth, base de données, stockage, temps réel, SDK",
  "ms.core.weeks": "Semaines 1–4",
  "ms.core.deliverable": "Backend opérationnel avec SDK consommé par une app de démonstration",
  "ms.core.w0.label": "Fondations backend",
  "ms.core.w0.summary": "Les quatre primitives BaaS livrées sur une seule API",
  "ms.core.t.auth": "better-auth (sessions, clés API)",
  "ms.core.t.db": "Base de données (collections + CRUD)",
  "ms.core.t.storage": "Stockage (buckets, uploads scopés)",
  "ms.core.t.realtime": "Temps réel (SSE sur les collections)",
  "ms.core.t.sdk": "SDK (auth, db, storage, subscribe)",

  "ms.ops.title": "Réseau & DevOps",
  "ms.ops.subtitle": "Routage, mDNS, reverse proxy, compose, CLI, santé",
  "ms.ops.weeks": "Semaines 5–7",
  "ms.ops.deliverable": "console.{org}.local accessible depuis tout appareil sur le LAN",
  "ms.ops.w0.label": "Infrastructure",
  "ms.ops.w0.summary":
    "Câbler les composants pour que la plateforme démarre avec un seul docker-compose up et soit résolue sur le LAN.",
  "ms.ops.t.routing": "Caddy reverse-proxy + routage par sous-domaine",
  "ms.ops.t.mdns": "mDNS + CoreDNS pour la résolution *.local",
  "ms.ops.t.compose": "docker-compose orchestrant toute la pile",
  "ms.ops.t.cli": "CLI de configuration (init, status, deploy)",
  "ms.ops.t.health": "Health checks à travers les services",
  "ms.ops.t.console": "console.{org}.local accessible depuis tout appareil LAN",

  "ms.finals.title": "Touches finales",
  "ms.finals.subtitle": "Câbler le BaaS dans Ops ; refactor single-instance",
  "ms.finals.weeks": "Semaine 8",
  "ms.finals.deliverable": "Le BaaS s'exécute dans la pile orchestrée",
  "ms.finals.w0.label": "Intégration",
  "ms.finals.w0.summary":
    "Connecter le serveur BaaS existant à la nouvelle infrastructure Ops et refactorer vers un modèle single-instance si le temps le permet.",
  "ms.finals.t.wire": "Connecter AppBase BaaS à l'infrastructure Ops",
  "ms.finals.t.single": "Configurer en single-instance (refactor si le temps le permet)",

  "ms.demo.title": "Démo & Docs",
  "ms.demo.subtitle": "Guide d'installation, docs SDK, vidéo de démo",
  "ms.demo.weeks": "Semaine 9",
  "ms.demo.deliverable": "Installation reproductible + démo enregistrée du flux complet",
  "ms.demo.w0.label": "Livraison",
  "ms.demo.w0.summary":
    "Tout ce dont quelqu'un d'autre a besoin pour installer AppBase, développer dessus et voir le flux fonctionner en local.",
  "ms.demo.t.install": "Guide d'installation AppBase + lien du repo",
  "ms.demo.t.sdk": "Documentation du SDK AppBase",
  "ms.demo.t.video": "Vidéo de démonstration en environnement local",

  "home.hero.eyebrow": "Projet de Fin d'Études · ENSA Fès",
  "home.hero.heading": "Un Backend-as-a-Service qui vit sur votre LAN.",
  "home.hero.subhead":
    "AppBase offre aux cliniques, écoles et petits bureaux la même expérience développeur que Firebase — sauf que chaque octet reste sur une machine qu'ils possèdent.",

  "demo.heading": "Démo & Documentation",
  "demo.intro":
    "Une fois Ops et les Touches finales livrés, cette section hébergera le guide d'installation, la référence du SDK et une vidéo de démo en environnement local.",
  "demo.install.title": "Installer AppBase",
  "demo.install.body": "Installation en une ligne + pile Docker Compose sur tout hôte LAN.",
  "demo.sdk.title": "SDK AppBase",
  "demo.sdk.body": "SDK TypeScript pour auth, base de données, stockage et temps réel.",
  "demo.video.title": "Vidéo de démonstration",
  "demo.video.body": "Démo bout-en-bout enregistrée en environnement local.",
  "demo.coming": "Bientôt disponible",
  "demo.open": "Ouvrir",
};

export default fr;
