import { httpPostClient } from '@/src/utils/client';
import { useMutation } from '@tanstack/react-query';

export const PostWriteMutationKey = '/api/post/write';

export interface PostWriteMutationRequest {
  id: Number;
  path: string;
  newPath: string;
  thumbnail: string;
  title: string;
  subTitle: string;
  md: string;
  date: Date;
}

export interface PostWriteMutationResponse {
  success: boolean;
  message: string;
}

export function usePostWriteMutation() {
  return useMutation(
    [PostWriteMutationKey],
    async ({
      id,
      path,
      newPath,
      thumbnail,
      title,
      subTitle,
      md,
      date,
    }: PostWriteMutationRequest) =>
      await httpPostClient<PostWriteMutationResponse>(PostWriteMutationKey, {
        id,
        path,
        newPath,
        thumbnail,
        title,
        subTitle,
        md,
        date,
      }),
  );
}
