import { More, Pill, Reveal, SectionIntro } from '../components/ui';
import { ShotTile } from '../components/Showcase';
import { accessories } from '../data/catalog';

export default function Accessories() {
  return (
    <>
      <section className="bg-mist py-16 md:py-24">
        <SectionIntro as="h1" title="Accessories." body="The sound, power and protection that complete your phone." />
      </section>

      <nav aria-label="Accessory categories" className="border-b border-ink/8 bg-page">
        <ul className="wrap flex flex-wrap justify-center gap-x-7 gap-y-1 py-4 text-sm">
          {accessories.map((a) => (
            <li key={a.id}>
              <a href={`#${a.id}`} className="text-ink/70 transition-colors hover:text-accent">
                {a.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {accessories.map((group, i) => {
        const single = group.shots.length === 1;
        return (
          <section
            key={group.id}
            id={group.id}
            aria-labelledby={`${group.id}-title`}
            className={`scroll-mt-14 py-16 lg:py-24 ${i % 2 ? 'bg-mist' : 'bg-page'}`}
          >
            <div className="wrap">
              <Reveal className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
                <h2 id={`${group.id}-title`} className="headline">
                  {group.title}
                </h2>
                <p className="lede mt-3">{group.body}</p>
                <div className="mt-3">
                  <More to={`/contact?subject=${encodeURIComponent(`Enquiry: ${group.title}`)}`}>Ask about this</More>
                </div>
              </Reveal>
              <div
                className={`mx-auto grid items-end gap-6 ${
                  single ? 'max-w-xl' : group.shots.length === 3 ? 'md:grid-cols-3' : 'max-w-5xl md:grid-cols-2'
                }`}
              >
                {group.shots.map((shot) => (
                  <Reveal key={shot.image}>
                    <ShotTile shot={shot} sizes={single ? '(min-width: 768px) 36rem, 100vw' : '(min-width: 768px) 31rem, 100vw'} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-mist py-20 text-center">
        <div className="wrap">
          <h2 className="headline">Need the right accessory?</h2>
          <p className="lede mx-auto mt-4 max-w-xl">Tell us which phone you use and what you are looking for.</p>
          <div className="mt-7">
            <Pill to="/contact">Contact Us</Pill>
          </div>
        </div>
      </section>
    </>
  );
}
