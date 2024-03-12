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

// TODO: Rename시 데이터 프리패칭할 수 있도록 변경
