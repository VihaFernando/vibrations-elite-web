import { useEffect, useRef, type ReactNode } from 'react';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import manifest from '../data/image-manifest.json';

type ImageEntry = { width: number; height: number; widths: number[] };
const images = manifest as Record<string, ImageEntry>;

const entryFor = (name: string) => {
  const entry = images[name];
  if (!entry) throw new Error(`Unknown image: ${name}`);
  return entry;
};
const urlFor = (name: string, w: number) => `/images/${name}-${w}.webp`;
const srcSet = (name: string) =>
  entryFor(name)
    .widths.map((w) => `${urlFor(name, w)} ${w}w`)
    .join(', ');

interface PhotoProps {
  name: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}

/** Responsive, locally hosted image from public/images. */
export function Photo({ name, alt, sizes, className, priority }: PhotoProps) {
  const entry = entryFor(name);
  return (
    <img
      src={urlFor(name, entry.widths[1] ?? entry.widths[0])}
      srcSet={srcSet(name)}
      sizes={sizes}
      width={entry.width}
      height={entry.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      {...(priority ? { fetchPriority: 'high' as const } : {})}
      className={className}
    />
  );
}

/** Fades content in once when it scrolls into view. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0.02 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal className={className} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

export function Pill({
  to,
  children,
  variant = 'solid',
  className = '',
}: {
  to: string;
  children: ReactNode;
  variant?: 'solid' | 'outline';
  className?: string;
}) {
  const look =
    variant === 'solid'
      ? 'bg-accent text-white hover:bg-accent-deep'
      : 'border border-accent text-accent hover:bg-accent hover:text-white';
  return (
    <Link
      to={to}
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-6 text-base font-medium transition-colors duration-200 ${look} ${className}`}
    >
      {children}
    </Link>
  );
}

export function More({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-0.5 text-accent hover:underline">
      {children}
      <ChevronRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}

/** Centred heading used at the top of every section and inner page. */
export function SectionIntro({
  title,
  body,
  as: Tag = 'h2',
  className = '',
}: {
  title: string;
  body?: string;
  as?: 'h1' | 'h2';
  className?: string;
}) {
  return (
    <div className={`wrap text-center ${className}`}>
      <Tag className={Tag === 'h1' ? 'display' : 'headline'}>{title}</Tag>
      {body && <p className="lede mx-auto mt-4 max-w-2xl">{body}</p>}
    </div>
  );
}
