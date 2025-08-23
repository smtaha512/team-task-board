import { CreateTaskRequestBodyDto, FetchTaskRequestBodyDto } from './types';

// TODO: Should be passed using config/environment variables
const apiBaseUrl = 'http://localhost:3000';

// TODO: Add proper error handling
export async function fetchTasks(): Promise<FetchTaskRequestBodyDto[]> {
  const response = await fetch(`${apiBaseUrl}/tasks`);

  return response.json();
}

// TODO: Add proper error handling
export async function createTask(
  columnId: string,
  body: CreateTaskRequestBodyDto,
): Promise<void> {
  const headers = new Headers();
  headers.set('content-type', 'application/json');

  await fetch(`${apiBaseUrl}/tasks`, {
    method: 'POST',
    body: JSON.stringify({ ...body, columnId }),
    headers: {},
  });
}
