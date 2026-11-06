import { accessories, phones, smartphoneBrands, type AccessoryGroup, type Phone } from '../data/catalog';
import { ContactDetails, MapEmbed } from '../components/ContactSection';
import { HomeHero } from '../components/HomeHero';
import { BrandStrip, ProductTile, SplitShowcase } from '../components/Showcase';
import { More, Photo, Pill, Reveal, SectionIntro } from '../components/ui';
import { site } from '../config/site';

const phone = (id: string) => phones.find((p) => p.id === id) as Phone;
const accessory = (id: string) => accessories.find((a) => a.id === id) as AccessoryGroup;

function PhonePanel({ id, reverse }: { id: string; reverse?: boolean }) {
  const p = phone(id);
  return (
    <SplitShowcase image={p.shot.image} alt={p.shot.alt} reverse={reverse}>
      <div className="text-center">
        <h3 className="headline">{p.title}</h3>
        <p className="lede mt-3">{p.line}</p>
        <div className="mt-4">
          <More to={`/smartphones#${id}`}>Learn more</More>
        </div>
      </div>
    </SplitShowcase>
  );
}

function Smartphones() {
  return (
    <section aria-labelledby="smartphones-title" className="bg-page">
      <div className="pt-6 pb-12 lg:pb-16">
        <SectionIntro title="Smartphones." body="Five of the biggest names in mobile." />
      </div>
      <h2 id="smartphones-title" className="sr-only">
        Smartphones
      </h2>
      <div className="space-y-3 px-3">
        <PhonePanel id="apple" />
        <PhonePanel id="samsung" reverse />
        <div className="grid gap-3 md:grid-cols-3">
          <ProductTile phone={phone('xiaomi')} />
          <ProductTile phone={phone('oneplus')} />
          <ProductTile phone={phone('redmi')} />
        </div>
      </div>
    </section>
  );
}

/** Accessory tile: the photograph in full, with its title and link beneath. */
function AccessoryTile({ group, shot = 0, className = '', sizes }: { group: AccessoryGroup; shot?: number; className?: string; sizes: string }) {
  const s = group.shots[shot];
  return (
    <Reveal className={className}>
      <Photo name={s.image} alt={s.alt} sizes={sizes} className="block h-auto w-full" />
      <div className="mt-3 mb-6 flex items-baseline justify-between gap-4 px-1 md:mb-8">
        <h3 className="text-xl tracking-tight md:text-2xl">{group.title}</h3>
        <More to={`/accessories#${group.id}`}>Explore</More>
      </div>
    </Reveal>
  );
}

function Accessories() {
  const half = '(min-width: 768px) 50vw, 100vw';
  const third = '(min-width: 768px) 33vw, 100vw';
  return (
    <section aria-labelledby="accessories-title" className="bg-page pt-20 lg:pt-28">
      <div className="pb-10 lg:pb-14">
        <SectionIntro title="Accessories." body="The sound, power and protection that complete your phone." />
      </div>
      <h2 id="accessories-title" className="sr-only">
        Accessories
      </h2>
      <div className="grid gap-x-3 px-3 md:grid-cols-6">
        <AccessoryTile group={accessory('wireless-earbuds')} sizes={half} className="md:col-span-3" />
        <AccessoryTile group={accessory('premium-headphones')} sizes={half} className="md:col-span-3" />
        <AccessoryTile group={accessory('chargers-adapters')} sizes={third} className="md:col-span-2" />
        <AccessoryTile group={accessory('charging-cables')} sizes={third} className="md:col-span-2" />
        <AccessoryTile group={accessory('phone-cases')} shot={1} sizes={third} className="md:col-span-2" />
        <AccessoryTile group={accessory('smartwatches')} sizes={half} className="md:col-span-3" />
        <AccessoryTile group={accessory('other-accessories')} sizes={half} className="md:col-span-3" />
      </div>
    </section>
  );
}

function About() {
  return (
    <div className="pt-10 lg:pt-14">
      <SplitShowcase image="phones-on-display" alt="Smartphones with lit screens on slim display stands">
        <h2 className="title">{site.name}</h2>
        <p className="mt-4 text-slate">
          A Sri Lankan company focused on mobile phones, mobile accessories and consumer electronics, based at{' '}
          {site.address.street}, {site.address.locality}.
        </p>
        <div className="mt-5">
          <More to="/about">About us</More>
        </div>
      </SplitShowcase>
    </div>
  );
}

function Contact() {
  return (
    <section aria-labelledby="contact-title" className="bg-page py-20 lg:py-28">
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
        <div>
          <h2 id="contact-title" className="headline">
            Get in touch.
          </h2>
          <div className="mt-8">
            <ContactDetails />
          </div>
          <div className="mt-8">
            <Pill to="/contact">Contact Us</Pill>
          </div>
        </div>
        <MapEmbed />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HomeHero />
      <BrandStrip brands={smartphoneBrands} />
      <Smartphones />
      <Accessories />
      <About />
      <Contact />
    </>
  );
}
