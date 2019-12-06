import React from 'react'
import {
  View,
  Link,
  NotFoundBoundary,
  useLoadingRoute,
} from 'react-navi'
import siteMetadata from '../siteMetadata'
import NotFoundPage from './NotFoundPage'
import LoadingIndicator from './LoadingIndicator'
import styles from './BlogLayout.module.css'

function BlogLayout({ blogRoot, isViewingIndex }) {
  let loadingRoute = useLoadingRoute()

  return (
    <div className={styles.container}>
      <LoadingIndicator active={!!loadingRoute} />

      {// Don't show the header on index pages, as it has a special header.
      // !isViewingIndex && (
        <header>
          <h3 className={styles.title}>
            <Link href="/">{siteMetadata.title}</Link>
          </h3>
        </header>
      // )
      }
      <div>
        {/* <Link href="/">Home</Link> &bull;  */}
        <Link href="/blog">Blog</Link> &bull;
        <Link href="/articleList">Articles</Link> &bull;
        <Link href="/book">Book</Link> &bull; 
        <Link href="/about">About</Link> &bull; 
        {/* <Link href="/tags">Tags</Link>{' '} */}
        <Link href="/about">Contact</Link> &bull;          
      </div>
      <main>
        <NotFoundBoundary render={() => <NotFoundPage />}>
          <View />
        </NotFoundBoundary>
      </main>
      <footer className={styles.footer}>
        <div>        
          <Link href="/blog">Blog</Link> &bull;
          <Link href="/articleList">Articles</Link> &bull; 
          <Link href="/book">Book</Link> &bull; 
          <Link href="/about">About</Link> &bull; 
          {/* <Link href="/tags">Tags</Link>{' '} */}
          <Link href="/about">Contact</Link> &bull; 
        </div>
      </footer>
    </div>
  )
}

export default BlogLayout
