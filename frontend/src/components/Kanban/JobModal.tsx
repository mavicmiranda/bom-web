import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useJobs } from '../../contexts/JobContext';
import { type Job, type KanbanStatus } from '../../types/job';

interface FormData {
  title: string;
  description: string;
  requirements: string;
  deadline: string;
  company: string;
  status: KanbanStatus;
}

interface FormErrors {
  title?: string;
  requirements?: string;
}

export default function JobModal() {
  const { isModalOpen, editingJob, defaultStatus, closeModal, addJob, updateJob } = useJobs();

  const [form, setForm] = useState<FormData>({
    title: '', description: '', requirements: '', deadline: '', company: '',
    status: defaultStatus,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (editingJob) {
      setForm({
        title: editingJob.title,
        description: editingJob.description,
        requirements: editingJob.requirements,
        deadline: editingJob.deadline,
        company: editingJob.company,
        status: editingJob.status,
      });
    } else {
      setForm({ title: '', description: '', requirements: '', deadline: '', company: '', status: defaultStatus });
    }
    setErrors({});
  }, [isModalOpen, editingJob, defaultStatus]);

  if (!isModalOpen) return null;

  function validate(): boolean {
    const next: FormErrors = {};
    if (!form.title.trim()) next.title = 'Título é obrigatório';
    if (!form.requirements.trim()) next.requirements = 'Requisitos são obrigatórios';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleChange(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (field in errors) setErrors(prev => ({ ...prev, [field]: undefined }));
  }

  function save(): Job | null {
    if (!validate()) return null;
    if (editingJob) {
      updateJob(editingJob.id, form);
      return { ...editingJob, ...form };
    }
    return addJob(form);
  }

  function handleSave() {
    if (save()) closeModal();
  }

  function handleSaveAndMatch() {
    const job = save();
    if (!job) return;
    closeModal();
    // TODO: abrir painel de matching com job.id quando backend estiver pronto
    console.log('[Matching] jobId:', job.id);
  }

  const inputBase =
    'w-full px-3 py-2 rounded-lg bg-white/5 border text-white text-sm placeholder-white/30 outline-none transition focus:border-purple-500/60';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={closeModal} />

      {/* Panel */}
      <div
        className="relative w-full max-w-lg rounded-2xl border border-white/10 p-6 shadow-2xl"
        style={{ background: 'rgba(15, 15, 25, 0.97)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-white">
            {editingJob ? 'Editar vaga' : 'Nova vaga'}
          </h2>
          <button onClick={closeModal} className="p-1 text-white/40 hover:text-white transition rounded-lg hover:bg-white/5">
            <FiX size={18} />
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">
              Título da vaga <span className="text-purple-400">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={e => handleChange('title', e.target.value)}
              placeholder="ex: Desenvolvedor Frontend React"
              className={`${inputBase} ${errors.title ? 'border-red-500/60' : 'border-white/10'}`}
            />
            {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
          </div>

          {/* Company */}
          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Empresa</label>
            <input
              type="text"
              value={form.company}
              onChange={e => handleChange('company', e.target.value)}
              placeholder="ex: Vercel"
              className={`${inputBase} border-white/10`}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Descrição</label>
            <textarea
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              placeholder="Descreva a vaga..."
              rows={2}
              className={`${inputBase} border-white/10 resize-none`}
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">
              Requisitos <span className="text-purple-400">*</span>
            </label>
            <textarea
              value={form.requirements}
              onChange={e => handleChange('requirements', e.target.value)}
              placeholder="Liste os requisitos da vaga..."
              rows={3}
              className={`${inputBase} ${errors.requirements ? 'border-red-500/60' : 'border-white/10'} resize-none`}
            />
            {errors.requirements && <p className="mt-1 text-xs text-red-400">{errors.requirements}</p>}
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Prazo de inscrição</label>
            <input
              type="date"
              value={form.deadline}
              onChange={e => handleChange('deadline', e.target.value)}
              style={{ colorScheme: 'dark' }}
              className={`${inputBase} border-white/10`}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-white/70 text-sm hover:bg-white/5 hover:text-white transition"
          >
            Salvar vaga
          </button>
          <button
            onClick={handleSaveAndMatch}
            className="flex-1 btn-primary text-sm py-2.5"
          >
            Salvar e ver matching
          </button>
        </div>
      </div>
    </div>
  );
}
