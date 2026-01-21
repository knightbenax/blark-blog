'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function PostFeed({ posts }) {
  const postsPerPage = 15;
  const featuredPost = posts[0];
  const restPosts = posts.slice(1);

  // Initialize with the first batch of posts so they are visible immediately (SSR compatible)
  const [displayedPosts, setDisplayedPosts] = useState(restPosts.slice(0, postsPerPage));
  const [hasMore, setHasMore] = useState(restPosts.length > postsPerPage);
  const [page, setPage] = useState(1);

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
  }, [hasMore, page, restPosts]);

  function loadMore() {
    const nextBatch = restPosts.slice(page * postsPerPage, (page + 1) * postsPerPage);
    
    if (nextBatch.length > 0) {
      setDisplayedPosts((prev) => [...prev, ...nextBatch]);
      setPage((prev) => prev + 1);
    }
    
    if (displayedPosts.length + nextBatch.length >= restPosts.length) {
      setHasMore(false);
    }
  }

  if (!featuredPost) return null;

  return (
    <>
      <div className={styles.featured}>
        
        <Link href={`/${featuredPost.slug}`} className={styles.featuredpost}>
        <img src={featuredPost.header} className={styles.featuredheader} alt={featuredPost.title} />
          <div className={styles.featuredheaderinner}>
            <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
            <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
          </div>
        </Link>
      </div>

      <ul className={styles.wordings}>
        {displayedPosts.map(({ slug, title, excerpt, header }) => (
          <li key={slug} className={styles.singlewordings}>
            <Link href={`/${slug}`}>
              <img src={header} className={styles.singlewordingsheader} alt={title} />
              <div className={styles.singlewordingstitle}>{title}</div>
              <div style={{ color: 'gray' }} className={styles.singlewordingsbrief}>{excerpt}</div>
            </Link>
          </li>
        ))}
        <li className={styles.singlewordings}></li>
      </ul>
    </>
  );
}