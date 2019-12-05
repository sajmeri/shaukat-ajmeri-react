export default {
  title: `On the wings of hope`,
  // tags: ['Shaukat', 'blog', 'Eid'],
  spoiler: "Why would one write poetry, I don’t know. Why would one write anything at all, I don’t know. This much I know that we humans are a creative bunch. We create things, invent things. We just can’t help it. Without this innate, ancient urge to create I wonder where would we be today. But then, with the creative yin comes the destructive yang.",
  getContent: () => import('./document.mdx'),
}