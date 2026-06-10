import { useDraggable } from '@dnd-kit/core';
import { useState } from 'react';
import { FiArchive, FiCalendar, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useJobs } from '../../contexts/JobContext';
import { type Job } from '../../types/job';

interface Props {
  job: Job;
  isActive?: boolean;
}

export default function JobCard({ job, isActive = false }: Props) {
  const { openModal, archiveJob, deleteJob } = useJobs();
  const [hovered, setHovered] = useState(false);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: job.id });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const deadline = job.deadline
    ? new Date(job.deadline + 'T12:00:00')
    : null;

  const deadlineLabel = deadline
    ? deadline.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
    : null;

  const isExpired = deadline ? deadline < new Date() : false;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative bg-[#1b1b2d] p-4 rounded-xl border cursor-grab active:cursor-grabbing select-none transition-all duration-200 ${
        isActive
          ? 'opacity-40 border-purple-500/50'
          : 'border-white/5 hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10'
      }`}
    >
      {/* Action buttons */}
      {hovered && !isActive && (
        <div
          className="absolute top-2 right-2 flex gap-0.5 bg-[#0f0f1a] rounded-lg p-1 border border-white/10 z-10"
          onPointerDown={e => e.stopPropagation()}
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={() => openModal(job.status, job)}
            className="p-1.5 rounded text-white/40 hover:text-purple-400 hover:bg-white/5 transition"
            title="Editar"
          >
            <FiEdit2 size={12} />
          </button>
          <button
            onClick={() => archiveJob(job.id)}
            className="p-1.5 rounded text-white/40 hover:text-yellow-400 hover:bg-white/5 transition"
            title="Arquivar"
          >
            <FiArchive size={12} />
          </button>
          <button
            onClick={() => deleteJob(job.id)}
            className="p-1.5 rounded text-white/40 hover:text-red-400 hover:bg-white/5 transition"
            title="Excluir"
          >
            <FiTrash2 size={12} />
          </button>
        </div>
      )}

      <h4 className="font-medium text-sm text-white leading-snug pr-20">{job.title}</h4>

      {job.company && (
        <p className="text-xs text-white/45 mt-1">{job.company}</p>
      )}

      {deadlineLabel && (
        <div className={`flex items-center gap-1.5 mt-3 text-xs ${isExpired ? 'text-red-400' : 'text-white/35'}`}>
          <FiCalendar size={11} />
          <span>{isExpired ? 'Expirado · ' : ''}{deadlineLabel}</span>
        </div>
      )}
    </div>
  );
}
