import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonItem,
  IonLabel,
  IonTitle,
} from '@ionic/react';
import { ReactNode } from 'react';
import { FetchColumnsResponseBodyDto } from '../../api/columns';
import { Task } from '../../api/tasks';
import { AddTaskModal } from '../add-task-modal/add-task-modal';

interface BoardColumnProps {
  column: FetchColumnsResponseBodyDto;
  children: ReactNode;
}

const newTask: Task = { description: '', id: '', columnId: '', title: '' };

export function BoardColumn({ column, children }: BoardColumnProps) {
  return (
    <IonCol size="4">
      <IonCard>
        <IonCardHeader>
          <IonItem>
            <IonLabel slot="start">
              <IonTitle title={column.title}>{column.title}</IonTitle>
            </IonLabel>
          </IonItem>
        </IonCardHeader>
        <IonCardContent style={{ overflowY: 'scroll', height: '75vh' }}>
          {children}
        </IonCardContent>
        <AddTaskModal column={column} />
      </IonCard>
    </IonCol>
  );
}
