import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';
import { links, site } from './config/site';

export { notFoundMeta, pages } from './data/pages';
export { site };

export const render = (url: string) =>
  renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );

/** Contains only verified business details. Contact fields appear once configured. */
export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'MobilePhoneStore',
  name: site.name,
  url: site.url,
  image: `${site.url}/og-image.jpg`,
  logo: `${site.url}/brand/logo-mark-512.png`,
  description: site.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressCountry: site.address.countryCode,
  },
  hasMap: links.mapsSearch,
  ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
  ...(site.contact.email ? { email: site.contact.email } : {}),
  ...(Object.values(site.social).some(Boolean) ? { sameAs: Object.values(site.social).filter(Boolean) } : {}),
};
