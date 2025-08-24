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
import { Task } from '../../api/tasks/types';
import { BoardColumn } from '../../components/board-column/board-column';
import { TaskEditorModal } from '../../components/edit-task-modal/task-editor-modal';
import { TaskCard } from '../../components/task-card/task-card';
import { useFetchColumns } from '../../hooks/use-fetch-columns';
import { useListTasks } from '../../hooks/use-list-tasks';

export function KanbanBoard() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const { data: columns } = useFetchColumns();
  const { data: tasks } = useListTasks();

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
