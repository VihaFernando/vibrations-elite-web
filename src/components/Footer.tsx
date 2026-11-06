import { Link } from 'react-router';
import { links, site } from '../config/site';
import { navigation } from '../data/pages';
import { Address, contactRows } from './Contact';

const socials = Object.entries(site.social).filter(([, url]) => url);
const hasContact = contactRows.length > 0 || socials.length > 0;

export function Footer() {
  return (
    <footer className="bg-mist text-sm text-slate">
      <div className="wrap py-12 lg:py-14">
        <div className={`grid gap-9 sm:grid-cols-2 ${hasContact ? 'lg:grid-cols-[1.6fr_1fr_1.2fr_1.2fr]' : 'lg:grid-cols-[1.6fr_1fr_1.2fr]'}`}>
          <div>
            <img src="/brand/logo-stacked.webp" width={549} height={471} alt={site.name} loading="lazy" className="h-28 w-auto" />
            <p className="mt-4 max-w-xs">
              {site.name} is a mobile technology business in Kandana, Sri Lanka.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold tracking-normal text-ink">Explore</h2>
            <ul className="mt-3 space-y-2">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-ink hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold tracking-normal text-ink">Visit</h2>
            <Address className="mt-3" />
            <a href={links.mapsSearch} target="_blank" rel="noreferrer" className="mt-2 inline-block text-accent hover:underline">
              View on Google Maps
            </a>
          </div>

          {hasContact && (
          <div>
            <h2 className="text-sm font-semibold tracking-normal text-ink">Contact</h2>
            <dl className="mt-3 space-y-2">
              {contactRows.map((row) => (
                <div key={row.label}>
                  <dt className="sr-only">{row.label}</dt>
                  <dd>{row.node}</dd>
                </div>
              ))}
            </dl>
            {socials.length > 0 && (
              <ul className="mt-3 flex gap-4">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noreferrer" className="capitalize hover:text-ink">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          )}
        </div>

        <div className="mt-10 border-t border-line pt-5 text-xs leading-relaxed">
          <p>
            &copy; {new Date().getFullYear()} {site.name} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
