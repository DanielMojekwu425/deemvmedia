/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, TeamMember, Service } from './types';

export const SERVICES: Service[] = [
  {
    iconName: 'Layout',
    title: 'Digital Engineering',
    description: 'We develop high-performance, responsive web architectures and enterprise platforms built with modern technology stacks.',
    features: ['React & Next.js Custom Implementations', 'Headless CMS Integration', 'High-speed API Architectures', 'Edge-rendered Web Apps']
  },
  {
    iconName: 'Compass',
    title: 'Brand Storytelling',
    description: 'We carve distinctive visual identity systems and brand assets that build authority, trust, and lasting emotional resonance.',
    features: ['Visual Brand Positioning', 'Motion Graphic Design', 'Interactive Brand Books', 'Creative Copywriting']
  },
  {
    iconName: 'Sparkles',
    title: 'Experiential UI/UX',
    description: 'Creative design meets behavioral science. We build stunning interfaces that engage organic human behavior.',
    features: ['High-contrast UI Systems', 'Interactive Prototypes', 'Behavioral Flow Audits', 'Accessible (WCAG) Formats']
  },
  {
    iconName: 'Fingerprint',
    title: 'Strategic Architecture',
    description: 'Every interface maps directly to a growth goal. We co-pilot products from initial seed concept into production scale.',
    features: ['Market Gap Assessment', 'User Journey Mapping', 'Product Launch Roadmaps', 'Interactive Analytics Setups']
  },
  {
    iconName: 'TrendingUp',
    title: 'Marketing & SEO Growth',
    description: 'Amplify your reach. We design experiences optimized for indexing, search performance, and customer acquisition.',
    features: ['Page-Speed Optimization', 'Semantic Structure Planning', 'Organic Search Funnels', 'Growth Analytics Integration']
  },
  {
    iconName: 'Shield',
    title: 'Secure Performance',
    description: 'Websites that are bulletproof from launch. We prioritize strict enterprise-level security, accessibility, and offline speed.',
    features: ['DDoS Mitigation Layouts', 'SSL & Privacy Compliance', 'Sub-second Load Audits', 'Clean Hosting Infrastructure']
  }
];

export const TEAM: TeamMember[] = [
  {
    name: 'Marcus Vance',
    role: 'Principal Partner & Strategist',
    bio: 'With over 12 years in digital transformation, Marcus co-pilots brand narrative direction for Fortune 500 startups and creatives.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80',
    socials: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    name: 'Elena Rostova',
    role: 'Executive Creative Director',
    bio: 'An award-winning interface designer, Elena translates complex user personas into elegant layouts and immersive brand elements.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80',
    socials: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    name: 'Devon Chen',
    role: 'Chief Technical Architect',
    bio: 'Devon specializes in ultra-fast rendering, Node.js infrastructure, and micro-frontend structures that load with fluid, instant speed.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&h=400&q=80',
    socials: {
      linkedin: '#',
      github: '#'
    }
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'pulse-fitness',
    title: 'Pulse Premium Workspace',
    category: 'web',
    description: 'A fully custom web application designed for elite fitness centers, linking biometric streaming with member booking.',
    fullStory: 'Pulse challenged us to craft a unified, client-facing environment running on lightning-fast edge performance. We built a beautiful dark client interface with custom widgets and a fully immersive, sub-second schedule navigator. The resulting interface drove member sessions up by 34% in the first quarter post-launch.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'WebSlices', 'Tailwind', 'Real-time API'],
    client: 'Pulse Fitness Ltd',
    year: '2025',
    results: ['+34% Class Reservations', '99.99% Operational Uptime', '92% Member Satisfaction Rating']
  },
  {
    id: 'spectra-identity',
    title: 'Spectra Creative Labs Design',
    category: 'design',
    description: 'A striking 3D-inspired visual layout and layout library curated for a forward-thinking digital art and gaming incubator.',
    fullStory: 'We curated a brand-new typographic suite, responsive vector blueprints, and micro-interaction states. The aesthetic celebrates raw digital textures, high-contrast typography, and fluid canvas animations that respond to organic cursor dragging.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    tags: ['Brand Strategy', 'WebGL Textures', 'Vector Blueprints', 'Design System'],
    client: 'Spectra Labs',
    year: '2026',
    results: ['Redefined 12 Product Lines', 'Feature in Design Magazine', '3x Higher Organic Brand Mentions']
  },
  {
    id: 'luna-brand',
    title: 'Luna Wellness Cosmetics',
    category: 'branding',
    description: 'A minimalist storytelling narrative and packaging brand direction centered around lunar-cycle organic skincare.',
    fullStory: 'Deemvmedia designed Luna’s primary visual language, centering its web assets around celestial gradients and spacious structural grids. We crafted high-converting landing experiences and product packaging prototypes that tell a deeply calming story to organic customers.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    tags: ['Creative Direction', 'E-commerce UI', 'Fidelity Prototyping', 'Content Strategy'],
    client: 'Luna Organic LLC',
    year: '2025',
    results: ['220% Brand Engagement', 'Successfully Funded on Pre-launch', 'Custom Packaging Masterpiece']
  },
  {
    id: 'apex-capital',
    title: 'Apex Financial Platform',
    category: 'web',
    description: 'Ultra-fast dashboard experience for asset forecasting, providing real-time data visualizers and elegant tabular indices.',
    fullStory: 'High-stake finance requires extreme precision and zero clutter. We paired classic monospaced fonts with high-contrast indicator boards to design an exceptionally legible trading and forecasting desk. Deemvmedia delivered a smooth, fluid desktop experience using low-latency WebSockets and semantic rendering frameworks.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    tags: ['Financial charts', 'D3 Data Integration', 'Responsive Tableaux', 'Server-Rendered SPA'],
    client: 'Apex Capital Ventures',
    year: '2026',
    results: ['Sub-200ms Interactive Latency', 'Used by 45,000 active brokers', 'Zero Security vulnerabilities reported']
  },
  {
    id: 'kratos-identity',
    title: 'Kratos Heavy Industries',
    category: 'branding',
    description: 'Rebranding an civil infrastructure and energy leader with modular typography designs, logos, and digital style guides.',
    fullStory: 'We designed a bold, industrial visual identity, marrying robust steel-gray tones with structural geometric lines. We mapped their history of 40 years into a stunning interactive visual timeline, elevating their digital standing among strategic state partners.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    tags: ['Industrial Brand', 'Historical Timelines', 'SFC Typographics', 'Branding Kit'],
    client: 'Kratos International',
    year: '2025',
    results: ['$40M Inbound RFP Wins', '100% Brand Standardization', 'Unified 5 Corporate Subsidiaries']
  },
  {
    id: 'vivid-spatial',
    title: 'Vivid Spatial VR Hub',
    category: 'design',
    description: 'An architectural virtual reality showcase and gallery platform facilitating remote immersive artist experiences.',
    fullStory: 'Our crew built a spatial interface containing responsive 3D showcases and digital catalog layers. Users can interact and walk through premium exhibitions with gorgeous scroll-linked gallery walls. This product received award nominations for experimental front-end engineering.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
    tags: ['Spatial UX', 'Hover Animations', 'Digital Showroom', 'Accessible Layouts'],
    client: 'Vivid Labs Inc.',
    year: '2026',
    results: ['Awarded App of the Day', '120k Monthly active spatial visits', '80% Increase in Artist Signups']
  }
];
