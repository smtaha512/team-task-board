import { IonCard, IonCardContent, IonLabel, IonRow } from '@ionic/react';
import { Task } from '../../api/tasks/types';

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <IonCard
      button
      className="ion-margin-vertical"
      key={task.id}
      onClick={() => onClick(task)}
    >
      <IonCardContent>
        <IonRow>
          <IonLabel>{task.title}</IonLabel>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
}
