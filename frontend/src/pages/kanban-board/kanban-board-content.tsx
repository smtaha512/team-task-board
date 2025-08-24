import { IonContent, IonGrid } from '@ionic/react';
import { FetchColumnsResponseBodyDto } from '../../api/columns';
import { Task } from '../../api/tasks';
import { useListTasks } from '../../hooks/use-list-tasks';
import { KanbanBoardSortableColumns } from './kanban-board-sortable-columns';

interface KanbanBoardContent {
  setSelectedTask: (task: Task) => void;
  columns: FetchColumnsResponseBodyDto[];
}

export function KanbanBoardContent({
  setSelectedTask,
  columns,
}: KanbanBoardContent) {
  const { data: tasks } = useListTasks();

  return (
    <IonContent scrollX={true}>
      <IonGrid fixed style={{ minWidth: '1140px' }}>
        <KanbanBoardSortableColumns
          columns={columns}
          onTaskSelect={setSelectedTask}
          tasks={tasks}
        />
      </IonGrid>
    </IonContent>
  );
}
