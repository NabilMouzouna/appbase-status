import type { Dictionary } from "./en";

const fr: Dictionary = {
  "meta.title": "AppBase — Avancement PFE",
  "meta.description":
    "Suivi d'avancement d'AppBase, une plateforme Backend-as-a-Service auto-hébergée pour les environnements LAN.",

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
};

export default fr;
