import { IonCard, IonCardContent, IonLabel, IonRow } from '@ionic/react';
import { Task } from '../../api/tasks/types';
import { useEditTaskModal } from '../edit-task-modal/edit-task-modal';

export function TaskCard({ task }: { task: Task }) {
  const { openEditTaskModal } = useEditTaskModal();

  return (
    <IonCard onClick={() => openEditTaskModal(task)} button className="ion-margin-vertical" key={task.id}>
      <IonCardContent>
        <IonRow>
          <IonLabel>{task.title}</IonLabel>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
}
