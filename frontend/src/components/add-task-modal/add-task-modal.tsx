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
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { add, close } from 'ionicons/icons';
import { useState } from 'react';
import { FetchColumnsResponseBodyDto } from '../../api/columns';
import { useCreateTask } from '../../hooks/use-create-task';

interface AddTaskModalProps {
  column: FetchColumnsResponseBodyDto;
  onDismiss?: () => void;
}

export function AddTaskModal({ column, onDismiss }: AddTaskModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { mutate, isPending } = useCreateTask();

  const closeModal = () => {
    setTitle('');
    setDescription('');
    setIsOpen(false);
  };

  function handleDismiss() {
    if (!title) {
      closeModal();
      return;
    }

    const createTaskParams = {
      body: { title, description },
      columnId: column.id,
    };

    mutate(createTaskParams, {
      onSuccess: () => {
        onDismiss?.();
        closeModal();
      },
    });
  }

  return (
    <>
      <IonButton expand="full" fill="clear" onClick={() => setIsOpen(true)}>
        <IonText>Add new task</IonText>
        <IonIcon icon={add} />
      </IonButton>
      <IonModal isOpen={isOpen} onDidDismiss={closeModal}>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>
                <IonInput
                  onIonChange={(event) => setTitle(event.detail.value ?? '')}
                  placeholder="Enter title"
                ></IonInput>
              </IonTitle>
              <IonButtons slot="end" className="ion-margin-end">
                <IonButton
                  onClick={closeModal}
                  fill="clear"
                  aria-label={'Close add new task modal'}
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
                onIonChange={(event) =>
                  setDescription(event.detail.value ?? '')
                }
              />
            </IonItem>
          </IonContent>
          <IonButton
            expand="block"
            onClick={handleDismiss}
            disabled={isPending || !title}
          >
            {isPending ? 'Creating...' : 'Create Task'}
          </IonButton>
        </IonPage>
      </IonModal>
    </>
  );
}
