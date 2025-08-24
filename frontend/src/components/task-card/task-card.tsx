import { IonCard, IonCardContent, IonLabel, IonRow } from '@ionic/react';
import { Task } from '../../api/tasks/types';

export function TaskCard({ task }: { task: Task }) {
  return (
    <IonCard button className="ion-margin-vertical" key={task.id}>
      <IonCardContent>
        <IonRow>
          <IonLabel>{task.title}</IonLabel>
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
}
