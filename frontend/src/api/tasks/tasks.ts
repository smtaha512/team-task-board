import {
  CreateTaskRequestBodyDto,
  FetchTaskRequestBodyDto,
  ListAllTasksResponseBodyDto,
  Task,
  UpdateTaskRequestBodyDto,
} from './types';

// TODO: Should be passed using config/environment variables
const apiBaseUrl = 'http://localhost:3000';

// TODO: Add proper error handling
export async function fetchTasks(): Promise<FetchTaskRequestBodyDto[]> {
  const response = await fetch(`${apiBaseUrl}/tasks`);

  return response.json();
}

// TODO: Add proper error handling
export async function createTask({
  body,
  columnId,
}: {
  columnId: string;
  body: CreateTaskRequestBodyDto;
}): Promise<Task> {
  const headers = new Headers();
  headers.set('content-type', 'application/json');

  const response = await fetch(`${apiBaseUrl}/tasks`, {
    method: 'POST',
    body: JSON.stringify({ ...body, columnId }),
    headers,
  });

  return response.json();
}

// TODO: Add proper error handling
export async function updateTask({
  id,
  ...task
}: UpdateTaskRequestBodyDto): Promise<Task> {
  const headers = new Headers();
  headers.set('content-type', 'application/json');

  const response = await fetch(`${apiBaseUrl}/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      description: task.description,
      title: task.title,
      ...(task.columnId && { columnId: task.columnId }),
    }),
    headers,
  });

  return response.json();
}

// TODO: Add proper error handling
export async function deleteTask(id: string) {
  await fetch(`${apiBaseUrl}/tasks/${id}`, { method: 'DELETE' });
}

// TODO: Add proper error handling
export async function listTasks(): Promise<ListAllTasksResponseBodyDto[]> {
  const response = await fetch(`${apiBaseUrl}/tasks`);

  return response.json();
}
