import type { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IonIcon } from '@ionic/react';
import { cva } from 'class-variance-authority';
import { menuOutline } from 'ionicons/icons';
import { cn } from '../libs/utils';
import { Badge } from './atoms/badge';
import { Button } from './atoms/button';
import { Card, CardContent, CardHeader } from './atoms/card';
import type { ColumnId } from './kanban-board';

export interface Task {
  id: UniqueIdentifier;
  columnId: ColumnId;
  content: string;
}

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = 'Task';

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: 'Task',
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva('', {
    variants: {
      dragging: {
        over: 'ring-2 opacity-30',
        overlay: 'ring-2 ring-primary',
      },
    },
  });

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        variants({
          dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined,
        }),
        'ion-margin',
      )}
    >
      <CardHeader
        className="px-3 py-3 space-between flex flex-row border-b-2 border-secondary relative"
        {...attributes}
        {...listeners}
      >
        <Button
          fill="clear"
          size="small"
          color="secondary"
          className="p-1 text-secondary-foreground/50 -ml-2 h-auto cursor-grab"
          aria-label="Move task"
        >
          <IonIcon icon={menuOutline} />
        </Button>
        <Badge color={'secondary'} className="ml-auto font-semibold">
          Task
        </Badge>
      </CardHeader>
      <CardContent className="px-3 pt-3 pb-6 text-left whitespace-pre-wrap">{task.content}</CardContent>
    </Card>
  );
}
