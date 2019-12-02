import * as Navi from 'navi'

export default Navi.route({
  title: "Home",
  getView: () => import('./document.mdx'),
})