import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Footer from "@/components/parts/Footer";
import Header from "@/components/parts/Header";
import { Providers } from "@/store/providers";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!hasLocale(routing.locales, params.locale)) {
    notFound();
  }

  const messages = (await import(`@/messages/${params.locale}.json`)).default;

  return (
    <html lang={params.locale} dir={params.locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <Providers>
          <NextIntlClientProvider locale={params.locale} messages={messages}>
            <Header />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
