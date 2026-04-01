// src/components/kanban/JobCard.tsx
export default function JobCard() {
  return (
    <div className="bg-[#1b1b2d] p-4 rounded-xl border border-white/5 hover:border-purple-500/40 transition">
      <h4 className="font-semibold">UI Engineer</h4>
      <p className="text-sm text-white/60">Vercel Inc.</p>

      <div className="flex justify-between mt-3 text-xs text-white/50">
        <span>$90k - $120k</span>
        <span>3d atrás</span>
      </div>
    </div>
  );
}