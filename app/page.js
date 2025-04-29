'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { basePath } from '@/lib/utils';

async function fetchPosts() {
  const res = await fetch(`${basePath}/api/posts`);
  const data = await res.json();
  return data;
}

export default function HomePage() {
  const [allPosts, setAllPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const postsPerPage = 15;

  useEffect(() => {
    async function loadPosts() {
      const posts = await fetchPosts();
      setAllPosts(posts);
      setDisplayedPosts(posts.slice(0, postsPerPage));
    }
    loadPosts();
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        hasMore
      ) {
        loadMore();
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayedPosts, hasMore]);

  function loadMore() {
    const nextPosts = allPosts.slice(page * postsPerPage, (page + 1) * postsPerPage);
    setDisplayedPosts((prev) => [...prev, ...nextPosts]);
    setPage((prev) => prev + 1);
    if (nextPosts.length < postsPerPage) {
      setHasMore(false);
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>My Blog</h1>
      <ul>
        {displayedPosts.map(({ slug, title, date }) => (
          <li key={slug} style={{ margin: '1rem 0' }}>
            <Link href={`${basePath}/${slug}`} style={{ color: 'blue', textDecoration: 'underline' }}>
              {title}
            </Link>
            <div style={{ fontSize: '0.8rem', color: 'gray' }}>{date}</div>
          </li>
        ))}
      </ul>
      {!hasMore && (
        <div style={{ textAlign: 'center', marginTop: '2rem', color: 'gray' }}>
          You've reached the end 🎉
        </div>
      )}
    </div>
  );
}
