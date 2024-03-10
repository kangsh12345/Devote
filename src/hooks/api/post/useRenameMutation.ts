import { httpPostClient } from '@/src/utils/client';
import { useMutation } from '@tanstack/react-query';

export const RenameMutationKey = 'api/post/rename';

export interface RenameMutationRequest {
  path: string;
  newPath: string;
}

export interface RenameMutationResponse {
  success: boolean;
}

export function useRenameMutation() {
  return useMutation(
    [RenameMutationKey],
    async (path: RenameMutationRequest) =>
      await httpPostClient<RenameMutationResponse>(RenameMutationKey, path),
  );
}
