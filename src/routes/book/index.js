import * as Navi from 'navi'

export default Navi.route({
  title: "Shaukat Ajmeri | Book",
  getView: () => import('./document.mdx'),
})