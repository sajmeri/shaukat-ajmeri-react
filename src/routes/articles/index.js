import importAll from 'import-all.macro'
import * as Navi from 'navi'
import { join } from 'path'
import { sortBy } from 'lodash'
import slugify from 'slugify'

// Get a list of all articles, that will not be loaded until the user
// requests them.
const articleModules = importAll.deferred('./**/article.js')
const importarticle = pathname => articleModules[pathname]()
const articlePathnames = Object.keys(articleModules)
const datePattern = /^((\d{1,4})-(\d{1,4})-(\d{1,4}))[/-]/

let articleDetails = articlePathnames.map(pathname => {
  let slug = slugify(
    pathname.replace(/article.jsx?$/, '').replace(/(\d)\/(\d)/, '$1-$2'),
  )
    .replace(/^[-.]+|[.-]+$/g, '')
    .replace(datePattern, '$1/')

  let date
  let dateMatch = slug.match(datePattern)
  if (dateMatch) {
    date = new Date(dateMatch[2], parseInt(dateMatch[3]) - 1, dateMatch[4])
  }

  return {
    slug,
    pathname,
    date,
  }
})

// Sort the pages by slug (which contain the dates)
articleDetails = sortBy(articleDetails, ['slug']).reverse()

// Create url-friendly slugs from article pathnames, and a `getPage()` function
// that can be used to load and return the article's Page object.
let articles = articleDetails.map(({ slug, pathname, date }, i) => ({
  getPage: Navi.map(async () => {
    let { default: article } = await importarticle(pathname)
    let { title, getContent, ...meta } = article
    let previousSlug, previousarticle, nextSlug, nextarticle

    if (i !== 0) {
      let previousarticleDetails = articleDetails[i - 1]
      previousarticle = (await importarticle(previousarticleDetails.pathname)).default
      previousSlug = previousarticleDetails.slug
    }

    if (i + 1 < articleDetails.length) {
      let nextarticleDetails = articleDetails[i + 1]
      nextarticle = (await importarticle(nextarticleDetails.pathname)).default
      nextSlug = nextarticleDetails.slug
    }

    return Navi.route({
      title,
      getData: (req, context) => ({
        date,
        pathname,
        slug,
        previousDetails: previousarticle && {
          title: previousarticle.title,
          href: join(context.blogRoot, 'articles', previousSlug),
        },
        nextDetails: nextarticle && {
          title: nextarticle.title,
          href: join(context.blogRoot, 'articles', nextSlug),
        },
        ...meta,
      }),
      getView: async () => {
        let { default: MDXComponent, ...other } = await getContent()
        return { MDXComponent, ...other }
      },
    })
  }),
  slug,
}))

export default articles
