import { ArrowUpRight, Circle, LayoutGrid, ListChecks } from 'lucide-react';

/** Abstract previews, intentionally not presented as screenshots of real projects. */
export function ProjectArtwork({ variant = 0 }: { variant?: number }) {
  const index = variant % 3;
  return (
    <div className={`project-art project-art-${index} relative flex h-[218px] items-center justify-center overflow-hidden rounded-[17px] sm:h-[230px]`} aria-hidden="true">
      <div className="preview-grid absolute inset-0 opacity-50" />
      <div className="relative w-[76%] overflow-hidden rounded-[13px] border border-white/80 bg-white/95 shadow-[0_18px_50px_rgba(60,97,150,.13)]">
        <div className="flex h-8 items-center justify-between border-b border-slate-100 px-3">
          <div className="flex gap-1"><Circle size={5} fill="#cbd5e1" stroke="none" /><Circle size={5} fill="#cbd5e1" stroke="none" /><Circle size={5} fill="#cbd5e1" stroke="none" /></div>
          <span className="h-1.5 w-1/3 rounded-full bg-slate-100" /><ArrowUpRight size={10} className="text-slate-300" />
        </div>
        <div className="p-4">
          {index === 0 ? <>
            <div className="flex items-center justify-between"><div className="h-2 w-[44%] rounded bg-slate-700"/><LayoutGrid size={12} className="text-blue-500"/></div>
            <div className="mt-4 grid grid-cols-3 gap-2">{[0,1,2].map(i => <div key={i} className={`h-[57px] rounded-md ${i === 1 ? 'bg-blue-100' : i === 2 ? 'bg-[#d9f5e9]' : 'bg-[#e8effa]'}`}><span className="ml-2 mt-2 block h-1.5 w-6 rounded-full bg-white/70"/><span className="ml-2 mt-2 block h-1.5 w-9 rounded-full bg-white/70"/></div>)}</div>
            <div className="mt-3 flex items-end gap-1.5">{[21,32,25,44,37,53,40,59,48,67,52,72].map((h, i) => <span key={i} className="flex-1 rounded-t-[3px] bg-blue-200/80" style={{height: `${h * 0.48}px`}} />)}</div>
          </> : index === 1 ? <>
            <div className="mb-4 flex justify-between"><div className="h-2 w-1/2 rounded bg-slate-700"/><span className="h-4 w-8 rounded bg-blue-100" /></div>
            <div className="grid grid-cols-3 gap-2">{[0,1,2].map((column) => <div key={column} className="rounded-md bg-slate-50 p-1.5"><div className="mb-2 flex items-center gap-1"><span className={`h-1.5 w-1.5 rounded-full ${column === 2 ? 'bg-emerald-300' : 'bg-blue-300'}`}/><span className="h-1 w-8 rounded bg-slate-200" /></div>{Array.from({ length: column === 1 ? 2 : 3 }).map((_, i) => <div key={i} className="mb-1.5 rounded bg-white p-2 shadow-[0_1px_3px_rgba(0,0,0,.04)]"><span className="block h-1 w-full rounded bg-slate-200"/><span className="mt-1.5 block h-1 w-2/3 rounded bg-slate-100"/></div>)}</div>)}</div>
          </> : <>
            <div className="flex items-center gap-2"><ListChecks size={15} className="text-blue-500"/><div className="h-2 w-[44%] rounded bg-slate-700"/></div>
            <div className="mt-4 space-y-2.5">{[0,1,2].map((i) => <div key={i} className="flex items-center gap-2.5 rounded-lg border border-slate-100 p-2"><span className={`grid h-4 w-4 place-items-center rounded ${i === 0 ? 'bg-blue-500' : 'border border-slate-200'}`}>{i === 0 && <span className="h-1.5 w-1.5 rounded-sm bg-white"/>}</span><div className="flex-1"><span className={`block h-1.5 rounded ${i === 2 ? 'w-1/2' : 'w-3/4'} bg-slate-200`}/><span className="mt-1.5 block h-1 w-1/3 rounded bg-slate-100"/></div><span className="h-3 w-7 rounded bg-blue-50"/></div>)}</div>
          </>}
        </div>
      </div>
      <div className="absolute bottom-3 right-4 rounded-full bg-white/75 px-2.5 py-1 text-[9px] font-semibold tracking-wide text-slate-500 backdrop-blur-md">PREVIEW PLACEHOLDER</div>
    </div>
  );
}
