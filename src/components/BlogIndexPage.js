import React from 'react'
import { Link } from 'react-navi'
import siteMetadata from '../siteMetadata'
import ArticleSummary from './ArticleSummary'
// import Bio from './Bio'
import Pagination from './Pagination'
// import styles from './BlogIndexPage.module.css'
import styles from './Styles.module.css'

function BlogIndexPage({ blogRoot, pageCount, pageNumber, postRoutes }) {

    const pageHeadingArray = postRoutes[0].url.pathname.split("/");

    let pageHeadingCapitalized = pageHeadingArray[1].charAt(0).toUpperCase() + pageHeadingArray[1].slice(1)
    if (pageHeadingCapitalized === "Posts") {
        pageHeadingCapitalized = "Blog"
    }
    const category = pageHeadingCapitalized;
    return ( <
        div >
        <
        h1 className = { styles.category } > { category } < /h1> { /* <Bio /> */ } <
        ul className = { styles.articlesList } > {
            postRoutes.map(route => ( <
                li key = { route.url.href } >
                <
                ArticleSummary blogRoot = { blogRoot }
                route = { route }
                /> <
                /li>
            ))
        } <
        /ul> {
            pageCount > 1 && pageHeadingArray[1] !== "reviews" && ( <
                Pagination blogRoot = { blogRoot }
                pageCount = { pageCount }
                pageNumber = { pageNumber }
                />
            )
        }

        <
        /div>
    )
}

export default BlogIndexPage