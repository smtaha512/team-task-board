import { useQuery } from '@tanstack/react-query';
import { listTasks } from '../api/tasks/tasks';

export function useListTasks() {
  return useQuery({ queryFn: listTasks, queryKey: ['tasks'], initialData: [] });
}
