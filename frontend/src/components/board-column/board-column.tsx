import { useDroppable } from '@dnd-kit/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonItem,
  IonTitle,
} from '@ionic/react';
import { ReactNode } from 'react';
import { FetchColumnsResponseBodyDto } from '../../api/columns';
import { AddTaskModal } from '../add-task-modal/add-task-modal';

interface BoardColumnProps {
  column: FetchColumnsResponseBodyDto;
  children: ReactNode;
}

export function BoardColumn({ column, children }: BoardColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <IonCol
      size="4"
      ref={setNodeRef}
      style={{ backgroundColor: isOver ? 'var(--ion-color-light)' : undefined }}
    >
      <IonCard>
        <IonCardHeader>
          <IonItem>
            <IonTitle title={column.title}>{column.title}</IonTitle>
          </IonItem>
        </IonCardHeader>
        <IonCardContent
          style={{ overflowY: 'scroll', overflowX: 'hidden', height: '75vh' }}
        >
          {children}
        </IonCardContent>
        <AddTaskModal column={column} />
      </IonCard>
    </IonCol>
  );
}
