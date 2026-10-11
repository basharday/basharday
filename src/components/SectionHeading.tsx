import type { ReactNode } from 'react';

export function SectionHeading({ number, eyebrow, title, description, right }: {
  number: string; eyebrow: string; title: string; description?: string; right?: ReactNode;
}) {
  return (
    <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-14 lg:flex-row lg:items-end">
      <div className="max-w-2xl">
        <div className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.20em] text-blue-600">
          <span className="text-slate-400">{number}</span><span className="h-px w-7 bg-blue-200" />{eyebrow}
        </div>
        <h2 className="section-title">{title}</h2>
        {description && <p className="mt-4 max-w-xl text-base leading-8 text-slate-500">{description}</p>}
      </div>
      {right}
    </div>
  );
}
