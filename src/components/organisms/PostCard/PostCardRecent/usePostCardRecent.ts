import { useRouter } from 'next/navigation';

import { PostCardProps } from './PostCardRecent';

export function usePostCardRecent(props: PostCardProps) {
  const router = useRouter();

  const direction = props.direction === undefined ? 'row' : props.direction;
  const variant = props.variant;
  const mvPath =
    variant === 'folder'
      ? `/posts/${props.path}`
      : `/posts/${props.path?.replace(/\/([^\/]*)$/, '?title=$1')}`;

  const thumnail = props.thumbnail ?? '';

  const imageUrl = thumnail === '' ? '/image/NoPhoto.png' : thumnail;

  return {
    router,
    direction,
    variant,
    mvPath,
    thumnail,
    imageUrl,
  };
}
