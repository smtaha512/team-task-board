import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { close } from 'ionicons/icons';
import { useState } from 'react';
import { TaskStatuses, type Task } from '../../types/task';

export function EditTask({ task, dismiss }: { task: Task; dismiss: (data?: Task, role?: string) => void }) {
  const [updatedTask, setUpdatedTask] = useState(task);

  if (!task) return null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonInput
              onIonBlur={(event) => setUpdatedTask({ ...updatedTask, title: (event.target?.value ?? '').toString() })}
              placeholder="Title"
              value={task.title}
            ></IonInput>
          </IonTitle>
          <IonButtons slot="end" className="ion-margin-end">
            <IonButton
              onClick={() => dismiss(updatedTask, 'confirm')}
              fill="clear"
              aria-label={'Close ' + updatedTask.title + ' edit modal'}
            >
              <IonIcon icon={close}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard className="ion-margin-vertical" key={task.id}>
          <IonCardContent>
            <IonItem>
              <IonTextarea
                label="Description"
                labelPlacement="floating"
                autoGrow
                value={task.description}
                rows={20}
                onIonBlur={(event) =>
                  setUpdatedTask({ ...updatedTask, description: (event.target?.value ?? '').toString() })
                }
              />
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
      <IonFooter>
        <IonItem>
          <IonSelect
            label="Status"
            placeholder="Select status"
            interface="popover"
            value={updatedTask.status}
            onIonChange={(event) => setUpdatedTask({ ...updatedTask, status: event.detail.value })}
          >
            {Object.values(TaskStatuses).map((status) => (
              <IonSelectOption value={status} key={status}>
                {status}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
      </IonFooter>
    </IonPage>
  );
}
