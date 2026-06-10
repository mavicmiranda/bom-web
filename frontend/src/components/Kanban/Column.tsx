import { useDroppable } from '@dnd-kit/core';
import { FiPlus } from 'react-icons/fi';
import { useJobs } from '../../contexts/JobContext';
import { COLUMN_COLORS, type Job, type KanbanStatus } from '../../types/job';
import JobCard from './JobCard';

interface Props {
  id: KanbanStatus;
  title: string;
  jobs: Job[];
  activeId: string | null;
}

export default function Column({ id, title, jobs, activeId }: Props) {
  const { openModal } = useJobs();
  const { setNodeRef, isOver } = useDroppable({ id });
  const colors = COLUMN_COLORS[id];

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col min-w-[272px] max-w-[272px] rounded-2xl p-4 transition-all duration-200"
      style={{
        background: isOver ? colors.accent : 'rgba(255,255,255,0.025)',
        border: `1px solid ${isOver ? colors.border : 'rgba(255,255,255,0.06)'}`,
        boxShadow: isOver ? `0 0 24px ${colors.accent}` : 'none',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: colors.dot }} />
          <span className="text-sm font-medium text-white/75">{title}</span>
          {jobs.length > 0 && (
            <span className="text-xs text-white/35 bg-white/5 rounded-full px-2 py-0.5 leading-tight">
              {jobs.length}
            </span>
          )}
        </div>
        <button
          onClick={() => openModal(id)}
          className="p-1 rounded-lg text-white/25 hover:text-white/60 hover:bg-white/5 transition"
          title={`Adicionar em ${title}`}
        >
          <FiPlus size={15} />
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3 flex-1 min-h-[80px]">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} isActive={job.id === activeId} />
        ))}
      </div>

      {/* Footer add button */}
      <button
        onClick={() => openModal(id)}
        className="mt-4 w-full py-2 rounded-xl border border-dashed border-white/8 text-white/25 text-xs hover:border-white/20 hover:text-white/50 hover:bg-white/5 transition flex items-center justify-center gap-1.5"
      >
        <FiPlus size={13} />
        Adicionar vaga
      </button>
    </div>
  );
}
