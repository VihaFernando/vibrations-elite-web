import { useEffect, useState } from 'react';
import { ContactDetails, MapEmbed } from '../components/ContactSection';
import { ContactForm } from '../components/ContactForm';
import { SectionIntro } from '../components/ui';

/** The form reads the query string, so it mounts after hydration to match the prerendered page. */
function ClientForm() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready ? <ContactForm /> : <div className="min-h-[34rem]" aria-hidden />;
}

export default function Contact() {
  return (
    <>
      <section className="bg-mist py-16 md:py-24">
        <SectionIntro as="h1" title="Contact." body="Ask us about phones, accessories or a business matter." />
      </section>

      <section className="py-16 lg:py-24" aria-label="Contact details and form">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <ContactDetails />
          <div>
            <h2 className="title mb-2">Send us a message</h2>
            <p className="mb-7 text-slate">All fields are required.</p>
            <ClientForm />
          </div>
        </div>
      </section>

      <section className="bg-mist py-16 lg:py-24" aria-labelledby="map-title">
        <div className="wrap">
          <h2 id="map-title" className="title mb-6">
            Find us in Kandana
          </h2>
          <MapEmbed />
        </div>
      </section>
    </>
  );
}
