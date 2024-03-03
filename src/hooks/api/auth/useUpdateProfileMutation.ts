import { httpPostClient } from '@/src/utils/client';
import { useMutation } from '@tanstack/react-query';

export const UpdateProfileMutationKey = '/api/auth/updateProfile';

export interface UpdateProfileMutationRequest {
  url: string;
}

export interface UpdateProfileMutationResponse {
  message: string;
  success: boolean;
}

export function useUpdateProfileMutation() {
  return useMutation(
    [UpdateProfileMutationKey],
    async (url: UpdateProfileMutationRequest) =>
      await httpPostClient<UpdateProfileMutationResponse>(
        UpdateProfileMutationKey,
        url,
      ),
  );
}
