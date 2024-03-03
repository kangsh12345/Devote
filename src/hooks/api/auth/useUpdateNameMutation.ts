import { httpPostClient } from '@/src/utils/client';
import { useMutation } from '@tanstack/react-query';

export const UpdateNameMutationKey = '/api/auth/updateName';

export interface UpdateNameMutationRequest {
  name: string;
}

export interface UpdateNameMutationResponse {
  message: string;
  success: boolean;
}

export function useUpdateNameMutation() {
  return useMutation(
    [UpdateNameMutationKey],
    async (name: UpdateNameMutationRequest) =>
      await httpPostClient<UpdateNameMutationResponse>(
        UpdateNameMutationKey,
        name,
      ),
  );
}
