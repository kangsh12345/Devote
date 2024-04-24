import { MetadataRoute } from 'next';

interface PostsProps {
  paths: string[];
  success: boolean;
}

export const getPosts = () => {
  return fetch(`${String(process.env.NEXTAUTH_URL)}/api/getSitemap`, {
    next: { revalidate: 60 * 10 },
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject();
      }
      return res.json();
    })
    .catch(() => {
      return [];
    });
};

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const posts: PostsProps = await getPosts();

  const postsPath = posts.paths.map(item => ({
    url: `${process.env.NEXTAUTH_URL}/posts/${item}`,
    lastModified: new Date(),
  }));

  return [
    ...postsPath,
    {
      url: `${process.env.NEXTAUTH_URL}`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXTAUTH_URL}/auth/signin`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXTAUTH_URL}/auth/signup`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXTAUTH_URL}/settings`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXTAUTH_URL}/write`,
      lastModified: new Date(),
    },
  ];
};

export default Sitemap;
