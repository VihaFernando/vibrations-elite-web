import { More, Pill, SectionIntro } from '../components/ui';
import { SplitShowcase, ShotTile } from '../components/Showcase';
import { phones } from '../data/catalog';

export default function Smartphones() {
  return (
    <>
      <section className="bg-mist py-16 md:py-24">
        <SectionIntro
          as="h1"
          title="Smartphones."
          body="Five names that define the modern phone. Contact us to talk through what suits you."
        />
      </section>

      <nav aria-label="Smartphone brands" className="border-b border-ink/8 bg-page">
        <ul className="wrap flex flex-wrap justify-center gap-x-8 gap-y-1 py-4 text-sm">
          {phones.map((p) => (
            <li key={p.id}>
              <a href={`#${p.id}`} className="text-ink/70 transition-colors hover:text-accent">
                {p.brand}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {phones.map((p, i) => (
        <SplitShowcase
          key={p.id}
          id={p.id}
          image={p.shot.image}
          alt={p.shot.alt}
          reverse={i % 2 === 1}
          tone={i % 2 === 1 ? 'white' : 'mist'}
        >
          <p className="text-sm font-medium text-slate">{p.brand}</p>
          <h2 className="headline mt-1">{p.title}</h2>
          <p className="lede mt-3">{p.line}</p>
          <p className="mt-4 text-slate">{p.body}</p>
          <p className="mt-6 text-sm text-slate">Pictured: {p.shot.label}</p>
          <div className="mt-4">
            <More to={`/contact?subject=${encodeURIComponent(`Enquiry: ${p.title}`)}`}>Ask about {p.title}</More>
          </div>
          {p.second && (
            <div className="mt-8 max-w-40">
              <ShotTile shot={p.second} sizes="10rem" />
            </div>
          )}
        </SplitShowcase>
      ))}

      <section className="bg-mist py-20 text-center">
        <div className="wrap">
          <h2 className="headline">Looking for something specific?</h2>
          <p className="lede mx-auto mt-4 max-w-xl">Tell us what you have in mind and we will let you know how we can help.</p>
          <div className="mt-7">
            <Pill to="/contact">Contact Us</Pill>
          </div>
        </div>
      </section>
    </>
  );
}
