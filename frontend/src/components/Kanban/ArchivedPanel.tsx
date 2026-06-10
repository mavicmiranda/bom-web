import { FiArchive, FiRefreshCw, FiTrash2, FiX } from 'react-icons/fi';
import { useJobs } from '../../contexts/JobContext';

interface Props {
  onClose: () => void;
}

export default function ArchivedPanel({ onClose }: Props) {
  const { jobs, unarchiveJob, deleteJob } = useJobs();
  const archived = jobs.filter(j => j.archived);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-2xl flex flex-col"
        style={{ background: 'rgba(15, 15, 25, 0.97)', maxHeight: '70vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-white/70">
            <FiArchive size={16} />
            <span className="text-sm font-medium text-white">Vagas arquivadas</span>
            <span className="text-xs text-white/35 bg-white/5 rounded-full px-2 py-0.5">
              {archived.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* List */}
        {archived.length === 0 ? (
          <p className="text-sm text-white/30 py-10 text-center">Nenhuma vaga arquivada.</p>
        ) : (
          <div className="overflow-y-auto flex flex-col gap-2 pr-1">
            {archived.map(job => (
              <div
                key={job.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/5"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white/65 truncate">{job.title}</p>
                  {job.company && (
                    <p className="text-xs text-white/35 truncate">{job.company}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 ml-3 shrink-0">
                  <button
                    onClick={() => unarchiveJob(job.id)}
                    className="p-1.5 rounded-lg text-white/35 hover:text-green-400 hover:bg-white/5 transition"
                    title="Restaurar"
                  >
                    <FiRefreshCw size={13} />
                  </button>
                  <button
                    onClick={() => deleteJob(job.id)}
                    className="p-1.5 rounded-lg text-white/35 hover:text-red-400 hover:bg-white/5 transition"
                    title="Excluir permanentemente"
                  >
                    <FiTrash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
