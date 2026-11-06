import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { navigation } from '../data/pages';
import { site } from '../config/site';


export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/8 bg-page">
      <div className="mx-auto flex h-14 max-w-[76rem] items-center justify-between gap-6 px-5 md:px-10">
        <Link to="/" aria-label={`${site.shortName} home`} className="shrink-0">
          <img src="/brand/logo-horizontal.webp" width={781} height={198} alt="" className="h-10 w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `text-[0.82rem] transition-colors duration-200 ${isActive ? 'font-medium text-ink' : 'text-ink/65 hover:text-ink'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="inline-flex min-h-8 items-center rounded-full bg-accent px-3.5 max-[359px]:hidden text-[0.82rem] font-medium whitespace-nowrap text-white transition-colors duration-200 hover:bg-accent-deep sm:px-4"
          >
            Contact Us
          </Link>
          <button
            type="button"
            className="-mr-2 inline-flex size-11 items-center justify-center text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`fixed inset-x-0 top-14 bottom-0 overflow-y-auto bg-page transition-[opacity,visibility] duration-200 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav aria-label="Mobile" className="flex flex-col px-5 pt-6 pb-10 md:px-10">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `py-2.5 text-[1.75rem] font-semibold tracking-tight ${isActive ? 'text-ink' : 'text-ink/70'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
