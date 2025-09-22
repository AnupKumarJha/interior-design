export type Project = {
  slug: string
  title: string
  location: string
  category: 'Residential' | 'Commercial'
  coverImage: string
  images: string[]
  summary: string
  scope: string[]
  duration: string
  budgetRange?: string
}

export const projects: Project[] = [
  {
    slug: 'modern-living-room-delhi',
    title: 'Modern Living Room — Delhi',
    location: 'South Delhi',
    category: 'Residential',
    coverImage: '/grid/1.png',
    images: ['/grid/1.png', '/grid/2.png'],
    summary:
      'A warm, contemporary living space designed for entertaining and everyday comfort with layered lighting and smart storage.',
    scope: ['Concept + 3D', 'Furniture + Decor', 'Lighting plan', 'Turnkey execution'],
    duration: '7 weeks',
    budgetRange: '₹8–10L',
  },
  {
    slug: 'calm-bedroom-gurgaon',
    title: 'Calm & Cozy Bedroom — Gurgaon',
    location: 'DLF Phase 2',
    category: 'Residential',
    coverImage: '/latest-bedroom-interior-design-13.jpg.webp',
    images: ['/latest-bedroom-interior-design-13.jpg.webp', '/grid/3.png'],
    summary:
      'A restful master bedroom with muted tones, textured fabrics, and built-in wardrobes to maximize space.',
    scope: ['Moodboard + Materials', 'Wardrobe design', 'False ceiling', 'Styling'],
    duration: '5 weeks',
    budgetRange: '₹4–6L',
  },
  {
    slug: 'open-kitchen-pune',
    title: 'Functional Open Kitchen — Pune',
    location: 'Baner',
    category: 'Residential',
    coverImage: '/grid/4.png',
    images: ['/grid/4.png', '/grid/5.png'],
    summary:
      'A compact, high-efficiency kitchen with breakfast counter, optimized storage, and durable finishes for a busy family.',
    scope: ['Layout optimization', 'Modular kitchen', 'Appliance plan', 'On-site coordination'],
    duration: '6 weeks',
    budgetRange: '₹6–8L',
  },
  {
    slug: 'kids-room-noida',
    title: 'Playful Kids Room — Noida',
    location: 'Sector 76',
    category: 'Residential',
    coverImage: '/grid/6.png',
    images: ['/grid/6.png', '/grid/2.png'],
    summary:
      'A bright, adaptable room with study zone, bunk bed, and plenty of closed storage to keep things tidy.',
    scope: ['Zoning', 'Carpentry', 'Custom study desk', 'Paint & decor'],
    duration: '4 weeks',
    budgetRange: '₹3–5L',
  },
  {
    slug: 'minimal-entryway-bangalore',
    title: 'Minimal Entryway — Bengaluru',
    location: 'Indiranagar',
    category: 'Residential',
    coverImage: '/grid/5.png',
    images: ['/grid/5.png', '/grid/1.png'],
    summary:
      'A clean, welcoming foyer with shoe storage, statement mirror, and ambient lighting to set the tone for the home.',
    scope: ['Concept + Styling', 'Custom console', 'Lighting', 'Execution'],
    duration: '3 weeks',
    budgetRange: '₹1.5–2.5L',
  },
]

