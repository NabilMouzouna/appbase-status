import type { Dictionary } from "./en";

export type Locale = "en" | "fr" | "ar";
export const locales: Locale[] = ["en", "fr", "ar"];
export const defaultLocale: Locale = "en";

const loaders: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  en: () => import("./en"),
  fr: () => import("./fr"),
  ar: () => import("./ar"),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const mod = await loaders[locale]();
  return mod.default;
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
