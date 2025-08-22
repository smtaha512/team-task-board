import { FetchColumnsResponseBodyDto } from './types';

// TODO: Should be passed using config/environment variables
const apiBaseUrl = 'http://localhost:3000';

// TODO: Add proper error handling
export async function fetchColumns(): Promise<FetchColumnsResponseBodyDto[]> {
  const response = await fetch(`${apiBaseUrl}/board/columns`);

  return response.json();
}
