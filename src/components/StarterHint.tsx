import { RulerIcon } from '@/components/icons';

/**
 * First-run callout shown above a calculator's inputs.
 *
 * Every calculator renders a live result from example default values, and
 * analytics showed visitors mistook that for a finished answer and left
 * without entering anything of their own. This banner reframes the defaults
 * as an example and nudges the first edit; the calculator hides it once any
 * field changes (see the `touched` state in each calculator component).
 */
export function StarterHint() {
  return (
    <div className="flex items-start gap-2.5 rounded-2xl border border-brand/35 bg-brand/10 p-3">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand/20 text-brand">
        <RulerIcon className="h-4 w-4" />
      </span>
      <p className="text-xs leading-relaxed text-ink-dim">
        <span className="font-bold text-ink">These are example numbers.</span>{' '}
        Tap any field below and enter your own measurements — every result
        updates instantly as you type.
      </p>
    </div>
  );
}
