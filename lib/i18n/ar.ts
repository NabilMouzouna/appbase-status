import type { Dictionary } from "./en";

const ar: Dictionary = {
  "meta.title": "AppBase — تقدم مشروع التخرج",
  "meta.description":
    "متتبع تقدم مشروع AppBase، منصة Backend-as-a-Service مستضافة ذاتياً لبيئات الشبكات المحلية.",
  "meta.beta": "تجريبي",
  "meta.beta.title": "AppBase — التقدم التجريبي (معمارية لكل تطبيق)",

  "banner.message":
    "تحوّل AppBase إلى معمارية بخدمات مشتركة.",
  "banner.cta": "عرض التقدم التجريبي الأصلي ←",
  "banner.close": "تجاهل",

  "whatsnew.title": "ما الجديد",
  "whatsnew.close": "إغلاق",

  "progress.current": "العمل الحالي",
  "progress.next": "الخطوة التالية",
  "progress.complete": "مكتمل",

  "header.badge": "مشروع التخرج · ENSA فاس",
  "header.degree": "هندسة الشبكات والاتصالات",
  "header.github": "عرض على GitHub",
  "header.tagline":
    "خدمة Backend-as-a-Service مستضافة ذاتياً للشبكات المحلية والشبكات الافتراضية الخاصة.",

  "what.heading": "ما هو AppBase؟",
  "what.p1":
    "AppBase هي منصة Backend-as-a-Service مستضافة ذاتياً توفر للمؤسسات الصغيرة — العيادات والمدارس والإدارات المحلية وفرق الهندسة — نفس تجربة المطور التي يوفرها Firebase أو Supabase: المصادقة، وتخزين الملفات، وواجهة برمجية لقاعدة البيانات. الفرق أنها تعمل بالكامل على بنيتك التحتية الخاصة وشبكتك الخاصة دون أن تغادر أي بيانات المنشأة.",
  "what.p2":
    "تنشر نسخة واحدة على أي جهاز. يسجّل المطورون تطبيقاتهم عليها، ويحصلون على مفاتيح API محدودة النطاق، ويبنون على قمة المنصة. كل شيء يعمل بدون إنترنت. افصل كابل الشبكة — المنصة تواصل عملها.",

  "problem.heading": "المشكلة",
  "problem.intro":
    "تفشل حلول BaaS الحالية مع المؤسسات التي لا تستطيع إرسال بياناتها إلى السحابة:",
  "problem.firebase": "يعتمد على السحابة. البيانات تغادر الشبكة. غير قابل للتطبيق في البيئات الخاضعة لمتطلبات الامتثال.",
  "problem.supabase": "يتطلب خبرة DevOps وبنية تحتية معقدة. غير مصمم للعمل في بيئة الشبكة المحلية أولاً.",
  "problem.appwrite": "معمارية أحادية. لا يدعم الشبكات المحلية الأصلية ولا اكتشاف الخدمات المدمج.",
  "problem.pocketbase": "ملف ثنائي واحد بدون عزل متعدد التطبيقات وبدون ميزات على مستوى الشبكة.",
  "problem.gap":
    "لا يوجد حل حالي يجمع خدمات BaaS مع شبكات محلية أصلية في منصة واحدة قابلة للنشر على أجهزة عادية في أقل من عشر دقائق.",

  "how.heading": "كيف يعمل",
  "how.m1":
    "في المرحلة الأولى، AppBase هي نسخة BaaS واحدة: واجهة برمجية Fastify، وقاعدة بيانات SQLite، وفضاء تخزين واحد، ولوحة تحكم مخصصة. يستخدمها المطورون عبر SDK يتولى تجديد الرموز المميزة ورفع الملفات والاشتراكات الفورية تلقائياً.",
  "how.m2":
    "من M2 فصاعداً، تقوم لوحة تحكم رئيسية على appbase.local بتوفير نسخ BaaS معزولة لكل تطبيق باستخدام Docker. يحصل كل تطبيق على منفذه الخاص وقاعدة بياناته وفضاء تخزينه — كل ذلك بإدارة تلقائية.",
  "how.m3":
    "تضيف M3 طبقة الشبكة: وكيل عكسي Caddy يوجه حركة المرور إلى عناوين النطاق الفرعي، وmDNS يُعلن عن الخدمات على الشبكة المحلية للاكتشاف التلقائي، ومراقب صحة يُعيد تشغيل الحاويات الفاشلة تلقائياً.",

  "progress.heading": "التقدم",
  "progress.tasks": "مهام",
  "progress.of": "من",

  "legend.done": "مكتمل",
  "legend.inprogress": "قيد التنفيذ",
  "legend.upcoming": "قادم",

  "status.done": "مكتمل",
  "status.in-progress": "قيد التنفيذ",
  "status.upcoming": "قادم",

  "milestones.heading": "المراحل",

  "tech.heading": "المكدس التقني",

  "about.heading": "عن هذا المشروع",
  "about.body":
    "AppBase هو مشروع التخرج (PFE) لدرجة الهندسة في الشبكات والاتصالات بـ ENSA فاس. يقع عند تقاطع هندسة البرمجيات وهندسة الشبكات — يُظهر تصميم REST API، وعزل التطبيقات المتعددة، وتنسيق الحاويات، واكتشاف خدمات الشبكة المحلية، وخطوط بيانات الوقت الفعلي في منصة واحدة متماسكة.",

  "nav.overview": "نظرة عامة",
  "nav.problem": "المشكلة",
  "nav.how": "كيف يعمل",
  "nav.progress": "التقدم",
  "nav.milestones": "المراحل",
  "nav.documents": "الوثائق",
  "nav.tech": "المكدس التقني",
  "nav.contact": "التواصل",
  "nav.architecture": "المعمارية",
  "nav.what": "ما هو AppBase",
  "nav.usecases": "حالات الاستخدام",
  "nav.comparison": "المقارنة",
  "nav.demo": "عرض ووثائق",
  "nav.beta": "التقدم التجريبي",
  "nav.beta.back": "← العودة إلى التقدم الحالي",

  "documents.heading": "الوثائق",
  "documents.presentation": "عرض مشروع التخرج",
  "documents.report": "تقرير مشروع التخرج",
  "documents.status.unavailable": "غير متاح بعد",
  "documents.status.in-progress": "قيد الإعداد",
  "documents.status.available": "متاح",
  "documents.open": "فتح",

  "contact.heading": "التواصل",
  "contact.github": "GitHub",
  "contact.linkedin": "LinkedIn",
  "contact.email": "البريد الإلكتروني",

  "footer.admin": "تحديث التقدم",

  "ms.planning.title": "التخطيط والمعمارية",
  "ms.planning.subtitle": "البحث وسجلات قرارات المعمارية وتصميم النظام",
  "ms.planning.weeks": "ما قبل M1",
  "ms.planning.deliverable": "README، وثائق المعمارية، ADRs، مواصفات API، سقالة المونوريبو",
  "ms.planning.w0.label": "البحث والقرارات",
  "ms.planning.w0.summary": "تقييم الأطر، كتابة ADRs، تصميم سطح API",
  "ms.planning.w0.t0": "تقييم الأطر (Fastify, Express, Hono)",
  "ms.planning.w0.t1": "ADR-001: اختيار إطار API",
  "ms.planning.w0.t2": "ADR-002: استراتيجية ORM والترحيل",
  "ms.planning.w0.t3": "ADR-003: استراتيجية تنفيذ المصادقة",
  "ms.planning.w0.t4": "تصميم مواصفات API (سطح REST)",
  "ms.planning.w0.t5": "وثيقة المعمارية (M1 → M4)",

  "ms.setup.title": "إعداد المشروع",
  "ms.setup.subtitle": "المونوريبو، والأدوات، وخط أنابيب CI",
  "ms.setup.weeks": "ما قبل M1",
  "ms.setup.deliverable": "مونوريبو Turborepo مع CI والـ linting والحزم المشتركة",
  "ms.setup.w0.label": "البنية التحتية",
  "ms.setup.w0.summary": "سقالة المونوريبو، والإعدادات المشتركة، وسير عمل CI",
  "ms.setup.w0.t0": "إعداد مونوريبو Turborepo",
  "ms.setup.w0.t1": "tsconfig وESLint وPrettier المشتركة",
  "ms.setup.w0.t2": "GitHub Actions CI (lint, typecheck, اختبارات)",
  "ms.setup.w0.t3": "هيكل الحزم (api, dashboard, sdk, db, types)",

  "ms.m1.title": "M1 — نسخة BaaS فردية",
  "ms.m1.subtitle": "المصادقة، قاعدة البيانات، التخزين، SDK، لوحة التحكم",
  "ms.m1.weeks": "الأسابيع 1–4",
  "ms.m1.deliverable": "وحدة BaaS واحدة، وSDK يعمل، وتطبيق عرض يعمل بالكامل بدون إنترنت",
  "ms.m1.w0.label": "الأسبوع 1 — المصادقة + مفاتيح API",
  "ms.m1.w0.summary": "نظام المصادقة ووسيطة مفتاح API",
  "ms.m1.w0.t0": "دمج better-auth (تسجيل، دخول، تجديد)",
  "ms.m1.w0.t1": "إصدار مفاتيح API والتحقق منها",
  "ms.m1.w0.t2": "وحدة المصادقة في SDK",
  "ms.m1.w1.label": "الأسبوع 2 — API قاعدة البيانات",
  "ms.m1.w1.summary": "CRUD للمجموعات ونقطة التحقق الأولى للعرض",
  "ms.m1.w1.t0": "نقاط نهاية إدارة المجموعات",
  "ms.m1.w1.t1": "CRUD كامل على السجلات",
  "ms.m1.w1.t2": "وحدة db في SDK",
  "ms.m1.w1.t3": "تطبيق العرض يخزن ويسترجع البيانات",
  "ms.m1.w2.label": "الأسبوع 3 — التخزين",
  "ms.m1.w2.summary": "رفع/تنزيل الملفات ووحدة التخزين في SDK",
  "ms.m1.w2.t0": "نقاط نهاية الرفع/التنزيل عبر الحاويات",
  "ms.m1.w2.t1": "عزل الملفات لكل مستخدم",
  "ms.m1.w2.t2": "وحدة storage في SDK",
  "ms.m1.w3.label": "الأسبوع 4 — الوقت الفعلي + لوحة التحكم",
  "ms.m1.w3.summary": "اشتراكات SSE، وواجهة الإدارة، وتعبئة Docker",
  "ms.m1.w3.t0": "SSE في الوقت الفعلي على مجموعات DB",
  "ms.m1.w3.t1": "طريقة subscribe()‎ في SDK",
  "ms.m1.w3.t2": "لوحة تحكم إدارة مخصصة للتطبيق",
  "ms.m1.w3.t3": "تعبئة Docker (أمر docker run واحد)",

  "ms.m2.title": "M2 — تنسيق الحاويات",
  "ms.m2.subtitle": "التوفير وعزل التطبيقات المتعددة",
  "ms.m2.weeks": "الأسابيع 5–6",
  "ms.m2.deliverable": "لوحة تحكم رئيسية توفر نسخ BaaS معزولة لكل تطبيق",
  "ms.m2.w0.label": "الأسبوع 5 — لوحة التحكم",
  "ms.m2.w0.summary": "العملية الرئيسية وتوفير التطبيقات",
  "ms.m2.w0.t0": "لوحة التحكم الرئيسية على appbase.local",
  "ms.m2.w0.t1": "خدمة توفير/حذف التطبيقات",
  "ms.m2.w0.t2": "دمج Docker SDK (dockerode)",
  "ms.m2.w1.label": "الأسبوع 6 — العزل",
  "ms.m2.w1.summary": "قواعد بيانات وتخزين وإدارة منافذ لكل تطبيق",
  "ms.m2.w1.t0": "فضاءات SQLite والتخزين لكل تطبيق",
  "ms.m2.w1.t1": "تخصيص المنافذ وإدارتها",
  "ms.m2.w1.t2": "المشرف يتتبع حالة التطبيقات ودورة حياتها",

  "ms.m3.title": "M3 — طبقة الشبكة",
  "ms.m3.subtitle": "التوجيه، mDNS، فحوصات الصحة",
  "ms.m3.weeks": "الأسابيع 7–8",
  "ms.m3.deliverable": "توجيه النطاقات الفرعية، واكتشاف الخدمات، والتعافي التلقائي",
  "ms.m3.w0.label": "الأسبوع 7 — التوجيه والاكتشاف",
  "ms.m3.w0.summary": "وكيل عكسي وإعلانات mDNS",
  "ms.m3.w0.t0": "وكيل عكسي Caddy (توجيه النطاق الفرعي)",
  "ms.m3.w0.t1": "إعلان واكتشاف خدمات mDNS",
  "ms.m3.w1.label": "الأسبوع 8 — المرونة",
  "ms.m3.w1.summary": "مراقبة الصحة وعزل الشبكة",
  "ms.m3.w1.t0": "فحوصات الصحة مع إعادة التشغيل التلقائي",
  "ms.m3.w1.t1": "عزل الشبكة بين حاويات التطبيقات",

  "ms.m4.title": "M4 — المراقبة والصقل",
  "ms.m4.subtitle": "لوحات البيانات، الوثائق، العرض الكامل",
  "ms.m4.weeks": "الأسابيع 9–10",
  "ms.m4.deliverable": "لوحة طوبولوجيا الشبكة، وثائق API، سيناريو عرض كامل",
  "ms.m4.w0.label": "الأسابيع 9–10",
  "ms.m4.w0.summary": "أدوات المراقبة واللمسات النهائية",
  "ms.m4.w0.t0": "لوحة طوبولوجيا الشبكة",
  "ms.m4.w0.t1": "حالة الصحة الحية وخريطة المنافذ",
  "ms.m4.w0.t2": "توثيق API (Swagger UI)",
  "ms.m4.w0.t3": "عرض توضيحي كامل (بدون إنترنت، متعدد التطبيقات، إعادة تشغيل تلقائي)",

  // ── modal ────────────────────────────────────────────────
  "modal.title": "تحوّل AppBase إلى معمارية بخدمات مشتركة",
  "modal.subtitle":
    "أنتج التصميم الأصلي «حاوية واحدة لكل تطبيق» صورًا بحجم 1.25 جيجابايت لكل تطبيق — وهو غير مستدام عند خمسة تطبيقات. المعمارية الجديدة مشتركة ومتعددة المستأجرين وأخفّ بكثير.",
  "modal.bullet1":
    "Postgres مشتركة، مصادقة مشتركة، تخزين مشترك — مكدّس واحد لتطبيقات متعددة.",
  "modal.bullet2":
    "التطبيقات مستأجرون في قاعدة البيانات، وليست حاويات قيد التشغيل. مئة تطبيق لا تكلّف أكثر من تطبيق واحد.",
  "modal.bullet3":
    "محمول، يعمل بدون إنترنت، جاهز للاستخدام — يعمل على أي جهاز عادي على الشبكة المحلية.",
  "modal.cta": "عرض المعمارية الرسمية",
  "modal.dismiss": "البقاء على النسخة التجريبية",
  "modal.close": "إغلاق",

  // ── architecture page : meta + nav ───────────────────────
  "arch.meta.title": "AppBase — المعمارية الرسمية",
  "arch.meta.description":
    "المعمارية متعددة المستأجرين بخدمات مشتركة لـ AppBase: المكونات، نموذج البيانات، المقارنة مع Firebase / AWS Amplify / Supabase، وحالات الاستخدام للعيادات والمدارس.",
  "nav.arch.overview": "نظرة عامة",
  "nav.arch.why": "لماذا التغيير",
  "nav.arch.components": "المكوّنات",
  "nav.arch.routing": "التوجيه",
  "nav.arch.data": "نموذج البيانات",
  "nav.arch.comparison": "المقارنة",
  "nav.arch.usecases": "حالات الاستخدام",
  "nav.arch.compliance": "الامتثال",
  "nav.arch.back": "← عرض التقدم (تجريبي)",

  // ── architecture page : hero + why ──────────────────────
  "arch.heading": "المعمارية الرسمية",
  "arch.intro":
    "AppBase منصة Backend مستضافة ذاتياً بخدمات مشتركة، موجهة للمؤسسات التي لا تستطيع إرسال بياناتها إلى السحابة. تثبيت واحد لكل مؤسسة، وعدة تطبيقات كمستأجرين منطقيين. تعمل بالكامل بدون إنترنت على أجهزة عادية في أقل من عشر دقائق.",
  "arch.why.heading": "لماذا غيّرنا التصميم",
  "arch.why.before":
    "قبل — حاوية Docker لكل تطبيق: كان كل تطبيق ينتج صورة بحجم 1.25 جيجابايت تحوي مصادقته وقاعدته وتخزينه. خمسة تطبيقات تعني أكثر من 6 جيجابايت من الخدمات المكررة، وبدون SSO.",
  "arch.why.after":
    "بعد — خدمات مشتركة: Postgres واحد، مصادقة واحدة، طبقة تخزين واحدة. التطبيقات صفوف في قاعدة البيانات، محدودة النطاق بمفتاح API. إضافة التطبيق المئة لا يكلّف ذاكرة أكثر من الأول.",

  // ── architecture page : diagrams ─────────────────────────
  "arch.diagram.components.title": "خريطة المكوّنات",
  "arch.diagram.components.caption":
    "جهاز واحد على الشبكة المحلية يشغّل كامل المكدّس عبر Docker Compose. Caddy في الواجهة، وبيانات المستأجرين معزولة في طبقة التطبيق.",
  "arch.diagram.routing.title": "خريطة التوجيه",
  "arch.diagram.routing.caption":
    "نطاقات فرعية ودودة *.{org}.local، يحلّها mDNS على الشبكة المحلية مع CoreDNS كاحتياطي للإنتاج.",
  "arch.diagram.data.title": "نموذج البيانات",
  "arch.diagram.data.caption":
    "كل سجل يحمل org_id و app_id. التحقق من الصلاحيات يُفرض على مستوى المنصة، ولا يُفوّض للمطورين.",
  "arch.node.lan": "الشبكة المحلية — *.{org}.local",
  "arch.node.host": "جهاز واحد (mini-PC أو خادم أو حاسوب محمول)",
  "arch.node.compose": "مكدّس Docker Compose",
  "arch.node.caddy": "Caddy",
  "arch.node.caddy.role": "وكيل عكسي · 80/443",
  "arch.node.coredns": "CoreDNS",
  "arch.node.coredns.role": "سلطة DNS · *.{org}.local",
  "arch.node.mdns": "مُعلن mDNS",
  "arch.node.mdns.role": "اكتشاف خدمات الشبكة المحلية",
  "arch.node.api": "خادم API",
  "arch.node.api.role": "مصادقة · قاعدة بيانات · تخزين",
  "arch.node.console": "واجهة التحكم",
  "arch.node.console.role": "لوحة Next.js للإدارة",
  "arch.node.postgres": "PostgreSQL",
  "arch.node.postgres.role": "بيانات معزولة لكل مستأجر",
  "arch.node.storage": "تخزين الملفات",
  "arch.node.storage.role": "/var/appbase/",
  "arch.route.console": "console.{org}.local",
  "arch.route.console.target": "لوحة الإدارة",
  "arch.route.api": "api.{org}.local",
  "arch.route.api.target": "خادم API",
  "arch.route.app": "console.{org}.local/apps/{name}",
  "arch.route.app.target": "لوحة المطوّر لكل تطبيق",
  "arch.route.frontend": "{appname}.{org}.local",
  "arch.route.frontend.target": "ملفات ثابتة للواجهة الأمامية المنشورة",
  "arch.data.org": "organizations",
  "arch.data.org.note": "صف واحد — العيادة / المدرسة نفسها",
  "arch.data.users": "users",
  "arch.data.users.note": "المسؤولون + المستخدمون النهائيون",
  "arch.data.apps": "apps",
  "arch.data.apps.note": "ينشئها المسؤولون ؛ كل واحدة تحصل على مفتاح API",
  "arch.data.keys": "api_keys",
  "arch.data.keys.note": "بيانات اعتماد محدودة النطاق لكل تطبيق",
  "arch.data.deployments": "deployments",
  "arch.data.deployments.note": "إصدارات الواجهة الأمامية",
  "arch.data.access": "user_app_access",
  "arch.data.access.note": "أي مستخدم يستطيع استخدام أي تطبيق",

  // ── architecture page : comparison ───────────────────────
  "arch.cmp.heading": "المقارنة مع الحلول الموجودة",
  "arch.cmp.intro":
    "تتفوّق منصات BaaS الحالية كلٌّ على محور مختلف. لا تجمع أيّ منها بين العمل بدون إنترنت، وإقامة البيانات داخل المؤسسة، وعزل التطبيقات المتعددة، والنشر بدون فريق DevOps.",
  "arch.cmp.product.appbase": "AppBase",
  "arch.cmp.product.firebase": "Firebase",
  "arch.cmp.product.amplify": "AWS Amplify",
  "arch.cmp.product.supabase": "Supabase Cloud",
  "arch.cmp.axis.residency": "إقامة البيانات",
  "arch.cmp.axis.compliance": "ملاءمة قانون 09-08",
  "arch.cmp.axis.complexity": "تعقيد التركيب",
  "arch.cmp.axis.footprint": "البصمة",
  "arch.cmp.axis.isolation": "عزل التطبيقات المتعددة",
  "arch.cmp.axis.lan": "أصلي على الشبكة المحلية",
  "arch.cmp.axis.plug": "جاهز للاستخدام",
  "arch.cmp.appbase.residency": "داخل المؤسسة · شبكة محلية فقط",
  "arch.cmp.appbase.compliance": "ملاءمة أصلية — البيانات لا تغادر المنشأة",
  "arch.cmp.appbase.complexity": "نص تركيب واحد",
  "arch.cmp.appbase.footprint": "~500 ميغابايت للمكدّس بأكمله",
  "arch.cmp.appbase.isolation": "مستأجرون محدودون على مستوى المنصة",
  "arch.cmp.appbase.lan": "نعم — mDNS + CoreDNS",
  "arch.cmp.appbase.plug": "نعم — أقل من 10 دقائق",
  "arch.cmp.firebase.residency": "Google Cloud (مناطق أمريكا/أوروبا)",
  "arch.cmp.firebase.compliance": "يتطلّب ترخيص CNDP لنقل البيانات (المادة 43)",
  "arch.cmp.firebase.complexity": "منخفض في السحابة، لكنه يتطلّب الإنترنت",
  "arch.cmp.firebase.footprint": "سحابة — لا بصمة محلية",
  "arch.cmp.firebase.isolation": "على مستوى المشروع فقط",
  "arch.cmp.firebase.lan": "لا — يعتمد على الإنترنت",
  "arch.cmp.firebase.plug": "لا — لا يعمل بدون إنترنت",
  "arch.cmp.amplify.residency": "مناطق AWS (غالباً أوروبا/أمريكا)",
  "arch.cmp.amplify.compliance": "نفس مشكلة النقل عبر الحدود · DPA معقّدة",
  "arch.cmp.amplify.complexity": "عالٍ — IAM وCDK وإعدادات",
  "arch.cmp.amplify.footprint": "سحابة — لا بصمة محلية",
  "arch.cmp.amplify.isolation": "حسب البيئة والمكدّس",
  "arch.cmp.amplify.lan": "لا",
  "arch.cmp.amplify.plug": "لا — يحتاج DevOps",
  "arch.cmp.supabase.residency": "مناطق مدعومة بـ AWS",
  "arch.cmp.supabase.compliance": "نفس مشكلة النقل عبر الحدود",
  "arch.cmp.supabase.complexity": "منخفض في السحابة · متوسّط في الاستضافة الذاتية",
  "arch.cmp.supabase.footprint": "سحابة — لا بصمة محلية",
  "arch.cmp.supabase.isolation": "سياسات RLS لكل مشروع",
  "arch.cmp.supabase.lan": "لا",
  "arch.cmp.supabase.plug": "السحابة فقط — النسخة الذاتية تحتاج DevOps",
  // ── architecture page : use cases ────────────────────────
  "arch.uc.heading": "حالات الاستخدام",
  "arch.uc.intro":
    "سيناريوهان واقعيان لا يكون فيهما التشغيل داخل المؤسسة مجرّد تفضيل، بل ضرورة صارمة.",
  "arch.uc.clinics.title": "العيادات — ملفات المرضى، المواعيد، المراسلة الداخلية",
  "arch.uc.clinics.body":
    "عيادة بـ 30 موظفاً في فاس تحتاج تطبيقات داخلية لملفات المرضى، حجز المواعيد، ومتابعة الوصفات الطبية. بيانات المرضى بيانات شخصية حسّاسة بمفهوم القانون 09-08 — إرسالها إلى Firebase أو AWS يتطلّب ترخيصاً صريحاً من CNDP لنقل البيانات عبر الحدود، إضافة إلى موافقة المريض، وDPA موثّقة. أغلب العيادات الصغيرة لا تستطيع إكمال هذه المسطرة.",
  "arch.uc.clinics.flow":
    "مع AppBase، يقوم تقني العيادة بتركيب mini-PC خلف مكتب الاستقبال. يفتح الأطباء records.clinic.local على لوحاتهم، ويفتح الممرضون tasks.clinic.local على هواتفهم. يعمل SSO تلقائياً بين التطبيقات. فصل كابل الإنترنت يثبت أن لا شيء يغادر المبنى. النسخ الاحتياطي يتلخّص في dump واحد لقاعدة Postgres على مفتاح USB يُحفظ في الخزانة.",
  "arch.uc.schools.title": "المدارس — النقاط، الحضور، بوابة الآباء",
  "arch.uc.schools.body":
    "مدرسة تدير النقاط والحضور وبوابة للآباء. بيانات الأطفال الشخصية محميّة مرّتين — بالقانون 09-08 وبقواعد اعتماد المدرسة. يريد الأساتذة تجربة رقمية سلسة، والمدير لا يستطيع تحمّل تسرّب بيانات أو تحقيق من CNDP.",
  "arch.uc.schools.flow":
    "يعمل AppBase على جهاز واحد في مكتب المدير. يتّصل الأساتذة بـ grades.school.local من حواسيب القاعات، وبـ attendance.school.local من اللوحات عند المدخل. تعمل بوابة الآباء على نفس المكدّس. يقوم مزوّد المدرسة بالتركيب مرة واحدة ولا يعود — لا حساب سحابي يُدار، ولا فاتورة شهرية، ولا انقطاع إنترنت يعطّل اليوم الدراسي.",

  // ── architecture page : compliance ───────────────────────
  "arch.law.heading": "الامتثال — قانون 09-08 وإقامة البيانات في المغرب",
  "arch.law.intro":
    "تعمل المؤسسات المغربية التي تعالج بيانات شخصية ضمن إطار قانوني خاص. المنصات السحابية المصمّمة للسوق الأمريكي أو الأوروبي لا تُغطّيه أصالةً.",
  "arch.law.what":
    "القانون 09-08، الصادر سنة 2009، ينظّم حماية الأشخاص الذاتيين تجاه معالجة البيانات ذات الطابع الشخصي بالمغرب. يعرّف البيانات الشخصية، والبيانات الحسّاسة (ومنها البيانات الصحية)، وحقوق الأشخاص المعنيين، والتزامات المسؤولين عن المعالجة.",
  "arch.law.cnpd":
    "اللجنة الوطنية لمراقبة حماية المعطيات ذات الطابع الشخصي (CNDP) هي السلطة الوطنية. أغلب المعالجات يجب التصريح بها لها، وبعضها — خاصة ما يتعلّق بالبيانات الحسّاسة — يستلزم ترخيصاً مسبقاً، لا مجرّد تصريح.",
  "arch.law.cloud":
    "تمنع المادة 43 من القانون 09-08 نقل البيانات الشخصية إلى دولة أجنبية لا تكفل مستوى حماية كافياً، إلا بترخيص مسبق من CNDP. عملياً، تخزين بيانات المرضى أو التلاميذ على Firebase (مناطق أمريكا/أوروبا) أو AWS (فرانكفورت، إيرلندا) يفرض مسطرة ترخيص موثّقة — DPA، وموافقة صريحة من الشخص المعني، ودراسة من CNDP. أغلب المؤسسات الصغيرة لا تُكمل هذه المسطرة وتشتغل في منطقة رمادية قانونياً.",
  "arch.law.appbase":
    "بما أن AppBase يعمل بالكامل داخل المؤسسة، على جهاز ضمن شبكتها، فلا يحدث أي نقل عبر الحدود. السؤال القانوني الذي يعرقل تبنّي السحابة لا يُطرح أصلاً. هذا هو السبب المعماري لوجود AppBase، وليس مجرّد إضافة تسويقية.",
  "arch.law.disclaimer":
    "هذه الصفحة إعلامية وتعكس قراءة المؤلف لمصادر قانونية عامة. لا تشكّل استشارة قانونية. على المؤسسات الخاضعة للقانون 09-08 استشارة محامٍ مغربي مختص في حماية البيانات لحالتها الخاصة.",

  // ── المعالم الجديدة (ما بعد التحوّل) ──────────────────────
  "ms.core.title": "نواة BaaS",
  "ms.core.subtitle": "مصادقة، قاعدة بيانات، تخزين، آني، SDK",
  "ms.core.weeks": "الأسابيع 1–4",
  "ms.core.deliverable": "خادم خلفي عامل مع SDK يستهلكه تطبيق تجريبي",
  "ms.core.w0.label": "أسس الخادم الخلفي",
  "ms.core.w0.summary": "كل بدائيات BaaS الأربع جاهزة على واجهة API واحدة",
  "ms.core.t.auth": "better-auth (الجلسات، مفاتيح API)",
  "ms.core.t.db": "قاعدة البيانات (المجموعات + CRUD)",
  "ms.core.t.storage": "التخزين (الدلاء، التحميلات المحدودة النطاق)",
  "ms.core.t.realtime": "الوقت الفعلي (SSE على المجموعات)",
  "ms.core.t.sdk": "SDK (auth، db، storage، subscribe)",

  "ms.ops.title": "الشبكات و DevOps",
  "ms.ops.subtitle": "التوجيه، mDNS، البروكسي العكسي، compose، CLI، الصحة",
  "ms.ops.weeks": "الأسابيع 5–7",
  "ms.ops.deliverable": "console.{org}.local متاح من أي جهاز على الشبكة المحلية",
  "ms.ops.w0.label": "البنية التحتية",
  "ms.ops.w0.summary":
    "ربط المكوّنات بحيث تنطلق المنصة بأمر docker-compose up واحد وتُحلّ على الشبكة المحلية.",
  "ms.ops.t.routing": "Caddy reverse-proxy + التوجيه عبر النطاقات الفرعية",
  "ms.ops.t.mdns": "mDNS + CoreDNS لحل *.local",
  "ms.ops.t.compose": "docker-compose يدير الحزمة الكاملة",
  "ms.ops.t.cli": "CLI للإعداد (init، status، deploy)",
  "ms.ops.t.health": "Health checks عبر الخدمات",
  "ms.ops.t.console": "console.{org}.local متاح من أي جهاز LAN",

  "ms.finals.title": "اللمسات الأخيرة",
  "ms.finals.subtitle": "ربط BaaS بـ Ops؛ refactor إلى نسخة واحدة",
  "ms.finals.weeks": "الأسبوع 8",
  "ms.finals.deliverable": "BaaS يعمل ضمن الحزمة المنسّقة",
  "ms.finals.w0.label": "التكامل",
  "ms.finals.w0.summary":
    "ربط خادم BaaS الحالي بالبنية التحتية الجديدة لـ Ops والانتقال نحو نموذج single-instance إن سمح الوقت.",
  "ms.finals.t.wire": "ربط AppBase BaaS بالبنية التحتية لـ Ops",
  "ms.finals.t.single": "الإعداد كنسخة واحدة (refactor إن سمح الوقت)",

  "ms.demo.title": "العرض و الوثائق",
  "ms.demo.subtitle": "دليل التثبيت، وثائق SDK، فيديو عرض",
  "ms.demo.weeks": "الأسبوع 9",
  "ms.demo.deliverable": "تثبيت قابل للتكرار + عرض مسجّل لتدفّق العمل",
  "ms.demo.w0.label": "التسليم",
  "ms.demo.w0.summary":
    "كل ما يحتاجه شخص آخر لتثبيت AppBase والبناء عليه ورؤيته يعمل في بيئة محلية.",
  "ms.demo.t.install": "دليل تثبيت AppBase + رابط المستودع",
  "ms.demo.t.sdk": "وثائق AppBase SDK",
  "ms.demo.t.video": "فيديو عرض في بيئة محلية",

  "home.hero.eyebrow": "مشروع التخرج · ENSA فاس",
  "home.hero.heading": "Backend-as-a-Service يعيش على شبكتك المحلية.",
  "home.hero.subhead":
    "يقدّم AppBase للعيادات والمدارس والمكاتب الصغيرة نفس تجربة المطوّر التي يقدّمها Firebase — باستثناء أن كل بايت يبقى على جهاز يملكونه.",

  "demo.heading": "العرض و الوثائق",
  "demo.intro":
    "بمجرد إنجاز Ops واللمسات الأخيرة، سيستضيف هذا القسم دليل التثبيت ومرجع SDK وفيديو عرض في بيئة محلية.",
  "demo.install.title": "تثبيت AppBase",
  "demo.install.body": "تثبيت بسطر واحد + حزمة Docker Compose على أي مضيف LAN.",
  "demo.sdk.title": "AppBase SDK",
  "demo.sdk.body": "SDK بـ TypeScript للمصادقة والبيانات والتخزين والوقت الفعلي.",
  "demo.video.title": "فيديو العرض",
  "demo.video.body": "عرض من البداية إلى النهاية مسجّل في بيئة محلية.",
  "demo.coming": "قريباً",
  "demo.open": "فتح",
};

export default ar;
