import React from 'react'
import { Link } from 'react-navi'
import ArticleMeta from './ArticleMeta'
// import styles from './ArticleSummary.module.css'
import styles from './Styles.module.css'
function ArticleSummary({ blogRoot, route }) {
  return (
    <article className={styles.ArticleSummary}>
      <h2><Link href={route.url.href}>{route.title}</Link></h2>
      <ArticleMeta blogRoot={blogRoot} meta={route.data} byline={route.data.byline} />     
      <p>{route.data.spoiler} <Link className={styles.more} href={route.url.href}>Read more &rarr;</Link></p>
    </article>
  )
}

export default ArticleSummary