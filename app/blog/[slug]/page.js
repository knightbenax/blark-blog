import { getAllPostSlugs, getPostData } from '@/lib/posts';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostData(params.slug);

  return {
    title: post.title,
    description: post.excerpt || post.contentHtml.slice(0, 150),
    openGraph: {
      title: post.title,
      description: post.excerpt || post.contentHtml.slice(0, 150),
      type: 'article',
      url: `https://blark.app/blog/${post.slug}`
    },
    twitter: {
      card: 'summary_larg_image',
      title: post.title,
      description: post.excerpt || post.contentHtml.slice(0, 150)
    }
  };
}


export default async function PostPage({ params }) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{post.title}</h1>
      <div style={{ fontSize: '0.8rem', color: 'gray', marginBottom: '1rem' }}>{post.date}</div>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}
