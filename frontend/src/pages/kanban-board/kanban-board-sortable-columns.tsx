import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { IonRow } from '@ionic/react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FetchColumnsResponseBodyDto } from '../../api/columns';
import { Task } from '../../api/tasks';
import { BoardColumn } from '../../components/board-column/board-column';
import { TaskCard } from '../../components/task-card/task-card';
import { useUpdateTask } from '../../hooks/use-update-task';

interface KanbanBoardSortableColumnsProps {
  columns: FetchColumnsResponseBodyDto[];
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
}

export function KanbanBoardSortableColumns({
  columns,
  tasks,
  onTaskSelect,
}: KanbanBoardSortableColumnsProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const { mutate: updateTask } = useUpdateTask();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return; // dropped outside any column

    const taskId = active.id as string;
    const newColumnId = over.id as string;

    const movedTask = tasks?.find((t) => t.id === taskId);
    if (movedTask && movedTask.columnId !== newColumnId) {
      updateTask({ ...movedTask, columnId: newColumnId });
    }
  }

  function handleDragStart(event: DragStartEvent) {
    const taskId = event.active.id as string;
    const task = tasks?.find((t) => t.id === taskId) || null;
    setActiveTask(task);
  }

  return (
    <IonRow>
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        sensors={sensors}
      >
        {columns?.map((col) => (
          <BoardColumn key={col.id} column={col}>
            {tasks
              .filter((task) => task.columnId === col.id)
              .map((task) => (
                <TaskCard key={task.id} task={task} onClick={onTaskSelect} />
              ))}
          </BoardColumn>
        ))}
        {createPortal(
          <DragOverlay dropAnimation={null}>
            {activeTask ? (
              <TaskCard task={activeTask} onClick={() => {}} />
            ) : null}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </IonRow>
  );
}
