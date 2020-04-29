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
            <Link href="/">Home</Link> &bull;  
            <Link href="/book">Book</Link>  
            <Link href="/reviewList">Reviews</Link> 
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
        <p>Get in touch: contactATshaukatajmeriDOTcom</p>    
        <ul className={styles.social}>
          <li>
            <a target="_blank" href="http://www.facebook.com/shaukat.ajmeri" title="Follow me on Facebook">
            <i className="fab fa-facebook" aria-hidden="true"></i></a>
          </li>
          <li>
            <a target="_blank" href="http://twitter.com/ShaukatAjmeri" title="Follow me on Twitter">
            <i className="fab fa-twitter" aria-hidden="true"></i></a>
          </li>
          <li>
            <a target="_blank" href="http://instagram.com/shaukat.ajmeri" title="Follow me on Twitter">
            <i className="fab fa-instagram" aria-hidden="true"></i></a>
          </li>
        </ul>
        </div>
      </footer>   
      
    </div>
  )
}

export default BlogLayout
