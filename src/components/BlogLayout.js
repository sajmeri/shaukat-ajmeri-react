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
// import styles from './BlogLayout.module.css'
import styles from './Styles.module.css'

function BlogLayout({ blogRoot, isViewingIndex }) {
  let loadingRoute = useLoadingRoute()

  return (
    <div className={styles.outer}>
      <div className={styles.masthead}>
        <div className={styles.container}>
          <header>
            <h3 className={styles.title}>
              <Link href="/">{siteMetadata.title}</Link>
            </h3>
          </header>        
          <nav>
            {/* <Link href="/">Home</Link> &bull;  */}
            <Link href="/blog">Blog</Link> 
            <Link href="/articleList">Articles</Link> 
            <Link href="/book">Book</Link>  
            <Link href="/about">About</Link> 
            {/* <Link href="/tags">Tags</Link>{' '} */}
            <Link href="/contact">Contact</Link>          
          </nav>
        </div>      
      </div>
      
      <div className={styles.container}>
        <main>
          <NotFoundBoundary render={() => <NotFoundPage />}>
            <View />
          </NotFoundBoundary>
        </main>       
      </div>
      
      <footer className={styles.footer}>
        <div className={styles.container}>        
          <Link href="/blog">Blog</Link> &bull;
          <Link href="/articleList">Articles</Link> &bull; 
          <Link href="/book">Book</Link> &bull; 
          <Link href="/about">About</Link> &bull; 
          {/* <Link href="/tags">Tags</Link>{' '} */}
          <Link href="/contact">Contact</Link> &bull; 
        </div>
      </footer>   
      
    </div>
  )
}

export default BlogLayout
