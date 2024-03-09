import { httpGetClient } from '@/src/utils/client';
import { TreeProps } from '@/src/utils/fs';
import { useQuery } from '@tanstack/react-query';

export const GetAllDirectoryQueryKey = '/api/post/getAllDirectory';

export interface GetAllDirectoryQueryResponse {
  success: boolean;
  tree: TreeProps | undefined;
  message: string;
}

export function useGetAllDirectoryQuery() {
  return useQuery(
    [GetAllDirectoryQueryKey],
    () => {
      return httpGetClient<GetAllDirectoryQueryResponse>(
        GetAllDirectoryQueryKey,
      );
    },
    { enabled: false },
  );
}
