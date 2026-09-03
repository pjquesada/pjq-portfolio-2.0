export type Project = {
  id: string
  number: string
  name: string
  role: string
  year: string
  discipline: string
  pips: number
  summary: string
  href?: string
}

export const WORK: Project[] = [
  {
    id: 'chain-reaction',
    number: '001',
    name: 'Chain Reaction',
    role: 'Art direction + development',
    year: '2026',
    discipline: 'WebGL / Type',
    pips: 4,
    summary:
      'This site. A pinned 3D tabletop that scatters, decelerates, and settles into a manifesto — iteration as composition.',
  },
  {
    id: 'prism',
    number: '002',
    name: 'Prism',
    role: 'Design + development',
    year: '2025',
    discipline: 'Product / Frontend',
    pips: 3,
    summary:
      'A calm companion visualizer. Music stays where it is. Visuals follow you — local first, synchronized displays next.',
    href: 'https://prism-web-lime-seven.vercel.app',
  },
  {
    id: 'chatter',
    number: '003',
    name: 'Chatter',
    role: 'Product + UI',
    year: '2024',
    discipline: 'Mobile / Flutter',
    pips: 2,
    summary:
      'A messaging app built around groups and presence. The interface is the first move; the product is the refinement.',
    href: 'https://github.com/pjquesada/Chatter-App',
  },
  {
    id: 'suppleye',
    number: '004',
    name: 'Suppleye',
    role: 'Engineering',
    year: '2024',
    discipline: 'Systems / Python',
    pips: 3,
    summary:
      'Watch price, stock, and lead time. When something critical changes, a message fires. Cause, then effect.',
    href: 'https://github.com/pjquesada/suppleye',
  },
]
