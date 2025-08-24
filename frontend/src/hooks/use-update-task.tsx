import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task } from '../api/tasks';
import { updateTask } from '../api/tasks/tasks';

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: (updatedTask) => {
      queryClient.setQueryData<Task[]>(['tasks'], (old) =>
        old ? old.map((t) => (t.id === updatedTask.id ? updatedTask : t)) : [],
      );
    },
  });
}
