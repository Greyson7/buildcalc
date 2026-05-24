'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { trackWaitlistSubmit } from '@/lib/analytics';

const ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT ?? '';

type Feature = { id: string; label: string; hint: string };
type Status = 'idle' | 'submitting' | 'success' | 'error';

export function WaitlistForm({ features }: { features: Feature[] }) {
  const [email, setEmail] = useState('');
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const toggle = (id: string) => {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ENDPOINT) {
      setErrorMsg(
        'Waitlist is not configured yet. Email hello@buildprocalc.com to be added manually.',
      );
      setStatus('error');
      return;
    }
    setStatus('submitting');
    setErrorMsg('');
    try {
      const featureList = [...picked];
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email,
          role: role || 'unspecified',
          features: featureList.join(', '),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      trackWaitlistSubmit(featureList);
      setStatus('success');
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Something went wrong — try again.',
      );
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="mt-6 rounded-2xl border border-ok/40 bg-ok/10 p-5">
        <p className="text-base font-extrabold text-ink">You’re in.</p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">
          We’ll email you when BuildCalcPro launches — likely once the waitlist
          has enough votes to show what to build first. Until then, the free
          calculators get the same love they always have.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <div className="card space-y-4 p-4">
        <div>
          <label htmlFor="waitlist-email" className="field-label">
            Email
          </label>
          <input
            id="waitlist-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1.5 w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-base text-ink outline-none focus:border-brand"
          />
        </div>

        <div>
          <label htmlFor="waitlist-role" className="field-label">
            I’m a… <span className="text-ink-faint">(optional)</span>
          </label>
          <select
            id="waitlist-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-base text-ink outline-none focus:border-brand"
          >
            <option value="">Prefer not to say</option>
            <option value="homeowner">Homeowner / DIYer</option>
            <option value="apprentice">Apprentice / trade student</option>
            <option value="contractor">Contractor / pro</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="card p-4">
        <p className="field-label">
          Which BuildCalcPro features matter most to you?
        </p>
        <p className="mt-1 text-xs text-ink-faint">
          Pick as many as you want. We ship the most-requested ones first.
        </p>
        <ul className="mt-3 space-y-2">
          {features.map((f) => {
            const checked = picked.has(f.id);
            return (
              <li key={f.id}>
                <label
                  className={`tap flex cursor-pointer items-start gap-3 rounded-xl border p-3 ${
                    checked
                      ? 'border-brand/60 bg-brand/10'
                      : 'border-line bg-surface-2 active:bg-surface-3'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 accent-[color:var(--tw-color-brand,#ff7a1a)]"
                    checked={checked}
                    onChange={() => toggle(f.id)}
                  />
                  <span className="leading-snug">
                    <span className="block text-sm font-bold text-ink">
                      {f.label}
                    </span>
                    <span className="block text-xs text-ink-dim">{f.hint}</span>
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      {status === 'error' && (
        <p className="rounded-xl border border-bad/40 bg-bad/10 px-4 py-3 text-sm text-bad">
          {errorMsg}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Joining…' : 'Join the waitlist'}
      </Button>
      <p className="px-1 text-xs text-ink-faint">
        We’ll only email you about BuildCalcPro launches and the features you
        voted on. No spam, unsubscribe any time.
      </p>
    </form>
  );
}
