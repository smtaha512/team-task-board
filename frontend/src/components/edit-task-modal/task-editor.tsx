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

interface TaskEditorProps {
  columnId: string;
  task?: Task;
  dismiss: (data?: Partial<Task>, role?: string) => void;
}
export function TaskEditor({
  task,
  columnId: string,
  dismiss,
}: TaskEditorProps) {
  const [updatedTask, setUpdatedTask] = useState<Partial<Task> | undefined>(
    task,
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonInput
              onIonBlur={(event) =>
                setUpdatedTask({
                  ...updatedTask,
                  title: (event.target?.value ?? '').toString(),
                })
              }
              placeholder="Title"
              value={task?.title}
            ></IonInput>
          </IonTitle>
          <IonButtons slot="end" className="ion-margin-end">
            <IonButton
              onClick={() => dismiss(updatedTask, 'confirm')}
              fill="clear"
              aria-label={'Close ' + updatedTask?.title + ' edit modal'}
            >
              <IonIcon icon={close}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard className="ion-margin-vertical">
          <IonCardContent>
            <IonItem>
              <IonTextarea
                label="Description"
                labelPlacement="floating"
                autoGrow
                value={task?.description}
                rows={20}
                onIonBlur={(event) =>
                  setUpdatedTask({
                    ...updatedTask,
                    description: (event.target?.value ?? '').toString(),
                  })
                }
              />
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
      {task && (
        <IonFooter>
          <IonItem>
            <IonSelect
              label="Status"
              placeholder="Select status"
              interface="popover"
              value={updatedTask?.status}
              onIonChange={(event) =>
                setUpdatedTask({ ...updatedTask, status: event.detail.value })
              }
            >
              {Object.values(TaskStatuses).map((status) => (
                <IonSelectOption value={status} key={status}>
                  {status}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonFooter>
      )}
    </IonPage>
  );
}
