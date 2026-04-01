// src/components/kanban/Column.tsx
import JobCard from "./JobCard";

export default function Column({ title }: { title: string }) {
  return (
    <div className="min-w-[280px] bg-white/5 rounded-xl p-4">
      <h3 className="mb-4 text-sm text-white/70">{title}</h3>

      <div className="space-y-4">
        <JobCard />
        <JobCard />
      </div>
    </div>
  );
}