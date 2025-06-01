import { getPostData, getSortedPostsData } from '@/lib/posts';
import { marked } from 'marked';
import Link from 'next/link';
import styles from './page.module.css';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  console.log('PARAMS:', posts.map((p) => p.slug));
  return posts.map((post) => ({
    slug: post.slug,
  }));
}



export async function generateMetadata({ params }) {
  const post = await getPostData(params.slug);

  return {
    title: post.title,
    description: post.excerpt || '', // optional
  };
}


export default async function PostPage({ params }) {
  const post = await getPostData(params.slug);
  console.log(generateStaticParams());

  return (
    <div style={{ padding: '2rem' }}>
      <Link href="/blog" style={{ color: 'blue', textDecoration: 'underline' }}>Back</Link>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{post.title}</h1>
      <div style={{ color: 'gray', marginBottom: '1rem' }}>{post.date}</div>
      <div
        dangerouslySetInnerHTML={{ __html: marked(post.content) }}
        style={{ lineHeight: '1.6' }}
      />
    </div>
  );
}
