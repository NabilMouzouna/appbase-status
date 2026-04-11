import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, isLocale } from "./lib/i18n/dictionaries";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip non-page routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if pathname already starts with a locale
  const pathnameLocale = pathname.split("/")[1];
  if (isLocale(pathnameLocale)) {
    return NextResponse.next();
  }

  // Detect preferred locale from Accept-Language header
  const acceptLang = request.headers.get("accept-language") ?? "";
  const preferred = acceptLang
    .split(",")
    .map((s) => s.split(";")[0].trim().slice(0, 2).toLowerCase())
    .find((lang) => isLocale(lang));

  const locale = preferred ?? defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
