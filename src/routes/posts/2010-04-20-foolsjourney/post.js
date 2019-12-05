export default {
  title: `A fool’s journey, from falsehood to falsehood`,
  // tags: ['Shaukat', 'blog', 'Eid'],
  spoiler: "April is the cruelest month, thus wrote T.S. Eliot. Probably he thought stirring of lilacs from the dead ground, coaxed out by spring rain, is cruel. In a way it is. Life, or renewal of life, with its promise of inevitable death does appear to be cruel – to lilacs and laymen alike. But what would you rather have, life and death? Or no death, and thus no life?",
  getContent: () => import('./document.mdx'),
}