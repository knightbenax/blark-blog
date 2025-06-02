import { getPostData, getSortedPostsData } from '@/lib/posts';
import { marked } from 'marked';
import Link from 'next/link';
import styles from './page.module.css';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
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

  return (
    <div style={{ padding: '2rem' }} className={styles.singleblogpost}>
      <Link href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Back</Link>
      
     <div className={styles.singleblogpostsize}>
       <h1 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '5px' }}>{post.title}</h1>
      <div style={{ color: 'gray', marginBottom: '1rem' }}>{post.date}</div>
     </div>
      <img src={post.header} className={styles.singleblogpostheader}/>
      <div
        className={styles.singleblogpostcontent}
        dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
        style={{ lineHeight: '1.6' }}
      />
    </div>
  );
}
