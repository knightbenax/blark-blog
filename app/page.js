import styles from './page.module.css'
import PostFeed from './PostFeed';
import { getSortedPostsData } from '@/lib/posts';

export const metadata = {
  title: "Blark's Blog",
};

export default function HomePage() {
  // Fetch data directly on the server
  const posts = getSortedPostsData();
  
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

      <PostFeed posts={posts} />
    </div>
  );
}
