import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { type Job, type KanbanStatus } from '../types/job';

interface JobContextType {
  jobs: Job[];
  addJob: (data: Omit<Job, 'id' | 'archived' | 'createdAt'>) => Job;
  updateJob: (id: string, data: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  archiveJob: (id: string) => void;
  unarchiveJob: (id: string) => void;
  moveJob: (id: string, status: KanbanStatus) => void;
  isModalOpen: boolean;
  editingJob: Job | null;
  defaultStatus: KanbanStatus;
  openModal: (status?: KanbanStatus, job?: Job) => void;
  closeModal: () => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

const STORAGE_KEY = 'bom_kanban_jobs';

function loadJobs(): Job[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persist(jobs: Job[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

export function JobProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>(loadJobs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<KanbanStatus>('interessado');

  function mutate(updater: (prev: Job[]) => Job[]) {
    setJobs(prev => {
      const next = updater(prev);
      persist(next);
      return next;
    });
  }

  const addJob = useCallback((data: Omit<Job, 'id' | 'archived' | 'createdAt'>): Job => {
    const job: Job = {
      ...data,
      id: crypto.randomUUID(),
      archived: false,
      createdAt: new Date().toISOString(),
    };
    mutate(prev => [...prev, job]);
    return job;
  }, []);

  const updateJob = useCallback((id: string, data: Partial<Job>) => {
    mutate(prev => prev.map(j => (j.id === id ? { ...j, ...data } : j)));
  }, []);

  const deleteJob = useCallback((id: string) => {
    mutate(prev => prev.filter(j => j.id !== id));
  }, []);

  const archiveJob = useCallback((id: string) => {
    mutate(prev => prev.map(j => (j.id === id ? { ...j, archived: true } : j)));
  }, []);

  const unarchiveJob = useCallback((id: string) => {
    mutate(prev => prev.map(j => (j.id === id ? { ...j, archived: false } : j)));
  }, []);

  const moveJob = useCallback((id: string, status: KanbanStatus) => {
    mutate(prev => prev.map(j => (j.id === id ? { ...j, status } : j)));
  }, []);

  const openModal = useCallback((status: KanbanStatus = 'interessado', job?: Job) => {
    setDefaultStatus(status);
    setEditingJob(job ?? null);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingJob(null);
  }, []);

  return (
    <JobContext.Provider
      value={{
        jobs, addJob, updateJob, deleteJob, archiveJob, unarchiveJob, moveJob,
        isModalOpen, editingJob, defaultStatus, openModal, closeModal,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const ctx = useContext(JobContext);
  if (!ctx) throw new Error('useJobs must be inside JobProvider');
  return ctx;
}
