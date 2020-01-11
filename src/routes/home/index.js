import * as Navi from 'navi'

export default Navi.route({
  title: "Shaukat Ajmeri",
  getView: () => import('./document.mdx'),
})