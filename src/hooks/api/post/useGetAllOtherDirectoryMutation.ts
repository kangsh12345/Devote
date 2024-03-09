import { httpPostClient } from '@/src/utils/client';
import { TreeProps } from '@/src/utils/fs';
import { useMutation } from '@tanstack/react-query';

export const GetAllOtherDirectoryMutationKey = '/api/post/getAllOtherDirectory';

export interface GetAllOtherDirectoryMutationRequest {
  path: string;
}

export interface GetAllOtherDirectoryMutationResponse {
  success: boolean;
  tree: TreeProps;
  message: string;
}

export function useGetAllOtherDirectoryMutation() {
  return useMutation(
    [GetAllOtherDirectoryMutationKey],
    async (path: GetAllOtherDirectoryMutationRequest) =>
      await httpPostClient<GetAllOtherDirectoryMutationResponse>(
        GetAllOtherDirectoryMutationKey,
        path,
      ),
  );
}
