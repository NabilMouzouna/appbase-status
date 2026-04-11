import type { Metadata } from "next";
import { getDictionary, isLocale, locales } from "../../lib/i18n/dictionaries";
import type { Locale } from "../../lib/i18n/dictionaries";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = await getDictionary(locale);
  return {
    title: d["meta.title"],
    description: d["meta.description"],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = isLocale(locale) ? (locale as Locale) : "en";
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <div lang={lang} dir={dir} className={dir === "rtl" ? "rtl" : ""}>
      {children}
    </div>
  );
}
