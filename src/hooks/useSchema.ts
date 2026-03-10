import { useEffect } from 'react';

/* -----------------------------------------------------------------------
   SchemaMarkup — Injects JSON-LD structured data into <head>
   Supports: Organization, WebSite, Product, BreadcrumbList schemas
   Google uses these to show rich snippets (star ratings, prices, etc.)
----------------------------------------------------------------------- */

interface OrganizationSchema {
  type: 'Organization';
}

interface ProductSchema {
  type: 'Product';
  name: string;
  description: string;
  image: string;
  brand?: string;
  sku?: string;
  price: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  rating?: number;
  reviewCount?: number;
  url: string;
}

interface BreadcrumbSchema {
  type: 'BreadcrumbList';
  items: Array<{ name: string; url: string }>;
}

type SchemaConfig = OrganizationSchema | ProductSchema | BreadcrumbSchema;

const BASE_URL = 'https://thesleeponix.com';

function buildSchema(config: SchemaConfig): object {
  switch (config.type) {
    case 'Organization':
      return {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${BASE_URL}/#organization`,
            name: 'Sleeponix',
            url: BASE_URL,
            logo: {
              '@type': 'ImageObject',
              url: `${BASE_URL}/images/og logo.png`,
              width: 400,
              height: 100,
            },
            description: 'Premium natural latex mattress brand offering 100% organic, hypoallergenic, and eco-friendly sleep solutions with a 25-year warranty.',
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              email: 'support@sleeponix.com',
              availableLanguage: ['English', 'Hindi'],
            },
            sameAs: [
              'https://www.facebook.com/sleeponix',
              'https://www.instagram.com/sleeponix',
              'https://www.youtube.com/sleeponix',
            ],
          },
          {
            '@type': 'WebSite',
            '@id': `${BASE_URL}/#website`,
            url: BASE_URL,
            name: 'Sleeponix',
            publisher: { '@id': `${BASE_URL}/#organization` },
            potentialAction: {
              '@type': 'SearchAction',
              target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/shop?q={search_term_string}` },
              'query-input': 'required name=search_term_string',
            },
          },
        ],
      };

    case 'Product':
      return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: config.name,
        description: config.description,
        image: config.image.startsWith('http') ? config.image : `${BASE_URL}${config.image}`,
        sku: config.sku ?? config.name.toLowerCase().replace(/\s+/g, '-'),
        brand: {
          '@type': 'Brand',
          name: config.brand ?? 'Sleeponix',
        },
        offers: {
          '@type': 'Offer',
          url: config.url.startsWith('http') ? config.url : `${BASE_URL}${config.url}`,
          priceCurrency: config.currency ?? 'INR',
          price: config.price,
          availability: `https://schema.org/${config.availability ?? 'InStock'}`,
          seller: {
            '@type': 'Organization',
            name: 'Sleeponix',
          },
        },
        ...(config.rating !== undefined && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: config.rating,
            bestRating: 5,
            worstRating: 1,
            reviewCount: config.reviewCount ?? 48,
          },
        }),
      };

    case 'BreadcrumbList':
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: config.items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
        })),
      };
  }
}

// Unique ID for each schema script tag so we can update without duplicating
const SCHEMA_SCRIPT_ID = 'sleeponix-schema-ld';

export function useSchema(config: SchemaConfig) {
  useEffect(() => {
    const schema = buildSchema(config);
    const id = `${SCHEMA_SCRIPT_ID}-${config.type.toLowerCase()}`;

    // Remove old script for this type if it exists
    document.getElementById(id)?.remove();

    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);

    return () => {
      document.getElementById(id)?.remove();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.type]);
}
