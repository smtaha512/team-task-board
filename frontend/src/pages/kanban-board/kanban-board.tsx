import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Task } from '../../api/tasks/types';
import { BoardColumn } from '../../components/board-column/board-column';
import { TaskEditorModal } from '../../components/edit-task-modal/task-editor-modal';
import { TaskCard } from '../../components/task-card/task-card';
import { useFetchColumns } from '../../hooks/use-fetch-columns';
import { useListTasks } from '../../hooks/use-list-tasks';
import { useUpdateTask } from '../../hooks/use-update-task';

// TODO: This component is getting bigger. It should be broken down
export function KanbanBoard() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const { data: columns } = useFetchColumns();
  const { data: tasks } = useListTasks();

  const { mutate: updateTask } = useUpdateTask();

  const sensors = useSensors(useSensor(PointerSensor));

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
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonGrid>
              <IonRow>
                <IonCol
                  size="10"
                  class="ion-display-flex ion-align-items-center"
                >
                  <IonText>Team Task Board</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollX={true}>
        <IonGrid fixed style={{ minWidth: '1140px' }}>
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
                      <TaskCard
                        key={task.id}
                        task={task}
                        onClick={setSelectedTask}
                      />
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
        </IonGrid>
      </IonContent>
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
