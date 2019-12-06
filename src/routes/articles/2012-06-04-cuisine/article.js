export default {
  title: `The sweet and sour of Bohra cuisine`,
  // tags: ['Shaukat', 'blog', 'Eid'],
  spoiler: "Although food is integral to human survival, for Bohras it boils down to much more. After faith and culture, it is food that binds them together, brings them together. In fact faith would have little currency without that inevitable jaman. Food, or at least the expectation of it, helps one endure those dreary majalises. And for the orthodox brethren, for whom no gathering, religious or otherwise, can end without the ritual of matam, that expectation cannot be sweeter.",
  getContent: () => import('./document.mdx'),
}