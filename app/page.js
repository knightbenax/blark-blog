import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export default async function HomePage() {
  const posts = getSortedPostsData();

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>My Blog</h1>
      <ul>
        {posts.map(({ slug, title, date }) => (
          <li key={slug} style={{ margin: '1rem 0' }}>
            <Link href={`/blog/${slug}`} style={{ color: 'blue', textDecoration: 'underline' }}>
              {title}
            </Link>
            <div style={{ fontSize: '0.8rem', color: 'gray' }}>{date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
