/**
 * Everything the showcases display. Every image here was checked by eye against the
 * product it is labelled as. See IMAGE_SOURCES.md before swapping one.
 *
 * Copy stays at brand or product-family level, with no prices, stock or availability.
 */

export interface Shot {
  image: string;
  /** Short visible label naming what the photograph shows. */
  label: string;
  alt: string;
}

export interface Phone {
  id: string;
  brand: string;
  title: string;
  line: string;
  body: string;
  shot: Shot;
  second?: Shot;
}

export const phones: Phone[] = [
  {
    id: 'apple',
    brand: 'Apple',
    title: 'iPhone',
    line: 'Titanium. Precision. Pro.',
    body: 'Apple’s iPhone range, including the Pro models with titanium designs and advanced camera systems.',
    shot: {
      image: 'iphone-16-pro',
      label: 'iPhone 16 Pro',
      alt: 'Apple iPhone 16 Pro in a titanium finish, rear view, on a grey textured surface',
    },
  },
  {
    id: 'samsung',
    brand: 'Samsung',
    title: 'Samsung Galaxy',
    line: 'From slim flagships to foldables.',
    body: 'The Galaxy family spans everyday phones, S series flagships and foldable designs.',
    shot: {
      image: 'samsung-galaxy',
      label: 'Samsung Galaxy phone with Galaxy Buds',
      alt: 'Black Samsung Galaxy phone beside Galaxy Buds earbuds, their case and a stylus on a light grey surface',
    },
    second: {
      image: 'samsung-z-fold',
      label: 'Samsung Galaxy Z Fold',
      alt: 'Rear view of a black Samsung Galaxy Z Fold with its triple camera',
    },
  },
  {
    id: 'xiaomi',
    brand: 'Xiaomi',
    title: 'Xiaomi',
    line: 'Built around the camera.',
    body: 'Xiaomi’s flagship phones put photography first, led by the Ultra series.',
    shot: {
      image: 'xiaomi-15-ultra',
      label: 'Xiaomi 15 Ultra',
      alt: 'Xiaomi 15 Ultra with its large circular camera, beside its retail box on a wooden table',
    },
  },
  {
    id: 'redmi',
    brand: 'Redmi',
    title: 'Redmi',
    line: 'The Note series and beyond.',
    body: 'Redmi is Xiaomi’s line of feature-rich phones, including the long-running Note series.',
    shot: {
      image: 'redmi-note-10-pro',
      label: 'Redmi Note 10 Pro',
      alt: 'Green Redmi Note 10 Pro, rear view, lying on dark tree bark',
    },
  },
  {
    id: 'oneplus',
    brand: 'OnePlus',
    title: 'OnePlus',
    line: 'Smooth, fast Android.',
    body: 'OnePlus phones are known for fast charging and a clean, responsive Android experience.',
    shot: {
      image: 'oneplus-8-pro',
      label: 'OnePlus 8 Pro',
      alt: 'Blue OnePlus 8 Pro, rear view, resting on its red retail box',
    },
  },
];

export interface AccessoryGroup {
  id: string;
  title: string;
  body: string;
  shots: Shot[];
}

