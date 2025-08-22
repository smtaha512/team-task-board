export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

export interface FetchTasksGroupedByColumnsResponseBodyDto {
  [id: string]: Task[];
}

export interface CreateTaskRequestBodyDto {
  title: string;
  description: string;
  status: string;
}
