export type KanbanStatus = 'interessado' | 'aplicado' | 'entrevista' | 'oferta';

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string;
  deadline: string;
  company: string;
  status: KanbanStatus;
  archived: boolean;
  createdAt: string;
}

export const KANBAN_COLUMNS: { id: KanbanStatus; title: string }[] = [
  { id: 'interessado', title: 'Interessado' },
  { id: 'aplicado', title: 'Aplicado' },
  { id: 'entrevista', title: 'Entrevista' },
  { id: 'oferta', title: 'Oferta' },
];

export const COLUMN_COLORS: Record<KanbanStatus, { accent: string; border: string; dot: string }> = {
  interessado: { accent: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.35)', dot: '#8b5cf6' },
  aplicado:    { accent: 'rgba(59,130,246,0.12)',  border: 'rgba(59,130,246,0.35)',  dot: '#3b82f6' },
  entrevista:  { accent: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)', dot: '#f59e0b' },
  oferta:      { accent: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.35)',  dot: '#22c55e' },
};
