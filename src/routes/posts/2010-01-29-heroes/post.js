export default {
  title: `Two heroes: A rebel and a recluse`,
  // tags: ['Shaukat', 'blog', 'Eid'],
  spoiler: "Two great souls departed this world this week. One, Howard Zinn, had a deep and lasting influence on me, and the other, J.D. Salinger, missed me by a decade or two – if only I had discovered him in my youth when I was too much of a nice boy for my own good. These two men shared the greater part of the last century but it is interesting how different, even contrasting, their narratives are.",
  getContent: () => import('./document.mdx'),
}