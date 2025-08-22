import { IonCol, IonContent, IonGrid, IonHeader, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { fetchColumns, FetchColumnsResponseBodyDto } from '../../api/columns';
import { fetchTasks, FetchTasksGroupedByColumnsResponseDto } from '../../api/tasks';
import { BoardColumn } from '../../components/board-column/board-column';
import { TaskCard } from '../../components/task-card/task-card';

export function KanbanBoard() {
  const [columns, setColumns] = useState<FetchColumnsResponseBodyDto[]>([]);
  const [tasks, setTasks] = useState<FetchTasksGroupedByColumnsResponseDto>({});

  useEffect(() => {
    fetchColumns().then((response) => setColumns(response));
    fetchTasks().then((response) => setTasks(response));
  }, []);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonGrid>
              <IonRow>
                <IonCol size="10" class="ion-display-flex ion-align-items-center">
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
              <BoardColumn
                key={col.id}
                column={col}
                onUpdateTask={(task) => {
                  console.log(task);
                }}
              >
                {(id: string) => tasks[id].map((task) => <TaskCard key={task.id} task={task} />)}
              </BoardColumn>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
}
