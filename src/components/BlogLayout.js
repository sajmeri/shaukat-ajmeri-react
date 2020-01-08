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
            <Link href="/book">Book</Link>  
            {/* <Link href="/about">About</Link>  */}
            <Link href="/blog">Blog</Link> 
            <Link href="/articleList">Articles</Link> 
            {/* <Link href="/tags">Tags</Link>{' '} */}
            {/* <Link href="/contact">Contact</Link>           */}
          </nav>
        </div>      
      </div>
      
      <div className={styles.container}>
        <div>
          <NotFoundBoundary render={() => <NotFoundPage />}>
            <View />
          </NotFoundBoundary>
        </div>
            
      </div>
      
      <footer className={styles.mainFooter}>
        <div className={styles.container}>        
        <ul className="social"><li><a target="_blank" href="http://www.facebook.com/" className="Facebook" title="Follow me on Facebook"><span className="fa-stack fa-1x"><i className="fa fa-circle fa-stack-2x coral"></i><i className="fa fa-facebook fa-stack-1x fa-inverse" aria-hidden="true"></i></span></a></li><li><a target="_blank" href="http://twitter.com/yogaspacect" className="Twitter" title="Follow us on Twitter"><span className="fa-stack fa-sm"><i className="fa fa-circle fa-stack-2x coral"></i><i className="fa fa-twitter fa-stack-1x fa-inverse" aria-hidden="true"></i></span></a></li></ul>
        </div>
      </footer>   
      
    </div>
  )
}

export default BlogLayout
