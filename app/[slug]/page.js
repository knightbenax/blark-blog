import { getPostData, getSortedPostsData } from '@/lib/posts';
import { marked } from 'marked';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostData(slug);
  const siteUrl = 'https://blark.app';
  const ogImage = post.header?.startsWith('http') ? post.header : `${siteUrl}${post.header}`;

  return {
    title: `${post.title} | Blark's Blog`,
    description: post.excerpt || post.content.slice(0, 160).replace(/\n/g, ' '),
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    referrer: 'origin-when-cross-origin',
    keywords: post.tags,
    authors: [
      { name: 'Blark Team', url: 'https://blark.app/blog' }
    ],
    openGraph: {
      url: `${siteUrl}/blog/${post.slug}`,
      siteName: 'Monochrome Journal',
      images: [
        {
          url: ogImage,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description:  post.excerpt || post.content.slice(0, 160).replace(/\n/g, ' '),
      images: [ogImage],
    },
  };
}


export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostData(slug);

  return (
    <div className={styles.singleblogpost}>
      


<div className="header-floater-parent">
        <img src="/blog/assets/logo.png" alt="Blark Logo" />
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
      <div className={styles.singleblogpostheader}>
        <Image 
          src={post.header} 
          alt={post.title}
          fill
          priority
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>
      <div
        className={styles.singleblogpostcontent}
        dangerouslySetInnerHTML={{ __html: marked.parse(post.content) }}
        style={{ lineHeight: '1.6' }}
      />
    </div>
  );
}
