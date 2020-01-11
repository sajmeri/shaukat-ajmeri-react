import React from 'react'
import { Link } from 'react-navi'
import siteMetadata from '../siteMetadata'
import ArticleSummary from './ArticleSummary'
// import Bio from './Bio'
import Pagination from './Pagination'
// import styles from './BlogIndexPage.module.css'
import styles from './Styles.module.css'

function BlogIndexPage({ blogRoot, pageCount, pageNumber, postRoutes }) {
  
  const pageHeadingArray=postRoutes[0].url.pathname.split("/");
  const category = pageHeadingArray[1]=="articles"  ?"Articles" : "Blog"
  return (
    <div>      
     <h1 className={styles.category}>{category}</h1>
      {/* <Bio /> */}
      <ul className={styles.articlesList}>
        {postRoutes.map(route => (
          <li key={route.url.href}>
            <ArticleSummary blogRoot={blogRoot} route={route} />
          </li>
        ))}
      </ul>
      {pageCount > 1 && (
        <Pagination
          blogRoot={blogRoot}
          pageCount={pageCount}
          pageNumber={pageNumber}
        />
      )}
    
    </div>
  )
}

export default BlogIndexPage
