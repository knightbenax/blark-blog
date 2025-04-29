import { getPostData, getSortedPostsData } from '@/lib/posts';
import { marked } from 'marked';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }) {
  const post = getPostData(params.slug);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{post.title}</h1>
      <div style={{ color: 'gray', marginBottom: '1rem' }}>{post.date}</div>
      <div
        dangerouslySetInnerHTML={{ __html: marked(post.content) }}
        style={{ lineHeight: '1.6' }}
      />
    </div>
  );
}
