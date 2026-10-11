import { ArrowUpRight, Braces, Check, Layers2, Sparkles } from 'lucide-react';

/** Pure CSS illustration: not a fake screenshot of an existing product. */
export function HeroVisual() {
  return (
    <div className="hero-art relative mx-auto w-full max-w-[525px]" aria-label="Abstract illustration of thoughtful software design" role="img">
      <div className="hero-art-glow pointer-events-none absolute -inset-6 rounded-[44px]" />
      <div className="relative overflow-hidden rounded-[26px] border border-white/90 bg-white p-4 shadow-[0_22px_85px_rgba(73,107,163,.12)] sm:rounded-[32px] sm:p-5">
        <div className="flex items-center justify-between border-b border-slate-100 px-2 pb-4 pt-1">
          <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#f1bfbf]"/><span className="h-2.5 w-2.5 rounded-full bg-[#f5dca7]"/><span className="h-2.5 w-2.5 rounded-full bg-[#b9e6d5]"/></div>
          <span className="rounded-full bg-slate-50 px-3 py-1.5 text-[9px] font-semibold tracking-[.16em] text-slate-400">THE WAY I BUILD</span>
          <span className="text-slate-300"><Braces size={15} /></span>
        </div>
        <div className="p-3 pb-2 sm:p-5 sm:pb-3">
          <div className="mb-5 flex items-center justify-between"><span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-semibold text-blue-600"><Sparkles size={11} /> GOOD SOFTWARE MATTERS</span><ArrowUpRight size={15} className="text-slate-300" /></div>
          <div className="max-w-[370px] text-[clamp(25px,4.5vw,39px)] font-semibold leading-[1.13] tracking-[-.065em] text-slate-800">Simple on the surface.<br/><span className="text-blue-500">Thoughtful</span> underneath.</div>
          <div className="mt-5 max-w-[320px] text-xs leading-6 text-slate-400 sm:text-[13px]">Clarity in every detail. Purpose behind every decision.</div>
          <div className="mt-8 grid grid-cols-3 gap-2.5 sm:gap-3">
            {[
              { number: '01', label: 'Understand', fill: 'bg-blue-50', icon: <Layers2 size={15} />, accent: 'text-blue-500' },
              { number: '02', label: 'Create', fill: 'bg-[#f0f6ff]', icon: <Braces size={15} />, accent: 'text-blue-500' },
              { number: '03', label: 'Refine', fill: 'bg-[#edfaf6]', icon: <Check size={15} />, accent: 'text-emerald-500' },
            ].map(item => (
              <div key={item.number} className={`${item.fill} rounded-2xl px-3 pb-4 pt-3 sm:px-4`}>
                <div className={`mb-6 ${item.accent}`}>{item.icon}</div>
                <div className="text-[10px] font-semibold text-slate-400">{item.number} /</div>
                <div className="mt-1 text-[12px] font-bold tracking-tight text-slate-700 sm:text-[13px]">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -bottom-5 -left-4 hidden items-center gap-2.5 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-[0_15px_45px_rgba(66,100,151,.11)] sm:flex">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-500"><Check size={18}/></span>
        <span><strong className="block text-[12px] font-bold text-slate-700">Made with intention</strong><small className="block pt-0.5 text-[10px] text-slate-400">Design + engineering</small></span>
      </div>
    </div>
  );
}
