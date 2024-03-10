import { httpPostClient } from '@/src/utils/client';
import { useMutation } from '@tanstack/react-query';

export const RemoveFileMutationKey = '/api/post/remove';

export interface RemoveFIleMutatioonRequest {
  path: string;
  type: 'file' | 'folder';
}

export interface RemoveFileMutationResponse {
  success: boolean;
}

export function useRemoveFileMutation() {
  return useMutation(
    [RemoveFileMutationKey],
    async ({ path, type }: RemoveFIleMutatioonRequest) =>
      await httpPostClient<RemoveFileMutationResponse>(RemoveFileMutationKey, {
        path,
        type,
      }),
  );
}
