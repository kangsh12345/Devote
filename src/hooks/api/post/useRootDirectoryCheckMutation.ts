import { httpPostClient } from '@/src/utils/client';
import { useMutation } from '@tanstack/react-query';

export const RootDirectoryCheckMutationKey = '/api/post/rootDirectoryCheck';

export interface RootDirectoryCheckMutationRequest {
  dirName: string;
}

export interface RootDirectoryCheckMutationResponse {
  success: boolean;
  message: string;
}

export function useRootDirectoryCheckMutation() {
  return useMutation(
    [RootDirectoryCheckMutationKey],
    async (dirName: RootDirectoryCheckMutationRequest) =>
      await httpPostClient<RootDirectoryCheckMutationResponse>(
        RootDirectoryCheckMutationKey,
        dirName,
      ),
  );
}
