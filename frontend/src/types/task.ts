import type { Column } from './column';

export const TaskStatuses = {
  TODO: 'Todo',
  IMPLEMENTATION: 'Implementation',
  IN_CODE_REVIEW: 'In code review',
  READY_FOR_QA: 'Ready for QA',
  IN_QA: 'In QA',
  READY_FOR_DEPLOYMENT: 'Ready for deployment',
  IN_PRODUCTION: 'In production',
};

export interface Task {
  id: string;
  title: string;
  description: string;
  column: Column;
  status: (typeof TaskStatuses)[keyof typeof TaskStatuses];
}
