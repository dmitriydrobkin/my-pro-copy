export function StructuredData({ lang }: { lang: string }) {
  const isUk = lang === 'uk';
  const description = isUk 
    ? "Розробка сайтів та Telegram-ботів для бізнесу" 
    : "Разработка сайтов и Telegram-ботов для бизнеса";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Malyshev.Dev",
    "description": description,
    "url": "https://malyshev.dev",
    "priceRange": "$$",
    "areaServed": {
      "@type": "Country",
      "name": "Ukraine"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
