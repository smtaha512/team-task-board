import { useState } from 'react';
import { Task } from '../../api/tasks/types';
import { TaskEditorModal } from '../../components/edit-task-modal/task-editor-modal';
import { useFetchColumns } from '../../hooks/use-fetch-columns';
import { KanbanBoardContent } from './kanban-board-content';
import { KanbanBoardHeader } from './kanban-board-header';

export function KanbanBoard() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { data: columns } = useFetchColumns();

  return (
    <>
      <KanbanBoardHeader />
      <KanbanBoardContent columns={columns} setSelectedTask={setSelectedTask} />
      {selectedTask && (
        <TaskEditorModal
          onDismiss={() => setSelectedTask(null)}
          task={selectedTask}
          columns={columns}
        />
      )}
    </>
  );
}
