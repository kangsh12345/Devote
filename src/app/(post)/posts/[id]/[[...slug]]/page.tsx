import { PostSidePage } from '@/src/components/templates/PostSidePage/PostSidePage';

interface IProductDetailPageParams {
  params: {
    id: string;
    slug?: string[];
  };
  searchParams: { title: string };
}

interface ItemMetadata {
  title: string;
  subTitle: string;
  thumbnail: string;
}

export async function generateMetadata({
  params,
  searchParams,
}: IProductDetailPageParams) {
  const { id, slug } = params;
  const arr = [id, ...(slug ?? []), searchParams.title ?? ''].join('/');

  if (!searchParams.title) {
    return {
      generator: 'Devote',
      title: decodeURIComponent(
        decodeURIComponent([id, ...(slug ?? [])].pop() ?? ''),
      ),
      openGraph: {
        title: decodeURIComponent(
          decodeURIComponent([id, ...(slug ?? [])].pop() ?? ''),
        ),
        sitName: 'Devote',
        images: '/image/icon.svg',
        type: 'website',
      },
    };
  }

  const apiUrl = `${String(
    process.env.NEXTAUTH_URL,
  )}/api/post/getMetadata?fullPath=${encodeURIComponent(arr)}`;

  const { title, subTitle, thumbnail }: ItemMetadata = await fetch(apiUrl).then(
    res => res.json(),
  );

  return {
    generator: 'Devote',
    title: title,
    description: subTitle,
    openGraph: {
      title: title,
      description: subTitle,
      sitName: 'Devote',
      images: { thumbnail },
      type: 'website',
    },
  };
}

export default function PostPage() {
  return <PostSidePage />;
}
