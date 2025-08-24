import { useDraggable } from '@dnd-kit/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
} from '@ionic/react';
import { trash } from 'ionicons/icons';
import { Task } from '../../api/tasks/types';
import { useDeleteTask } from '../../hooks/use-delete-task';

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const { mutate: deleteTask } = useDeleteTask();
  const { attributes, listeners, setNodeRef, isDragging, transform } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <IonCard
      button
      ref={setNodeRef}
      style={{ ...style, zIndex: 9999, position: 'relative' }}
      className="ion-margin-vertical"
      key={task.id}
      onClick={() => onClick(task)}
      {...listeners}
      {...attributes}
    >
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol size="10">
              <IonLabel>{task.title}</IonLabel>
            </IonCol>
            <IonCol size="2">
              <IonButton
                fill="clear"
                onClick={(event) => {
                  event.stopPropagation();
                  deleteTask(task.id);
                }}
              >
                <IonIcon icon={trash} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
}
