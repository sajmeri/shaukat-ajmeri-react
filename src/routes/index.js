import {
  compose,
  lazy,
  map,
  mount,
  redirect,
  resolve,
  route,
  withContext,
  withView,
} from 'navi'
import React from 'react'
import { join } from 'path'
import { chunk, fromPairs } from 'lodash'
import BlogIndexPage from '../components/BlogIndexPage'
import BlogLayout from '../components/BlogLayout'
import BlogPostLayout from '../components/BlogPostLayout'
import ReviewsIndexPage from '../components/ReviewsIndexPage'
import siteMetadata from '../siteMetadata'
import posts from './posts'
import articles from './articles'
import reviews from './reviews'


// Split the posts into a list of chunks of the given size, and
// then build index pages for each chunk.
let chunks = chunk(posts, siteMetadata.indexPageSize)
let chunkPagePairs = chunks.map((chunk, i) => [
  '/' + (i + 1),
  map(async (req, context) => {
    // Don't load anything when just crawling
    if (req.method === 'HEAD') {
      return route()
    }

    // Get metadata for all pages on this page
    let postRoutes = await Promise.all(
      chunk.map(async post => {
        let href = join(context.blogRoot, 'posts', post.slug)
        return await resolve({
          // If you want to show the page content on the index page, set
          // this to 'GET' to be able to access it.
          method: 'HEAD',
          routes,
          url: href,
        })
      }),
    )

    // Only add a page number to the page title after the first index page.
    let pageTitle = siteMetadata.title + " - Blog";
    // if (i > 0) {
    //   pageTitle += ` – page ${i + 1}`
    // }

    return route({
      title: pageTitle,
      view: (
        <BlogIndexPage
          blogRoot={context.blogRoot}
          pageNumber={i + 1}
          pageCount={chunks.length}
          postRoutes={postRoutes}
        />
      ),
    })
  }),
])

// Split the posts into a list of chunks of the given size, and
// then build index pages for each chunk.
let chunksReviews = chunk(reviews, siteMetadata.indexPageSize)
let chunkReviewsPairs = chunksReviews.map((chunk, i) => [
  '/' + (i + 1),
  map(async (req, context) => {
    // Don't load anything when just crawling
    if (req.method === 'HEAD') {
      return route()
    }

    // Get metadata for all pages on this page
    let reviewRoutes = await Promise.all(
      chunk.map(async review => {
        let href = join(context.blogRoot, 'reviews', review.slug)
        return await resolve({
          // If you want to show the page content on the index page, set
          // this to 'GET' to be able to access it.
          method: 'HEAD',
          routes,
          url: href,
        })
      }),
    )

    // Only add a page number to the page title after the first index page.
    let pageTitle = siteMetadata.title + " - Review";
    // if (i > 0) {
    //   pageTitle += ` – page ${i + 1}`
    // }

    return route({
      title: pageTitle,
      view: (
        <ReviewsIndexPage
          blogRoot={context.blogRoot}
          pageNumber={i + 1}
          pageCount={chunks.length}
          postRoutes={reviewRoutes}
        />
      ),
    })
  }),
])

let artileChunks = chunk(articles, siteMetadata.indexPageSize)
let chunkArticlePagePairs = artileChunks.map((chunk, i) => [
  '/' + (i + 1),
  map(async (req, context) => {
    // Don't load anything when just crawling
    if (req.method === 'HEAD') {
      return route()
    }

    // Get metadata for all pages on this page
    let articleRoutes = await Promise.all(
      chunk.map(async article => {
        let href = join(context.blogRoot, 'articles', article.slug)
        return await resolve({
          // If you want to show the page content on the index page, set
          // this to 'GET' to be able to access it.
          method: 'HEAD',
          routes,
          url: href,
        })
      }),
    )

    // Only add a page number to the page title after the first index page.
    let pageTitle = siteMetadata.title + " - Articles";
    // if (i > 0) {
    //   pageTitle += ` – page ${i + 1}`
    // }

    return route({
      title: pageTitle,
      view: (
        <BlogIndexPage
          blogRoot={context.blogRoot}
          pageNumber={i + 1}
          pageCount={artileChunks.length}
          postRoutes={articleRoutes}
        />
      ),
    })
  }),
])

const routes = compose(
  withContext((req, context) => ({
    ...context,
    blogRoot: req.mountpath || '/',
  })),
  withView((req, context) => {
    // Check if the current page is an index page by comparing the remaining
    // portion of the URL's pathname with the index page paths.
    let isViewingIndex = req.path === '/' || /^\/page\/\d+$/.test(req.path)
    const isPageWithNoSidbar = req.path === '/' ? true : false
    // Render the application-wide layout
    return (
      <BlogLayout isPageWithNoSidbar={isPageWithNoSidbar} blogRoot={context.blogRoot} isViewingIndex={isViewingIndex} />
    )
  }),
  mount({
    // The blog's index pages go here. The first index page is mapped to the
    // root URL, with a redirect from "/page/1". Subsequent index pages are
    // mapped to "/page/n".
    '/blog': chunkPagePairs.shift()[1],
    '/page': mount({
      '/1': redirect((req, context) => context.blogRoot),
      ...fromPairs(chunkPagePairs),
    }),

    // Put posts under "/posts", so that they can be wrapped with a
    // "<BlogPostLayout />" that configures MDX and adds a post-specific layout.
    '/posts': compose(
      withView((req, context) => (
        <BlogPostLayout blogRoot={context.blogRoot} />
      )),
      mount(fromPairs(posts.map(post => ['/' + post.slug, post.getPage]))),
    ),

    // The review's index pages go here. The first index page is mapped to the
    // root URL, with a redirect from "/page/1". Subsequent index pages are
    // mapped to "/page/n".
    '/reviewList': chunkReviewsPairs.shift()[1],
    // '/reviewPage': mount({
    //   '/1': redirect((req, context) => context.blogRoot),
    //   ...fromPairs(chunkReviewsPairs),
    // }),

    // Put posts under "/posts", so that they can be wrapped with a
    // "<BlogPostLayout />" that configures MDX and adds a post-specific layout.
    '/reviews': compose(
      withView((req, context) => (
        <BlogPostLayout blogRoot={context.blogRoot} />
      )),
      mount(fromPairs(reviews.map(review => ['/' + review.slug, review.getPage]))),
    ),

     // The Article's index pages go here. The first index page is mapped to the
    // root URL, with a redirect from "/articlePage/1". Subsequent index pages are
    // mapped to "/page/n".
    '/articleList': chunkArticlePagePairs.shift()[1],
    '/articlePage': mount({
      '/1': redirect((req, context) => context.blogRoot),
      ...fromPairs(chunkArticlePagePairs),
    }),

    // Put articles under "/articles", so that they can be wrapped with a
    // "<BlogPostLayout />" that configures MDX and adds a post-specific layout.
    '/articles': compose(
      withView((req, context) => (
        <BlogPostLayout blogRoot={context.blogRoot} />
      )),
      mount(fromPairs(articles.map(article => ['/' + article.slug, article.getPage]))),
    ),
    // Miscellaneous pages can be added directly to the root switch.
    '/tags': lazy(() => import('./tags')),
    '/about': lazy(() => import('./about')),
    '/contact': lazy(() => import('./contact')),
    '/book': lazy(() => import('./book')),
    // '/reviews': lazy(() => import('./reviews')),
    '/': lazy(() => import('./home')),

    // Only the statically built copy of the RSS feed is intended to be opened,
    // but the route is defined here so that the static renderer will pick it
    // up.
    '/rss': route(),
  }),
)

export default routes
