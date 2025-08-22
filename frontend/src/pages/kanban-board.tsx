import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { menuOutline } from 'ionicons/icons';

const ColumnNames = {
  TODO: 'Todo',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
} as const;

interface Column {
  id: (typeof ColumnNames)[keyof typeof ColumnNames];
  title: (typeof ColumnNames)[keyof typeof ColumnNames];
}

const columns: Column[] = [
  { id: ColumnNames.TODO, title: ColumnNames.TODO },
  { id: ColumnNames.IN_PROGRESS, title: ColumnNames.IN_PROGRESS },
  { id: ColumnNames.DONE, title: ColumnNames.DONE },
];

const TaskStatuses = {
  TODO: 'Todo',
  IMPLEMENTATION: 'Implementation',
  IN_CODE_REVIEW: 'In code review',
  READY_FOR_QA: 'Ready for QA',
  IN_QA: 'In QA',
  READY_FOR_DEPLOYMENT: 'Ready for deployment',
  IN_PRODUCTION: 'In production',
};

interface Task {
  id: string;
  title: string;
  description: string;
  column: Column;
  status: (typeof TaskStatuses)[keyof typeof TaskStatuses];
}

const tasks: Task[] = [
  {
    id: 'title-1',
    title: 'Title 1',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi, id impedit cum unde numquam, quod et nisi minus ea veritatis nulla eligendi expedita dignissimos. Accusantium saepe et dicta facere assumenda.',
    status: TaskStatuses.TODO,
    column: columns.at(0)!,
  },
  {
    id: 'title-2',
    title: 'Title 2',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi, id impedit cum unde numquam, quod et nisi minus ea veritatis nulla eligendi expedita dignissimos. Accusantium saepe et dicta facere assumenda.',
    status: TaskStatuses.IMPLEMENTATION,
    column: columns.at(1)!,
  },
  {
    id: 'title-3',
    title: 'Title 3',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi, id impedit cum unde numquam, quod et nisi minus ea veritatis nulla eligendi expedita dignissimos. Accusantium saepe et dicta facere assumenda.',
    status: TaskStatuses.IN_CODE_REVIEW,
    column: columns.at(1)!,
  },
  {
    id: 'title-4',
    title: 'Title 4',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi, id impedit cum unde numquam, quod et nisi minus ea veritatis nulla eligendi expedita dignissimos. Accusantium saepe et dicta facere assumenda.',
    status: TaskStatuses.READY_FOR_QA,
    column: columns.at(1)!,
  },
  {
    id: 'title-5',
    title: 'Title 5',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi, id impedit cum unde numquam, quod et nisi minus ea veritatis nulla eligendi expedita dignissimos. Accusantium saepe et dicta facere assumenda.',
    status: TaskStatuses.IN_QA,
    column: columns.at(1)!,
  },
  {
    id: 'title-6',
    title: 'Title 6',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi, id impedit cum unde numquam, quod et nisi minus ea veritatis nulla eligendi expedita dignissimos. Accusantium saepe et dicta facere assumenda.',
    status: TaskStatuses.READY_FOR_DEPLOYMENT,
    column: columns.at(2)!,
  },
  {
    id: 'title-7',
    title: 'Title 7',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi, id impedit cum unde numquam, quod et nisi minus ea veritatis nulla eligendi expedita dignissimos. Accusantium saepe et dicta facere assumenda.',
    status: TaskStatuses.IN_PRODUCTION,
    column: columns.at(2)!,
  },
];

const columnTasks = tasks.reduce(
  (acc, curr) => {
    if (!curr.column) return {} as Record<(typeof ColumnNames)[keyof typeof ColumnNames], Task[]>;

    const currentColumnId = curr.column.id;
    const itemsForCurrentColumns = acc[currentColumnId];

    if (!itemsForCurrentColumns)
      return { ...acc, [currentColumnId]: [curr] } as Record<(typeof ColumnNames)[keyof typeof ColumnNames], Task[]>;

    return { ...acc, [currentColumnId]: itemsForCurrentColumns.concat(curr) };
  },
  {} as Record<(typeof ColumnNames)[keyof typeof ColumnNames], Task[]>,
);

export function KanbanBoard() {
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
                <IonCol size="2" className="ion-display-flex ion-justify-content-end">
                  <IonButton>Create</IonButton>
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
              <IonCol key={col.id}>
                <IonCard>
                  <IonCardHeader>
                    <IonItem>
                      <IonLabel>
                        <IonTitle>{col.title}</IonTitle>
                      </IonLabel>
                    </IonItem>
                  </IonCardHeader>
                  <IonCardContent style={{ overflowY: 'scroll', height: '80vh' }}>
                    {columnTasks[col.id]?.map((item) => (
                      <IonCard className="ion-margin-vertical" key={item.id}>
                        <IonCardHeader>
                          <IonItem>
                            <IonLabel>{item.title}</IonLabel>
                          </IonItem>
                        </IonCardHeader>
                        <IonCardContent>
                          <IonText>{item.description}</IonText>
                        </IonCardContent>
                        <IonFooter>
                          <IonItem>
                            <IonText color={'tertiary'}>{item.status}</IonText>
                            <IonIcon slot="end" icon={menuOutline} />
                          </IonItem>
                        </IonFooter>
                      </IonCard>
                    ))}
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </>
  );
}
