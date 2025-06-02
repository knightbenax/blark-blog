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
      


<div className="header-floater-parent">
        <img src="/blog/assets/logo.png" />
        <div className="header-floater">
          <Link href="/" className='hblog' >Back to Blog</Link>
          <a className="hfeatures" href="https://blark.app/#features" target="_blank">Features</a>
          <a className="hpricing"
            href="https://drive.google.com/drive/folders/1BQr_MKV7GN0_zk0lbsPT2e1w9_C5m5wC?usp=drive_link"
            target="_blank">Press Kit</a>
          <a className="hsupport" href="mailto:blark@jiti.io" target="_blank">Support</a>
          <a href="https://apps.apple.com/us/app/blark-pro-black-white-camera/id6742157071" className="free">Download Blark</a>
        </div>
      </div>

      
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
