import { httpPostClient } from '@/src/utils/client';
import { DirectoryTreeProps } from '@/src/utils/fs';
import { useMutation } from '@tanstack/react-query';

export const GetDirectoryKey = '/api/post/getDirectory';

export interface GetDirectoryRequest {
  path: string;
}

export interface GetDirectoryResponse {
  tree: DirectoryTreeProps[] | undefined;
  success: boolean;
  userName: string | null | undefined;
}

export function useGetDirectoryMutation() {
  return useMutation(
    [GetDirectoryKey],
    async (path: GetDirectoryRequest) =>
      await httpPostClient<GetDirectoryResponse>(GetDirectoryKey, path),
  );
}
