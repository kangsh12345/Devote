import { httpPostClient } from '@/src/utils/client';
import { TreeProps } from '@/src/utils/fs';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  GetAllDirectoryQueryKey,
  GetAllDirectoryQueryResponse,
} from './useGetAllDirectoryQuery';

export const RemoveFileMutationKey = '/api/post/remove';

export interface RemoveFileMutatioonRequest {
  path: string;
  type: 'file' | 'folder';
}

export interface RemoveFileMutationResponse {
  success: boolean;
  message: string;
}

export function useRemoveFileMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    [RemoveFileMutationKey],
    async ({ path, type }: RemoveFileMutatioonRequest) =>
      await httpPostClient<RemoveFileMutationResponse>(RemoveFileMutationKey, {
        path,
        type,
      }),
    {
      onMutate: async ({ path }) => {
        await queryClient.cancelQueries([GetAllDirectoryQueryKey]);

        const previous = queryClient.getQueryData([GetAllDirectoryQueryKey]);

        queryClient.setQueryData<GetAllDirectoryQueryResponse>(
          [GetAllDirectoryQueryKey],
          old => {
            path = path.replace('.md', '');

            const newTree: TreeProps | undefined = old
              ? old.tree
              : {
                  path: '',
                  name: '',
                  type: 'folder',
                  createdAt: new Date(),
                  children: [],
                };

            const removeItem = (t: TreeProps, targetPath: string) => {
              let filteredChildren = t.children.filter(
                child => child.path !== targetPath,
              );
              filteredChildren = filteredChildren.map(child => ({
                ...child,
                children: removeItem(child, targetPath),
              }));

              return filteredChildren;
            };

            const change = removeItem(
              newTree ?? {
                path: '',
                name: '',
                type: 'folder',
                createdAt: new Date(),
                children: [],
              },
              path,
            );

            const newResult: GetAllDirectoryQueryResponse = {
              success: old?.success ?? true,
              tree: {
                path: old?.tree?.path ?? '',
                name: old?.tree?.name ?? '',
                type: old?.tree?.type ?? 'folder',
                createdAt: old?.tree?.createdAt ?? new Date(),
                children: change,
              },
              message: old?.message ?? 'success',
            };

            return newResult;
          },
        );

        return { previous };
      },
      onSuccess: () => {
        queryClient.invalidateQueries([GetAllDirectoryQueryKey]);
      },
      onError: (__, _, context) => {
        queryClient.setQueryData([GetAllDirectoryQueryKey], context?.previous);
      },
    },
  );
}
