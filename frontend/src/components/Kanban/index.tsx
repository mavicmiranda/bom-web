import {
  DndContext,
  closestCenter,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";
import { useState } from "react";
import Column from "./Column";

type Job = {
  id: string;
  title: string;
  company: string;
  status: string;
};

const initialJobs: Job[] = [
  { id: "1", title: "UI Engineer", company: "Vercel", status: "interessado" },
  { id: "2", title: "Product Designer", company: "Linear", status: "aplicado" },
];

const columns = [
  { id: "interessado", title: "Interessado" },
  { id: "aplicado", title: "Aplicado" },
  { id: "entrevista", title: "Entrevista" },
  { id: "oferta", title: "Oferta" },
];

export default function Kanban() {
  const [jobs, setJobs] = useState(initialJobs);

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (!over) return;

    setJobs((prev) =>
      prev.map((job) =>
        job.id === active.id ? { ...job, status: over.id } : job,
      ),
    );
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex gap-6 p-6 overflow-x-auto bg-[#0f0f1a] h-screen text-white">
        {columns.map((col) => (
          <Column
            key={col.id}
            id={col.id}
            title={col.title}
            jobs={jobs.filter((job) => job.status === col.id)}
          />
        ))}
      </div>
    </DndContext>
  );

  function Column({ id, title, jobs }: any) {
    const { setNodeRef } = useDroppable({ id });

    return (
      <div
        ref={setNodeRef}
        className="min-w-[280px] bg-white/5 rounded-xl p-4 backdrop-blur"
      >
        <h3 className="mb-4 text-sm text-white/70">{title}</h3>

        <div className="space-y-4">
          {jobs.map((job: any) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    );
  }

  function JobCard({ job }: any) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: job.id,
    });

    const style = transform
      ? {
          transform: `translate(${transform.x}px, ${transform.y}px)`,
        }
      : undefined;

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="bg-[#1b1b2d] p-4 rounded-xl border border-white/5 cursor-grab active:cursor-grabbing hover:border-purple-500/40 transition"
      >
        <h4 className="font-semibold">{job.title}</h4>
        <p className="text-sm text-white/60">{job.company}</p>
      </div>
    );
  }
}
