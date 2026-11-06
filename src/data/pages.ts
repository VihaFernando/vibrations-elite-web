import { site } from '../config/site';

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}

const brand = site.shortName;

export const pages: PageMeta[] = [
  {
    path: '/',
    title: `${brand} | Mobile Phones & Accessories in Kandana, Sri Lanka`,
    description:
      'Vibrations Elite (Pvt) Ltd. is a mobile technology business in Kandana, Sri Lanka. Discover smartphones, wireless audio, chargers, cases and smartwatches.',
  },
  {
    path: '/about',
    title: `About | ${brand}`,
    description:
      'Vibrations Elite (Pvt) Ltd. is a Sri Lankan company in Kandana focused on mobile phones, mobile accessories and consumer electronics.',
  },
  {
    path: '/smartphones',
    title: `Smartphones | ${brand}`,
    description:
      'Explore the world of smartphones at Vibrations Elite: iPhone, Samsung Galaxy, Xiaomi, Redmi and OnePlus. Contact us in Kandana, Sri Lanka to ask about a phone.',
  },
  {
    path: '/accessories',
    title: `Accessories | ${brand}`,
    description:
      'Wireless earbuds, premium headphones, chargers, charging cables, phone cases, smartwatches and everyday mobile accessories at Vibrations Elite, Sri Lanka.',
  },
  {
    path: '/brands',
    title: `Brands | ${brand}`,
    description:
      'A guide to leading mobile technology brands, including Apple, Samsung, Xiaomi, Redmi, OnePlus, Anker, JBL, Sony, Baseus, Soundcore and SoundPEATS.',
  },
  {
    path: '/contact',
    title: `Contact | ${brand}`,
    description:
      'Contact Vibrations Elite (Pvt) Ltd. at No. 119, Ganemulla Road, Kandana, Sri Lanka, or send an enquiry about mobile phones and accessories.',
  },
];

export const notFoundMeta: PageMeta = {
  path: '/404',
  title: `Page Not Found | ${brand}`,
  description: 'The page you were looking for could not be found.',
  noindex: true,
};

export const metaForPath = (path: string): PageMeta => {
  const clean = path.length > 1 ? path.replace(/\/+$/, '') : path;
  return pages.find((p) => p.path === clean) ?? notFoundMeta;
};

export const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Smartphones', to: '/smartphones' },
  { label: 'Accessories', to: '/accessories' },
  { label: 'Brands', to: '/brands' },
  { label: 'Contact', to: '/contact' },
];
