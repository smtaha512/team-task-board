import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonTitle,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { ReactNode, useEffect } from 'react';
import { FetchColumnsResponseBodyDto } from '../../api/columns';
import { Task } from '../../api/tasks';
import { useEditTaskModal } from '../edit-task-modal/edit-task-modal';

interface BoardColumnProps {
  column: FetchColumnsResponseBodyDto;
  children: (id: string) => ReactNode;
  onUpdateTask: (task: Task) => void;
}

const newTask: Task = { description: '', id: '', columnId: '', title: '' };

export function BoardColumn({
  column,
  children,
  onUpdateTask,
}: BoardColumnProps) {
  const { openEditTaskModal, updatedTask } = useEditTaskModal();

  useEffect(() => {
    if (!updatedTask) {
      return;
    }

    onUpdateTask(updatedTask);
  }, [onUpdateTask, updatedTask]);

  return (
    <IonCol size="4">
      <IonCard>
        <IonCardHeader>
          <IonItem>
            <IonLabel>
              <IonTitle>{column.title}</IonTitle>
            </IonLabel>
          </IonItem>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={() => openEditTaskModal(newTask)}>
              <IonIcon icon={add} />
            </IonButton>
          </IonButtons>
        </IonCardHeader>
        <IonCardContent style={{ overflowY: 'scroll', height: '80vh' }}>
          {children(column.id)}
        </IonCardContent>
      </IonCard>
    </IonCol>
  );
}
