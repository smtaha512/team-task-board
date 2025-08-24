import { useQuery } from '@tanstack/react-query';
import { fetchColumns } from '../api/columns';

export function useFetchColumns() {
  return useQuery({
    queryFn: fetchColumns,
    queryKey: ['columns'],
    initialData: [],
  });
}
