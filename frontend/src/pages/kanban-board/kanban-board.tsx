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
import { useEffect, useState } from 'react';
import { fetchColumns, FetchColumnsResponseBodyDto } from '../../api/columns';
import { fetchTasks } from '../../api/tasks';
import { Task } from '../../api/tasks/types';
import { BoardColumn } from '../../components/board-column/board-column';
import { TaskCard } from '../../components/task-card/task-card';

type TasksGroupedByColumns = Record<string, Task[]>;

function groupTasksByColumns(tasks: Task[]): TasksGroupedByColumns {
  return tasks.reduce((acc, curr) => {
    const currentColumnId = curr.columnId;
    const currentGroup = acc[currentColumnId];

    if (!Array.isArray(currentGroup)) {
      return { ...acc, [currentColumnId]: [curr] };
    }

    return { ...acc, [currentColumnId]: [...currentGroup, curr] };
  }, {} as TasksGroupedByColumns);
}

export function KanbanBoard() {
  const [columns, setColumns] = useState<FetchColumnsResponseBodyDto[]>([]);
  const [tasks, setTasks] = useState<TasksGroupedByColumns>({});

  useEffect(() => {
    fetchColumns().then((response) => setColumns(response));
  }, []);

  useEffect(() => {
    fetchTasks().then(groupTasksByColumns).then(setTasks);
  }, [columns]);

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
            {columns.map((col) => (
              <BoardColumn key={col.id} column={col}>
                {(id: string) =>
                  tasks[id]?.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))
                }
              </BoardColumn>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
}