export const accessories: AccessoryGroup[] = [
  {
    id: 'wireless-earbuds',
    title: 'Wireless Earbuds',
    body: 'Pocket-sized audio for calls, music and travel, from noise-cancelling flagships to everyday pairs.',
    shots: [
      {
        image: 'airpods-pro',
        label: 'Apple AirPods Pro',
        alt: 'Apple AirPods Pro in their open white charging case beside the retail box',
      },
      {
        image: 'galaxy-buds',
        label: 'Samsung Galaxy Buds',
        alt: 'Silver Samsung Galaxy Buds in an open charging case inside a grey fabric cover',
      },
      {
        image: 'soundpeats-t3-pro',
        label: 'SoundPEATS T3 Pro',
        alt: 'Black SoundPEATS T3 Pro wireless earbuds above their leather-textured charging case',
      },
    ],
  },
  {
    id: 'premium-headphones',
    title: 'Premium Headphones',
    body: 'Over-ear comfort and fuller sound for long listening sessions.',
    shots: [
      {
        image: 'jbl-headphones',
        label: 'JBL wireless headphones',
        alt: 'Black JBL wireless over-ear headphones resting on a white desk',
      },
      {
        image: 'sony-headphones',
        label: 'Sony headphones',
        alt: 'Close-up of black and silver Sony over-ear headphones, folded, showing the Sony name',
      },
      {
        image: 'soundcore-space-one',
        label: 'Soundcore Space One',
        alt: 'Pale blue Soundcore Space One over-ear headphones',
      },
    ],
  },
  {
    id: 'chargers-adapters',
    title: 'Chargers and Adapters',
    body: 'Fast wall charging, travel adapters and magnetic wireless charging.',
    shots: [
      {
        image: 'baseus-70w-gan',
        label: 'Baseus 70W GaN adapter',
        alt: 'Black Baseus 70W GaN travel adapter on a white surface',
      },
      {
        image: 'magsafe-charger',
        label: 'Apple MagSafe Charger',
        alt: 'Round Apple MagSafe Charger with its cable on a pale blue surface',
      },
    ],
  },
  {
    id: 'charging-cables',
    title: 'Charging Cables',
    body: 'The everyday connection between your phone and its power.',
    shots: [
      {
        image: 'usb-cable',
        label: 'USB charging cable',
        alt: 'White USB charging cable against a pale background',
      },
    ],
  },
  {
    id: 'phone-cases',
    title: 'Phone Cases',
    body: 'Slim leather and folio designs that protect the phone you rely on.',
    shots: [
      {
        image: 'iphone-leather-case',
        label: 'Leather case on iPhone 11 Pro',
        alt: 'iPhone 11 Pro in a brown leather case beside AirPods Pro earbuds',
      },
      {
        image: 'folio-cases',
        label: 'Leather folio cases',
        alt: 'Leather-textured folio phone cases in brown, black, grey and burgundy on a dark surface',
      },
    ],
  },
  {
    id: 'smartwatches',
    title: 'Smartwatches',
    body: 'Notifications, activity and more, right on your wrist.',
    shots: [
      {
        image: 'apple-watch-ultra',
        label: 'Apple Watch Ultra',
        alt: 'Apple Watch Ultra showing its colourful app grid, lying on weathered blue wood',
      },
      {
        image: 'galaxy-watch',
        label: 'Samsung Galaxy Watch',
        alt: 'Close-up of a Samsung Galaxy Watch with its display lit, on a dark table',
      },
    ],
  },
  {
    id: 'other-accessories',
    title: 'Other Mobile Accessories',
    body: 'Power banks and the other essentials that keep you going away from a socket.',
    shots: [
      {
        image: 'anker-power-bank',
        label: 'Anker power bank',
        alt: 'Black Anker power bank on a pink padded sleeve with a small camera and tripod',
      },
    ],
  },
];

export interface Brand {
  id: string;
  name: string;
  summary: string;
  link: string;
  image?: string;
  alt?: string;
}

export const smartphoneBrands: Brand[] = [
  { id: 'apple', name: 'Apple', summary: 'iPhone, AirPods, Apple Watch and MagSafe accessories.', link: '/smartphones#apple' },
  { id: 'samsung', name: 'Samsung', summary: 'Galaxy phones, Galaxy Buds and Galaxy Watch.', link: '/smartphones#samsung' },
  { id: 'xiaomi', name: 'Xiaomi', summary: 'Camera-led flagship phones and connected devices.', link: '/smartphones#xiaomi' },
  { id: 'redmi', name: 'Redmi', summary: 'The Note series and other Xiaomi-family phones.', link: '/smartphones#redmi' },
  { id: 'oneplus', name: 'OnePlus', summary: 'Android phones focused on speed and fast charging.', link: '/smartphones#oneplus' },
];

export const accessoryBrands: Brand[] = [
  { id: 'anker', name: 'Anker', summary: 'Power banks, chargers and charging accessories.', link: '/accessories#other-accessories', image: 'anker-power-bank', alt: 'Black Anker power bank' },
  { id: 'jbl', name: 'JBL', summary: 'Headphones and personal audio.', link: '/accessories#premium-headphones', image: 'jbl-headphones', alt: 'Black JBL wireless headphones' },
  { id: 'sony', name: 'Sony', summary: 'Over-ear headphones and personal audio.', link: '/accessories#premium-headphones', image: 'sony-headphones', alt: 'Black and silver Sony headphones' },
  { id: 'baseus', name: 'Baseus', summary: 'Chargers, adapters and power accessories.', link: '/accessories#chargers-adapters', image: 'baseus-70w-gan', alt: 'Black Baseus 70W GaN travel adapter on a white surface' },
  { id: 'soundpeats', name: 'SoundPEATS', summary: 'Wireless earbuds for everyday listening.', link: '/accessories#wireless-earbuds', image: 'soundpeats-t3-pro', alt: 'Black SoundPEATS T3 Pro earbuds and case' },
  { id: 'soundcore', name: 'Soundcore', summary: 'Anker’s audio brand, covering earbuds, headphones and speakers.', link: '/accessories#premium-headphones', image: 'soundcore-space-one', alt: 'Pale blue Soundcore Space One headphones' },
];
