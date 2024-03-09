import { httpPostClient } from '@/src/utils/client';
import { useMutation } from '@tanstack/react-query';

export const CreateDirectoryMutationKey = '/api/post/createDirectory';

export interface CreateDirectoryMutationRequest {
  id: string;
  name: string;
  dirName: string;
  type: 'folder' | 'file' | 'rootDirectory';
}

export interface CreateDirectoryMutationResponse {
  success: boolean;
  exist: boolean;
  message: 'valid false' | 'create success' | 'exist';
}

export function useCreateDirectoryMutation() {
  return useMutation(
    [CreateDirectoryMutationKey],
    async ({ id, name, dirName, type }: CreateDirectoryMutationRequest) =>
      await httpPostClient<CreateDirectoryMutationResponse>(
        CreateDirectoryMutationKey,
        { id, name, dirName, type },
      ),
  );
}
