import { SITE_URL, SITE_NAME, LEGAL_NAME, ALTERNATE_NAME, CONTACT_EMAIL, ORG_DESCRIPTION, SOCIAL_PROFILES, LOGO_PATH, absoluteUrl } from "@/lib/site";

export default function OrganizationSchema() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ALTERNATE_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(LOGO_PATH),
    },
    email: CONTACT_EMAIL,
    description: ORG_DESCRIPTION,
    sameAs: SOCIAL_PROFILES,
    address: {
      "@type": "PostalAddress",
      streetAddress: "410 E 95th St",
      addressLocality: "Brooklyn",
      addressRegion: "NY",
      postalCode: "11212",
      addressCountry: "US",
    },
    // TODO: confirm and add foundingDate (e.g. "2023-01-01")
    // TODO: confirm and add numberOfEmployees
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "contact@flacronenterprises.com",
      telephone: "+1-929-444-1275",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
