export default {
  title: `There is a time for everything`,
  // tags: ['Shaukat', 'blog', 'Eid'],
  spoiler: "Have been thinking of starting a blog for a long time but kept putting it off, wondering what am I going to write about. It sucks to be living in the 21st century. So many millennia of original thought have preceded us already and it seems there is nothing worthwhile left to be said – at least something that’s entirely unique and new. Of course, I’m assuming that if I were born in an earlier era I would have had something original to say, and that’s so presumptuous!",
  getContent: () => import('./document.mdx'),
}