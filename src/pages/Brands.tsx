import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { Photo, Reveal, SectionIntro } from '../components/ui';
import { accessoryBrands, phones, smartphoneBrands, type Brand } from '../data/catalog';
import { site } from '../config/site';

const photoFor = (b: Brand) => {
  if (b.image) return { image: b.image, alt: b.alt ?? '' };
  const phone = phones.find((p) => p.id === b.id);
  return phone ? { image: phone.shot.image, alt: phone.shot.alt } : null;
};

function BrandRow({ brand }: { brand: Brand }) {
  const photo = photoFor(brand);
  return (
    <li id={brand.id} className="border-t border-line">
      <Link to={brand.link} className="group grid items-center gap-5 py-6 sm:grid-cols-[1fr_auto] md:grid-cols-[16rem_1fr_auto] md:gap-8 md:py-8">
        <h3 className="title transition-colors group-hover:text-accent">{brand.name}</h3>
        <p className="flex items-center gap-1 text-slate sm:col-start-1 md:col-start-2">
          {brand.summary}
          <ChevronRight aria-hidden className="size-4 shrink-0 text-accent transition-transform group-hover:translate-x-0.5" />
        </p>
        {photo && (
          <div className="h-32 w-full overflow-hidden sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:w-44 md:col-start-3 md:row-span-1 md:w-52">
            <Photo name={photo.image} alt={photo.alt} sizes="13rem" className="size-full object-contain object-right max-sm:object-left" />
          </div>
        )}
      </Link>
    </li>
  );
}

export default function Brands() {
  return (
    <>
      <section className="bg-mist py-16 md:py-24">
        <SectionIntro
          as="h1"
          title="Brands."
          body={
            site.brandsConfirmed
              ? 'The mobile technology brands we work with.'
              : 'A guide to the names shaping mobile technology, from smartphones to sound and power.'
          }
        />
      </section>

      <section className="py-16 lg:py-24" aria-labelledby="phone-brands">
        <div className="wrap">
          <Reveal>
            <h2 id="phone-brands" className="headline mb-10">
              Smartphone brands.
            </h2>
          </Reveal>
          <ul className="border-b border-line">
            {smartphoneBrands.map((b) => (
              <BrandRow key={b.id} brand={b} />
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-mist py-16 lg:py-24" aria-labelledby="accessory-brands">
        <div className="wrap">
          <Reveal>
            <h2 id="accessory-brands" className="headline mb-10">
              Accessory and audio brands.
            </h2>
          </Reveal>
          <ul className="border-b border-line">
            {accessoryBrands.map((b) => (
              <BrandRow key={b.id} brand={b} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
