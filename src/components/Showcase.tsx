import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { site } from '../config/site';
import type { Brand, Phone, Shot } from '../data/catalog';
import { More, Photo, Reveal } from './ui';

/** Image tile. The photograph keeps its own proportions, so the product is never cut off. */
export function ProductTile({ phone, className = '' }: { phone: Phone; className?: string }) {
  return (
    <Reveal className={`flex flex-col bg-mist ${className}`}>
      <div className="px-6 pt-10 pb-7 text-center md:pt-12">
        <h3 className="title">{phone.title}</h3>
        <p className="lede mt-1.5">{phone.line}</p>
        <div className="mt-3">
          <More to={`/smartphones#${phone.id}`}>Learn more</More>
        </div>
      </div>
      <Photo
        name={phone.shot.image}
        alt={phone.shot.alt}
        sizes="(min-width: 768px) 33vw, 100vw"
        className="mt-auto block h-auto w-full"
      />
    </Reveal>
  );
}

/** Half-and-half panel. The photograph shows in full, and the text centres beside it. */
export function SplitShowcase({
  id,
  image,
  alt,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  reverse = false,
  tone = 'mist',
  children,
}: {
  id?: string;
  image: string;
  alt: string;
  sizes?: string;
  reverse?: boolean;
  tone?: 'mist' | 'white';
  children: ReactNode;
}) {
  return (
    <section id={id} className={`grid scroll-mt-14 items-center lg:grid-cols-2 ${tone === 'mist' ? 'bg-mist' : 'bg-page'}`}>
      <div className={reverse ? 'lg:order-2' : ''}>
        <Photo name={image} alt={alt} sizes={sizes} className="block h-auto w-full" />
      </div>
      <div className="flex items-center justify-center px-6 py-12 md:px-14 lg:py-16">
        <Reveal className="w-full max-w-md">{children}</Reveal>
      </div>
    </section>
  );
}

/** One photograph in full, with a label naming exactly what it shows. */
export function ShotTile({ shot, sizes }: { shot: Shot; sizes: string }) {
  return (
    <figure>
      <Photo
        name={shot.image}
        alt={shot.alt}
        sizes={sizes}
        className={`block h-auto w-full ${shot.image === 'soundcore-space-one' ? 'mix-blend-multiply' : ''}`}
      />
      <figcaption className="mt-2.5 text-sm text-slate">{shot.label}</figcaption>
    </figure>
  );
}

/** Text wordmarks in one type style, so no brand's logo artwork is reproduced. */
export function BrandStrip({ brands }: { brands: Brand[] }) {
  return (
    <section aria-labelledby="brand-strip" className="bg-page py-14 lg:py-20">
      <div className="wrap">
        <h2 id="brand-strip" className="text-center text-sm font-medium tracking-normal text-slate">
          {site.brandsConfirmed ? 'Brands we offer' : 'The brands shaping mobile technology'}
        </h2>
        <ul className="mt-6 flex flex-wrap items-baseline justify-center gap-x-8 gap-y-3 sm:gap-x-12 lg:gap-x-20">
          {brands.map((b) => (
            <li key={b.id}>
              <Link
                to={b.link}
                className="text-[1.65rem] font-semibold tracking-[-0.03em] text-ink/80 transition-colors duration-200 hover:text-accent sm:text-[2rem] lg:text-[2.75rem]"
              >
                {b.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
