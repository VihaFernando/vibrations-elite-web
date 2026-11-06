/**
 * Business configuration. This is the single place to update company details.
 *
 * TODO(business owner): fill in any empty values below.
 * - Empty contact values stay hidden on the site.
 * - Once filled in, they appear as working links and are added to the structured data.
 * - Social links stay hidden until a URL is provided.
 */
export const site = {
  name: 'Vibrations Elite (Pvt) Ltd.',
  shortName: 'Vibrations Elite',
  url: 'https://vibrationselite.com',
  description:
    'Vibrations Elite (Pvt) Ltd. is a Sri Lankan company focused on mobile phones, mobile accessories and consumer electronics, based in Kandana.',
  address: {
    lines: ['No. 119, Ganemulla Road,', 'Kandana,', 'Sri Lanka.'],
    street: 'No. 119, Ganemulla Road',
    locality: 'Kandana',
    country: 'Sri Lanka',
    countryCode: 'LK',
    /**
     * Google Maps lookup only, not shown on the site. Google lists this road as
     * "Kandana - Ganemulla Rd". The printed address resolves to Kadawatha or Ja-Ela instead,
     * so keep this wording, and check the pin matches the real premises before launch.
     */
    mapQuery: '119 Kandana - Ganemulla Rd, Kandana, Sri Lanka',
  },
  contact: {
    /** International format, shown as written. */
    phones: ['+94 76 980 9991', '+94 76 842 8460'] as string[],
    email: 'nishikadilukshi84@gmail.com' as string,
    /** International format, e.g. '+94 77 123 4567'. */
    whatsapp: '' as string,
  },
  social: {
    facebook: '' as string,
    instagram: '' as string,
    tiktok: '' as string,
  },
  /**
   * TODO(business owner): set to true only after confirming the business really deals in
   * the brands listed in src/data/catalog.ts. While false, the site shows the brands as
   * part of the mobile technology landscape and makes no claim that they are offered here.
   */
  brandsConfirmed: false as boolean,
  /**
   * Contact form delivery. Set VITE_CONTACT_FORM_ENDPOINT in .env to a form service
   * or your own API that accepts a JSON POST. Without it, the form never reports a
   * message as sent. See README.md.
   */
  contactFormEndpoint: (import.meta.env.VITE_CONTACT_FORM_ENDPOINT ?? '') as string,
} as const;

const mapQuery = encodeURIComponent(site.address.mapQuery);

/** Turns a displayed number into a tap-to-call link. */
export const telLink = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`;

export const links = {
  mapsSearch: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
  mapsEmbed: `https://www.google.com/maps?q=${mapQuery}&output=embed`,
  email: site.contact.email ? `mailto:${site.contact.email}` : '',
  whatsapp: site.contact.whatsapp ? `https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}` : '',
};
