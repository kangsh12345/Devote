import { httpPostClient } from '@/src/utils/client';
import { useMutation } from '@tanstack/react-query';

export const GetFileMutationKey = '/api/post/getFile';

export interface GetFileMutationRequest {
  path: string;
}

export interface GetFileMutationResponse {
  success: boolean;
  exist: boolean;
  data:
    | {
        contentHtml: string;
        content: string;
        date: Date;
        title: string;
        subTitle: string | null;
        postId: number | null;
        name: string | null;
      }
    | undefined;
  message: string;
}

export function useGetFileMutation() {
  return useMutation(
    [GetFileMutationKey],
    async (path: GetFileMutationRequest) =>
      await httpPostClient<GetFileMutationResponse>(GetFileMutationKey, path),
  );
}
