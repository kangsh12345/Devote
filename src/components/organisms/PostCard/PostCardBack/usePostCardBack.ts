import { useRouter } from 'next/navigation';

import { PostCardProps } from './PostCardBack';

export function usePostCardBack(props: PostCardProps) {
  const router = useRouter();

  const direction = props.direction === undefined ? 'row' : props.direction;
  const variant = props.variant;
  const mvPath =
    variant === 'folder'
      ? `/posts/${props.path}`
      : `/posts/${props.path?.replace(/\/([^\/]*)$/, '?title=$1')}`;

  return { router, direction, variant, mvPath };
}
