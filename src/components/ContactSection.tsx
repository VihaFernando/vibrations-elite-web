import { ExternalLink, Mail, MessageCircle, Phone } from 'lucide-react';
import { links, site, telLink } from '../config/site';
import { Address, ContactValue } from './Contact';

const rows = [
  ...site.contact.phones.map((phone) => ({ icon: Phone, label: `Phone ${phone}`, value: phone, href: telLink(phone) })),
  { icon: Mail, label: 'Email', value: site.contact.email, href: links.email },
  { icon: MessageCircle, label: 'WhatsApp', value: site.contact.whatsapp, href: links.whatsapp },
].filter((row) => row.value);

export function ContactDetails() {
  return (
    <div>
      <p className="text-lg font-semibold tracking-tight">{site.name}</p>
      <Address className="mt-2 text-slate" />
      {rows.length > 0 && (
      <dl className="mt-7 space-y-4">
        {rows.map((r) => (
          <div key={r.label} className="flex items-start gap-3">
            <r.icon aria-hidden strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-slate" />
            <div>
              <dt className="sr-only">{r.label}</dt>
              <dd>
                <ContactValue value={r.value} href={r.href} />
              </dd>
            </div>
          </div>
        ))}
      </dl>
      )}
    </div>
  );
}

export function MapEmbed({ className = 'h-80 lg:h-[30rem]' }: { className?: string }) {
  return (
    <div>
      <iframe
        title={`Google Map showing ${site.address.street}, ${site.address.locality}`}
        src={links.mapsEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={`w-full border-0 bg-fog ${className}`}
      />
      <a
        href={links.mapsSearch}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
      >
        Open in Google Maps <ExternalLink aria-hidden className="size-3.5" />
      </a>
    </div>
  );
}
