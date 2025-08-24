import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task } from '../api/tasks';
import { deleteTask } from '../api/tasks/tasks';

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (deletedId) => {
      queryClient.setQueryData<Task[]>(['tasks'], (old) =>
        old ? old.filter((t) => t.id !== deletedId) : [],
      );
    },
  });
}
