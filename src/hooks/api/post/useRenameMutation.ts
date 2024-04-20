import { httpPostClient } from '@/src/utils/client';
import { TreeProps } from '@/src/utils/fs';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  GetAllDirectoryQueryKey,
  GetAllDirectoryQueryResponse,
} from './useGetAllDirectoryQuery';

export const RenameMutationKey = 'api/post/rename';

export interface RenameMutationRequest {
  path: string;
  newPath: string;
}

export interface RenameMutationResponse {
  success: boolean;
  message: string;
}

export function useRenameMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    [RenameMutationKey],
    async (path: RenameMutationRequest) =>
      await httpPostClient<RenameMutationResponse>(RenameMutationKey, path),

    {
      onMutate: async ({ path, newPath }) => {
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

            const renameItem = (
              t: TreeProps,
              targetPath: string,
              newNamePath: string,
            ) => {
              if (t.path === targetPath) {
                return {
                  ...t,
                  path: newNamePath,
                  name: newNamePath.split('/').pop()?.replace('.md', '') || '',
                };
              } else {
                const updatedChildren: TreeProps[] = t.children.map(child =>
                  renameItem(child, targetPath, newNamePath),
                );
                return {
                  ...t,
                  children: updatedChildren,
                };
              }
            };

            const change = renameItem(
              newTree ?? {
                path: '',
                name: '',
                type: 'folder',
                createdAt: new Date(),
                children: [],
              },
              path,
              newPath,
            );

            const newResult: GetAllDirectoryQueryResponse = {
              success: old?.success ?? true,
              tree: {
                path: old?.tree?.path ?? '',
                name: old?.tree?.name ?? '',
                type: old?.tree?.type ?? 'folder',
                createdAt: old?.tree?.createdAt ?? new Date(),
                children: change.children,
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
