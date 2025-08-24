export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
}

export type FetchTaskRequestBodyDto = Task;

export interface FetchTasksGroupedByColumnsResponseBodyDto {
  [id: string]: Task[];
}

export interface CreateTaskRequestBodyDto {
  title: string;
  description: string;
}

export interface UpdateTaskRequestBodyDto extends CreateTaskRequestBodyDto {
  id: string;
  columnId?: string;
}

export type ListAllTasksResponseBodyDto = Task;
