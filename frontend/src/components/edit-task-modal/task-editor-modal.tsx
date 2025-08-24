import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonModal,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { close } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { Task } from '../../api/tasks';
import { useUpdateTask } from '../../hooks/use-update-task';

interface TaskEditorModalProps {
  onDismiss: () => void;
  task: Task;
}

export function TaskEditorModal({ onDismiss, task }: TaskEditorModalProps) {
  const ref = useRef<HTMLIonModalElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const { mutate, isPending } = useUpdateTask();

  const closeModal = () => setIsOpen(false);

  function handleDismiss() {
    if (task.title === title && task.description === description) {
      closeModal();
      return;
    }

    const updateTaskParams = {
      title: title || task.title,
      description: description ?? task.description,
      id: task.id,
    };

    mutate(updateTaskParams, {
      onSuccess: () => {
        closeModal();
        onDismiss?.();
        setTitle('');
        setDescription('');
      },
    });
  }

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss} ref={ref}>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              <IonInput
                onIonChange={(event) => setTitle(event.detail.value ?? '')}
                placeholder="Enter title"
                value={task.title}
              ></IonInput>
            </IonTitle>
            <IonButtons slot="end" className="ion-margin-end">
              <IonButton
                onClick={() => {
                  closeModal();
                  onDismiss();
                }}
                fill="clear"
                aria-label={'Close edit task modal'}
              >
                <IonIcon icon={close}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonTextarea
              label="Description"
              labelPlacement="floating"
              autoGrow
              rows={20}
              onIonChange={(event) => setDescription(event.detail.value ?? '')}
              value={task.description}
            />
          </IonItem>
        </IonContent>
        <IonButton expand="block" onClick={handleDismiss} disabled={isPending}>
          {isPending ? 'Updating...' : 'Update Task'}
        </IonButton>
      </IonPage>
    </IonModal>
  );
}
