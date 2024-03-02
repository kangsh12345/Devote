import { httpPostClient } from '@/src/utils/client';
import { useMutation } from '@tanstack/react-query';

export const EmailCheckMutationKey = '/api/auth/sign-up/email/check/email';

export interface EmailCheckMutationRequest {
  email: string;
}

export interface EmailCheckMutationResponse {
  success: boolean;
  message: string;
}

export function useEmailCheckMutation() {
  return useMutation(
    [EmailCheckMutationKey],
    async (email: EmailCheckMutationRequest) =>
      await httpPostClient<EmailCheckMutationResponse>(
        '/api/auth/sign-up/email/check/email',
        email,
      ),
  );
}
