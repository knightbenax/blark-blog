'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css'
import {format} from 'date-fns'

async function fetchPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/api/posts`); //fetch('/api/posts');
  const data = await res.json();
  return data;
}


export default function HomePage() {
  const [allPosts, setAllPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [featuredPost, setFeaturedPost] = useState(null);
  const postsPerPage = 15;



  useEffect(() => {
    document.title = "Blark's Blog";
    async function loadPosts() {
      const posts = await fetchPosts();
      if (posts.length === 0) return;
      const [featured, ...rest] = posts;
      setFeaturedPost(featured);
      setAllPosts(rest);
      setDisplayedPosts(rest.slice(0, postsPerPage));
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
    <div className={styles.container}>
      <div className="header-floater-parent">
        <img src="/blog/assets/logo.png" />
        <div className="header-floater">
          <a className="hfeatures" href="https://blark.app/#features" target="_blank">Features</a>
          <a className="hpricing"
            href="https://drive.google.com/drive/folders/1BQr_MKV7GN0_zk0lbsPT2e1w9_C5m5wC?usp=drive_link"
            target="_blank">Press Kit</a>
          <a className="hsupport" href="mailto:blark@jiti.io" target="_blank">Support</a>
          <a href="https://apps.apple.com/us/app/blark-pro-black-white-camera/id6742157071" className="free">Download Blark</a>
        </div>
      </div>


      <div className={styles.blogheadliner}>
        <span className={styles.blogtitle}>Monochrome Journal</span>
        <div className={styles.blogtag}>
          Tips on how to get the most out of<br/>
your black and white photography
        </div>
      </div>

{featuredPost && (
  <div className={styles.featured}>
    <img src={featuredPost.header} className={styles.featuredheader}/>
    <Link href={`/${featuredPost.slug}`} className={styles.featuredpost}>
     <div className={styles.featuredheaderinner}>
       <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
      {/* <div className={styles.featuredDate}>
        {format(new Date(featuredPost.date), "EEEE, MMMM do yyyy")}
      </div> */}
      <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
     </div>
    </Link>
  </div>
)}

      <ul className={styles.wordings}>
        {displayedPosts.map(({ slug, title, date, excerpt, header }) => (
          <li key={slug}  className={styles.singlewordings}>
            <Link href={`/${slug}`} >
            <img src={header} className={styles.singlewordingsheader}/>
              <div className={styles.singlewordingstitle}>{title}</div>
               {/* <div style={{ fontSize: '0.8rem', color: 'gray' }}>
                {format(new Date(date), "EEEE, MMMM do yyyy")}
                </div> */}
            <div style={{  color: 'gray' }} className={styles.singlewordingsbrief}>{excerpt}</div>
            </Link>
          </li>
        ))}
      </ul>
      {/* {!hasMore && (
        <div style={{ textAlign: 'center', marginTop: '2rem', color: 'gray' }}>
          You've reached the end 🎉
        </div>
      )} */}
    </div>
  );
}
