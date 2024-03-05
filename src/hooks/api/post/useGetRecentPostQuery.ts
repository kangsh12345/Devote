import { httpGetClient } from '@/src/utils/client';
import { DirectoryTreeProps } from '@/src/utils/fs';
import { useQuery } from '@tanstack/react-query';

const GetRecentPostQueryKey = '/api/post/getRecentPost';

export interface GetRecentPostQueryResponse {
  tree: DirectoryTreeProps[];
  success: boolean;
}

export function useGetRecentPostQuery() {
  return useQuery([GetRecentPostQueryKey], () => {
    return httpGetClient<GetRecentPostQueryResponse>(GetRecentPostQueryKey);
  });
}
