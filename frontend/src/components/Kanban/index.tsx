import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { useState } from 'react';
import { FiArchive } from 'react-icons/fi';
import { useJobs } from '../../contexts/JobContext';
import { KANBAN_COLUMNS, type KanbanStatus } from '../../types/job';
import ArchivedPanel from './ArchivedPanel';
import Column from './Column';

export default function Kanban() {
  const { jobs, moveJob } = useJobs();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const visible = jobs.filter(j => !j.archived);
  const archivedCount = jobs.length - visible.length;
  const activeJob = activeId ? jobs.find(j => j.id === activeId) : null;

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(active.id as string);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (over && active.id !== over.id) {
      moveJob(active.id as string, over.id as KanbanStatus);
    }
    setActiveId(null);
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 shrink-0">
        <p className="text-xs text-white/35">
          {visible.length} vaga{visible.length !== 1 ? 's' : ''} ativa{visible.length !== 1 ? 's' : ''}
        </p>
        {archivedCount > 0 && (
          <button
            onClick={() => setShowArchived(true)}
            className="flex items-center gap-1.5 text-xs text-white/35 hover:text-white/65 transition"
          >
            <FiArchive size={13} />
            {archivedCount} arquivada{archivedCount !== 1 ? 's' : ''}
          </button>
        )}
      </div>

      {/* Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <div className="flex gap-5 p-6 overflow-x-auto flex-1 items-start">
          {KANBAN_COLUMNS.map(col => (
            <Column
              key={col.id}
              id={col.id}
              title={col.title}
              jobs={visible.filter(j => j.status === col.id)}
              activeId={activeId}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={null}>
          {activeJob ? (
            <div
              className="bg-[#1b1b2d] p-4 rounded-xl border border-purple-500/60 shadow-xl shadow-purple-500/20 w-[272px] rotate-2 opacity-95 cursor-grabbing"
            >
              <h4 className="font-medium text-sm text-white leading-snug">{activeJob.title}</h4>
              {activeJob.company && (
                <p className="text-xs text-white/45 mt-1">{activeJob.company}</p>
              )}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {showArchived && <ArchivedPanel onClose={() => setShowArchived(false)} />}
    </div>
  );
}
