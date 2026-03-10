import { useEffect } from 'react';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalPath?: string;
}

const BASE_URL = 'https://thesleeponix.com';
const DEFAULT_IMAGE = `${BASE_URL}/images/og logo.png`;

/**
 * useSEO — Dynamically updates the page <title> and meta tags per route.
 * Call this at the top of any page component to override the global defaults.
 */
export function useSEO({
  title,
  description,
  keywords,
  ogImage = DEFAULT_IMAGE,
  canonicalPath,
}: SEOConfig) {
  useEffect(() => {
    // Page Title
    document.title = title;

    // Helper to set/create a meta tag
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName] = selector.match(/\[(.*?)=/) ?? [];
        if (attrName) {
          const name = attrName.replace('[', '').replace('=', '');
          el.setAttribute(name, selector.match(/["']([^"']+)["']/)?.[1] ?? '');
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // Primary meta
    setMeta('meta[name="description"]', 'content', description);
    if (keywords) setMeta('meta[name="keywords"]', 'content', keywords);

    // Open Graph
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:image"]', 'content', ogImage);
    if (canonicalPath) {
      setMeta('meta[property="og:url"]', 'content', `${BASE_URL}${canonicalPath}`);
    }

    // Twitter
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', ogImage);

    // Canonical link
    if (canonicalPath) {
      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = `${BASE_URL}${canonicalPath}`;
    }

    // Restore default title on unmount (when navigating away)
    return () => {
      document.title = 'Sleeponix - Premium Natural Latex Mattresses | 100% Organic Sleep Solutions';
    };
  }, [title, description, keywords, ogImage, canonicalPath]);
}
