import { useDraggable } from '@dnd-kit/core';
import { IonCard, IonCardContent, IonLabel, IonRow } from '@ionic/react';
import { Task } from '../../api/tasks/types';

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
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
      {...listeners}
      {...attributes}
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
