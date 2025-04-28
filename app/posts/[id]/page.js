import { getPostData, getAllPostIds } from '@/lib/posts';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getAllPostIds();
  return posts.map((post) => ({ id: post.id }));
}

export default async function PostPage({ params }) {
  const post = await getPostData(params.id);

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
