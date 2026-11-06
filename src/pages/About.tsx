import { ContactDetails, MapEmbed } from '../components/ContactSection';
import { SplitShowcase } from '../components/Showcase';
import { Pill, Reveal } from '../components/ui';
import { site } from '../config/site';

const focus = [
  { title: 'Mobile phones', body: 'Smartphones are the centre of our business.' },
  { title: 'Mobile accessories', body: 'Audio, power, protection and everyday add-ons.' },
  { title: 'Consumer electronics', body: 'Related technology that sits alongside the phone.' },
];

export default function About() {
  return (
    <>
      <SplitShowcase image="phones-on-display" alt="Smartphones with lit screens on slim display stands">
        <h1 className="headline">About Vibrations Elite.</h1>
        <p className="lede mt-4">A Sri Lankan company focused on mobile phones, mobile accessories and consumer electronics.</p>
      </SplitShowcase>

      <section className="py-20 lg:py-28" aria-labelledby="who-title">
        <div className="wrap grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <h2 id="who-title" className="headline">
            Who we are.
          </h2>
          <Reveal className="lede space-y-5">
            <p>
              {site.name} is a private limited company in Sri Lanka. Our work centres on mobile technology: the phones
              people depend on, and the accessories that make those phones more useful.
            </p>
            <p>
              Phones now carry our conversations, work and photographs. That is why our business looks at the whole
              picture, from the device itself to the sound, power and protection that go with it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist py-20 lg:py-28" aria-labelledby="focus-title">
        <div className="wrap">
          <h2 id="focus-title" className="headline text-center">
            What we focus on.
          </h2>
          <ul className="mt-12 grid gap-10 text-center md:grid-cols-3">
            {focus.map((f) => (
              <li key={f.title}>
                <h3 className="text-2xl">{f.title}</h3>
                <p className="mt-2 text-slate">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 lg:py-28" aria-labelledby="commit-title">
        <div className="wrap max-w-3xl text-center">
          <h2 id="commit-title" className="headline">
            Clear answers, first.
          </h2>
          <p className="lede mt-5">
            We want dealing with Vibrations Elite to be simple. That means listening to what you need, giving you clear
            information and being honest about what we can help with.
          </p>
          <div className="mt-7">
            <Pill to="/contact">Contact Us</Pill>
          </div>
        </div>
      </section>

      <section className="bg-mist py-20 lg:py-28" aria-labelledby="where-title">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
          <div>
            <h2 id="where-title" className="headline">
              Where to find us.
            </h2>
            <div className="mt-8">
              <ContactDetails />
            </div>
          </div>
          <MapEmbed />
        </div>
      </section>
    </>
  );
}
