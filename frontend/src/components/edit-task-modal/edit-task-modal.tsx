import type { OverlayEventDetail } from '@ionic/core';
import { useIonModal } from '@ionic/react';
import { useState } from 'react';
import { type Task } from '../../types/task';
import { EditTask } from './edit-task';

export function useEditTaskModal() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [updatedTask, setUpdatedTask] = useState<Task | null>(null);

  const [present, dismiss] = useIonModal(EditTask, {
    task: selectedTask,
    dismiss: (data: Task, role: string) => dismiss(data, role),
  });

  function openModal(task: Task) {
    if (!task) return;

    setSelectedTask(task);

    present({
      onWillDismiss: (event: CustomEvent<OverlayEventDetail<Task>>) => {
        const { role, data } = event.detail;

        if (role === 'confirm' && data) {
          setUpdatedTask(data);
        }

        setSelectedTask(null);
      },
    });
  }

  return { updatedTask, openEditTaskModal: openModal };
}
