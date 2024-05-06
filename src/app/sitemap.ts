import { MetadataRoute } from 'next';

interface PostsProps {
  paths: string[];
  success: boolean;
}

export const getPosts = async (): Promise<PostsProps> => {
  return fetch(`${String(process.env.NEXTAUTH_URL)}/api/getSitemap`, {
    next: { revalidate: 60 * 10 },
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Server responded with an error');
      }
      return res.json();
    })
    .catch(e => {
      console.log(e);
      return { paths: [], success: false };
    });
};

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const posts: PostsProps = await getPosts();

  if (!posts.success) {
    return [];
  }

  const postsPath = posts.paths.map(item => ({
    url: `${String(process.env.NEXTAUTH_URL)}/posts/${item}`,
    lastModified: new Date(),
  }));

  return [
    ...postsPath,
    {
      url: `${String(process.env.NEXTAUTH_URL)}`,
      lastModified: new Date(),
    },
    {
      url: `${String(process.env.NEXTAUTH_URL)}/auth/signin`,
      lastModified: new Date(),
    },
    {
      url: `${String(process.env.NEXTAUTH_URL)}/auth/signup`,
      lastModified: new Date(),
    },
    {
      url: `${String(process.env.NEXTAUTH_URL)}/settings`,
      lastModified: new Date(),
    },
    {
      url: `${String(process.env.NEXTAUTH_URL)}/write`,
      lastModified: new Date(),
    },
  ];
};

export default Sitemap;
