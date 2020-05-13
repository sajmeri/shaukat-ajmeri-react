import React from 'react'
import { Link } from 'react-navi'
import siteMetadata from '../siteMetadata'
import ArticleSummary from './ArticleSummary'
// import Bio from './Bio'
import Pagination from './Pagination'
// import styles from './BlogIndexPage.module.css'
import styles from './Styles.module.css'

function RevuewsIndexPage({ blogRoot, pageCount, pageNumber, postRoutes }) {
  
  const pageHeadingArray=postRoutes[0].url.pathname.split("/");
  
  let pageHeadingCapitalized = pageHeadingArray[1].charAt(0).toUpperCase() + pageHeadingArray[1].slice(1)
  
  const category = pageHeadingCapitalized;
  return (
    <div>      
     <h1 className={styles.category}>{category}</h1>
     <div className={styles.maincontent}>
      <section className={styles.main}>
      
      <ul className={styles.articlesList}>
        {postRoutes.map(route => (
          <li key={route.url.href}>
            <ArticleSummary blogRoot={blogRoot} route={route} />
          </li>
        ))}
      </ul>
      {pageCount > 1 && pageHeadingArray[1]!=="reviews" && (
        <Pagination
          blogRoot={blogRoot}
          pageCount={pageCount}
          pageNumber={pageNumber}
        />
      )}
        </section>
        <aside className={styles.sidebar}>
        <h2>Share your thoughts</h2>
           <p>Have your read <em>Keepers of the Faith</em>? Did you like it? Let other readers know what you think. Please review the book on <strong><a target="_blank" href="https://www.goodreads.com/book/show/44334120-keepers-of-the-faith">Goodreads</a></strong> and <strong><a target="_blank" href="https://www.amazon.ca/Keepers-Faith-Shaukat-Ajmeri/dp/1988449960/ref=sr_1_1?keywords=shaukat+ajmeri&qid=1577406528&s=books&sr=1-1">Amazon</a></strong>. Discuss it on <strong><a target="_blank" href="https://www.facebook.com/keepersofthefaith2020/">Facebook</a></strong></p> 
        <h2>Order your copy</h2>
        <p>The book is availabe at your favourite independent bookstore and other online stores.</p>
        <p><a target="_blank" href="https://www.mawenzihouse.com/product/keepers-of-the-faith/">Mawenzi House</a> is offering a 20% discount (code: STAYHOME) and a free eBook.</p>
        <ul className={styles.buttons}>
        <li><a className={styles.button} target="_blank" href="https://www.mawenzihouse.com/product/keepers-of-the-faith/">Mawenzi House</a></li> 
          <li><a className={styles.button} target="_blank" href="https://www.amazon.ca/Keepers-Faith-Shaukat-Ajmeri/dp/1988449960/ref=sr_1_1?keywords=shaukat+ajmeri&qid=1577406528&s=books&sr=1-1">Amazon.ca</a></li>
          <li><a className={styles.button} target="_blank" href="https://www.amazon.com/Keepers-Faith-Shaukat-Ajmeri/dp/1988449960/ref=sr_1_1?keywords=shaukat+ajmeri&qid=1577406528&s=books&sr=1-1">Amazon.com</a></li>
          </ul>
            </aside>
      </div>
    </div>
  )
}

export default RevuewsIndexPage;
