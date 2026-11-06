import { Pill } from '../components/ui';

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <h1 className="headline">This page could not be found.</h1>
      <p className="lede mt-4 max-w-md">The link may be out of date, or the page may have moved.</p>
      <Pill to="/" className="mt-8">
        Back to Home
      </Pill>
    </section>
  );
}
