import { useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';
import { CircleAlert, CircleCheck, LoaderCircle, Send } from 'lucide-react';
import { links, site } from '../config/site';

type Field = 'name' | 'email' | 'subject' | 'message';
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'failed' | 'not-configured';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ORDER: Field[] = ['name', 'email', 'subject', 'message'];

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!v.email.trim()) e.email = 'Please enter your email address.';
  else if (!EMAIL.test(v.email.trim())) e.email = 'Please enter a valid email address, like name@example.com.';
  if (v.subject.trim().length < 3) e.subject = 'Please enter a subject.';
  if (v.message.trim().length < 10) e.message = 'Please enter a message of at least 10 characters.';
  return e;
}

const inputClass = (invalid: boolean) =>
  `mt-2 block w-full rounded-lg border bg-page px-3.5 py-3 text-base text-ink transition-colors duration-150 outline-none focus:border-accent focus:ring-1 focus:ring-accent ${
    invalid ? 'border-danger' : 'border-line hover:border-slate'
  }`;

export function ContactForm() {
  const [params] = useSearchParams();
  const [values, setValues] = useState<Values>({
    name: '',
    email: '',
    subject: params.get('subject')?.slice(0, 120) ?? '',
    message: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const form = useRef<HTMLFormElement>(null);
  const honeypot = useRef<HTMLInputElement>(null);

  const update = (field: Field, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (errors[field]) setErrors({ ...errors, [field]: validate(next)[field] });
    if (status !== 'sending') setStatus('idle');
  };

  const onBlur = (field: Field) => {
    if (values[field]) setErrors((prev) => ({ ...prev, [field]: validate(values)[field] }));
  };

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = ORDER.find((f) => found[f]);
    if (first) {
      setStatus('idle');
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    if (!site.contactFormEndpoint) {
      setStatus('not-configured');
      return;
    }

    // Bots tend to fill every field; real visitors never see this one.
    if (honeypot.current?.value) return;

    setStatus('sending');
    try {
      const res = await fetch(site.contactFormEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) throw new Error(`Form endpoint returned ${res.status}`);
      setStatus('sent');
      setValues({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('failed');
    }
  }

  const field = (name: Field, label: string, autoComplete: string, type = 'text') => {
    const error = errors[name];
    const describedBy = error ? `${name}-error` : undefined;
    const shared = {
      id: name,
      name,
      required: true,
      value: values[name],
      'aria-invalid': error ? true : undefined,
      'aria-describedby': describedBy,
      className: inputClass(Boolean(error)),
      onBlur: () => onBlur(name),
    };
    return (
      <div>
        <label htmlFor={name} className="text-[0.95rem] font-semibold">
          {label}
        </label>
        {name === 'message' ? (
          <textarea {...shared} rows={6} className={`${shared.className} resize-y`} onChange={(e) => update(name, e.target.value)} />
        ) : (
          <input {...shared} type={type} autoComplete={autoComplete} onChange={(e) => update(name, e.target.value)} />
        )}
        {error && (
          <p id={`${name}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm text-danger">
            <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
            {error}
          </p>
        )}
      </div>
    );
  };

  const mailto = links.email
    ? `${links.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(
        `${values.message}\n\n${values.name}\n${values.email}`,
      )}`
    : '';

  return (
    <form ref={form} onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {field('name', 'Name', 'name')}
        {field('email', 'Email', 'email', 'email')}
      </div>
      {field('subject', 'Subject', 'off')}
      {field('message', 'Message', 'off')}

      <div className="hidden" aria-hidden>
        <label>
          Leave this field empty
          <input ref={honeypot} type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div aria-live="polite">
        {status === 'not-configured' && (
          <div className="rounded-lg border border-danger/30 bg-danger/5 p-4 text-[0.975rem] text-danger">
            <p className="font-semibold">Your message could not be sent.</p>
            <p className="mt-1">
              {mailto ? 'Please send it to us by email instead.' : 'Please contact us directly using the details on this page.'}
            </p>
            {mailto && (
              <a href={mailto} className="mt-2 inline-block font-semibold underline underline-offset-4">
                Open in your email app
              </a>
            )}
          </div>
        )}
        {status === 'failed' && (
          <div className="rounded-lg border border-danger/30 bg-danger/5 p-4 text-[0.975rem] text-danger">
            <p className="font-semibold">Your message could not be sent.</p>
            <p className="mt-1">Please try again in a moment, or use the contact details on this page.</p>
          </div>
        )}
        {status === 'sent' && (
          <p className="flex items-start gap-2 rounded-lg border border-line bg-mist p-4 text-[0.975rem]">
            <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
            Thank you. Your message has been sent.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-7 font-semibold text-white transition-colors duration-200 hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === 'sending' ? (
          <>
            <LoaderCircle aria-hidden className="size-4 animate-spin" /> Sending
          </>
        ) : (
          <>
            Send Message <Send aria-hidden className="size-4" />
          </>
        )}
      </button>
    </form>
  );
}
