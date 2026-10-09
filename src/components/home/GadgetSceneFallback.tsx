export default function GadgetSceneFallback() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      role="img"
      aria-label="A futuristic smartphone with a glowing AI interface"
    >
      <div className="absolute h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative h-[250px] w-[136px] rotate-[-8deg] rounded-[2rem] border border-white/20 bg-gradient-to-br from-slate-400/80 via-slate-800 to-slate-950 p-[5px] shadow-[0_25px_80px_rgba(0,242,254,0.2)]">
        <div className="relative h-full overflow-hidden rounded-[1.7rem] border border-white/10 bg-gradient-to-br from-[#0d2437] via-[#10142d] to-[#21123c]">
          <div className="absolute left-1/2 top-2 h-3 w-12 -translate-x-1/2 rounded-full border border-white/10 bg-black/70" />
          <div className="absolute inset-x-4 top-10">
            <div className="mb-2 flex items-center justify-between">
              <span className="h-1.5 w-10 rounded-full bg-white/70" />
              <span className="h-1.5 w-5 rounded-full bg-primary/70" />
            </div>
            <div className="text-[8px] font-semibold tracking-wide text-white/55">
              YOUR AI COMPANION
            </div>
            <div className="mt-1 text-sm font-bold text-white">GadgetAI</div>
          </div>
          <div className="absolute left-1/2 top-[45%] flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-primary/10 shadow-[0_0_35px_rgba(0,242,254,0.25)]">
            <div className="h-12 w-12 rounded-full border border-primary/60 bg-gradient-to-br from-primary/50 to-secondary/70 shadow-[0_0_24px_rgba(0,242,254,0.45)]" />
          </div>
          <div className="absolute inset-x-4 bottom-5 space-y-2">
            <div className="h-1.5 w-3/4 rounded-full bg-white/40" />
            <div className="h-1.5 w-full rounded-full bg-white/15" />
            <div className="flex gap-1.5 pt-1">
              <div className="h-5 flex-1 rounded-md border border-primary/20 bg-primary/10" />
              <div className="h-5 flex-1 rounded-md border border-secondary/20 bg-secondary/10" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[19%] right-[12%] rounded-xl border border-primary/20 bg-base-100/90 px-3 py-2 text-[10px] font-semibold text-primary shadow-lg backdrop-blur">
        GadgetAI inside
      </div>
    </div>
  );
}
