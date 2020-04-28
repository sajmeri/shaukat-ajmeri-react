import importAll from 'import-all.macro'
import * as Navi from 'navi'
import { join } from 'path'
import { sortBy } from 'lodash'
import slugify from 'slugify'

// Get a list of all reviews, that will not be loaded until the user
// requests them.
const reviewModules = importAll.deferred('./**/review.js')
const importReview = pathname => reviewModules[pathname]()
const reviewPathnames = Object.keys(reviewModules)
const datePattern = /^((\d{1,4})-(\d{1,4})-(\d{1,4}))[/-]/

let reviewDetails = reviewPathnames.map(pathname => {
  let slug = slugify(
    pathname.replace(/review.jsx?$/, '').replace(/(\d)\/(\d)/, '$1-$2'),
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
reviewDetails = sortBy(reviewDetails, ['slug']).reverse()

// Create url-friendly slugs from review pathnames, and a `getPage()` function
// that can be used to load and return the review's Page object.
let reviews = reviewDetails.map(({ slug, pathname, date }, i) => ({
  getPage: Navi.map(async () => {
    let { default: review } = await importReview(pathname)
    let { title, getContent, ...meta } = review
    let previousSlug, previousReview, nextSlug, nextReview

    if (i !== 0) {
      let previousReviewDetails = reviewDetails[i - 1]
      previousReview = (await importReview(previousReviewDetails.pathname)).default
      previousSlug = previousReviewDetails.slug
    }

    if (i + 1 < reviewDetails.length) {
      let nextReviewDetails = reviewDetails[i + 1]
      nextReview = (await importReview(nextReviewDetails.pathname)).default
      nextSlug = nextReviewDetails.slug
    }

    return Navi.route({
      title,
      getData: (req, context) => ({
        date,
        pathname,
        slug,
        previousDetails: previousReview && {
          title: previousReview.title,
          href: join(context.blogRoot, 'reviews', previousSlug),
        },
        nextDetails: nextReview && {
          title: nextReview.title,
          href: join(context.blogRoot, 'reviews', nextSlug),
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

export default reviews
