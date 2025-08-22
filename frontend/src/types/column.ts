export const ColumnNames = {
  TODO: 'Todo',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
} as const;

export interface Column {
  id: (typeof ColumnNames)[keyof typeof ColumnNames];
  title: (typeof ColumnNames)[keyof typeof ColumnNames];
}
