import type { ReactNode } from 'react';
import { links, site, telLink } from '../config/site';

export function ContactValue({ value, href }: { value: string; href: string }) {
  return (
    <a href={href} className="text-ink underline-offset-4 hover:text-accent hover:underline">
      {value}
    </a>
  );
}

/** Only details that have been filled in appear on the site. */
export const contactRows: { label: string; node: ReactNode }[] = [
  ...site.contact.phones.map((phone) => ({ label: `Phone ${phone}`, value: phone, href: telLink(phone) })),
  { label: 'Email', value: site.contact.email, href: links.email },
  { label: 'WhatsApp', value: site.contact.whatsapp, href: links.whatsapp },
]
  .filter((row) => row.value)
  .map((row) => ({ label: row.label, node: <ContactValue value={row.value} href={row.href} /> }));

export function Address({ className = '' }: { className?: string }) {
  return (
    <address className={`not-italic ${className}`}>
      {site.address.lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </address>
  );
}
