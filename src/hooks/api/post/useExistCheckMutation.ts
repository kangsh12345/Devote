import { httpPostClient } from '@/src/utils/client';
import { useMutation } from '@tanstack/react-query';

export const ExistCheckMutationKey = '/api/post/existCheck';

export interface ExistCheckMutationRequest {
  path: string;
}

export interface ExistCheckMutationResponse {
  success: boolean;
  exist: boolean;
}

export function useExistCheckMutation() {
  return useMutation(
    [ExistCheckMutationKey],
    async (path: ExistCheckMutationRequest) =>
      await httpPostClient<ExistCheckMutationResponse>(
        ExistCheckMutationKey,
        path,
      ),
  );
}
