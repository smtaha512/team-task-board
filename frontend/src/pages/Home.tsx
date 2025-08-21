import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useState } from 'react';

type TaskStatus = 'todo' | 'in-progress' | 'done';

interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      status: 'todo',
    };
    setTasks((prev) => [...prev, task]);
    setNewTask('');
  };

  const renderTasks = (status: TaskStatus) =>
    tasks
      .filter((t) => t.status === status)
      .map((t) => (
        <IonCard key={t.id}>
          <IonCardContent>{t.title}</IonCardContent>
        </IonCard>
      ));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Task Board</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {/* Add Task Input */}
        <div style={{ display: 'flex', gap: '8px', padding: '12px' }}>
          <IonInput placeholder="Enter task" value={newTask} onIonChange={(e) => setNewTask(e.detail.value!)} />
          <IonButton onClick={addTask}>Add Task</IonButton>
        </div>

        {/* Task Board */}
        <IonGrid>
          <IonRow>
            <IonCol>
              <h2>To Do</h2>
              {renderTasks('todo')}
            </IonCol>
            <IonCol>
              <h2>In Progress</h2>
              {renderTasks('in-progress')}
            </IonCol>
            <IonCol>
              <h2>Done</h2>
              {renderTasks('done')}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
