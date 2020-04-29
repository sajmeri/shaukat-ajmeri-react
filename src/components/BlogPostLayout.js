import React from 'react'
import { Link, useCurrentRoute, useView } from 'react-navi'
import { MDXProvider } from '@mdx-js/react'
import ArticleMeta from './ArticleMeta'
import styles from './Styles.module.css'

function BlogPostLayout({ blogRoot }) {
  let { title, data, url } = useCurrentRoute()
  let { connect, content, head } = useView()
  let { MDXComponent, readingTime } = content
  console.log(data);
  // The content for posts is an MDX component, so we'll need
  // to use <MDXProvider> to ensure that links are rendered
  // with <Link>, and thus use pushState.
  return connect(
    <>
      {head}
      <article>
        <div>
          <h1>
            {title}
          </h1>
          <ArticleMeta
            blogRoot={blogRoot}
            meta={data}
            readingTime={readingTime}
            byline={data.byline}
          />
        </div>
        <MDXProvider components={{
          a: Link,
          wrapper: ({ children }) =>
            <div className={styles.content}>
              {children}
            </div>
        }}>
          <MDXComponent />
        </MDXProvider>
        <footer className={styles.footer}>
          <section className={styles.links}>
            {
              data.previousDetails &&
              <Link className={styles.previous} href={data.previousDetails.href}>
                ← {data.previousDetails.title}
              </Link>
            }
            {
              data.nextDetails &&
              <Link className={styles.next} href={data.nextDetails.href}>
                {data.nextDetails.title} →
              </Link>
            }
          </section>
        </footer>
      </article>
    </>
  )
}

export default BlogPostLayout