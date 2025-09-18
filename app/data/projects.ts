export interface Project {
  id: number;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  tags: string[];
  category: string;
  categoryColor: string;
}

export const projects: Project[] = [
  {
    id: 1,
    imageSrc: '/p1.png',
    imageAlt: 'sdsped.cz - Moderní webové aplikační rozhraní',
    title: 'sdsped.cz',
    description: 'Moderní webové aplikační rozhraní s pokročilými funkcemi a intuitivním UX',
    tags: ['React', 'Node.js'],
    category: 'Web Application',
    categoryColor: 'from-blue-500/20 to-purple-500/20'
  },
  {
    id: 2,
    imageSrc: '/p2.png',
    imageAlt: 'egn-stav.cz - Design SaaS platformy',
    title: 'egn-stav.cz',
    description: 'Komplexní SaaS řešení pro stavební průmysl s pokročilou analytikou',
    tags: ['Next.js', 'TypeScript'],
    category: 'SaaS Platform',
    categoryColor: 'from-purple-500/20 to-pink-500/20'
  },
  {
    id: 3,
    imageSrc: '/p3.png',
    imageAlt: 'purefurniture.cz - Responzivní mobilní aplikace',
    title: 'purefurniture.cz',
    description: 'Responzivní mobilní aplikace pro prodej nábytku s AR funkcemi',
    tags: ['React Native', 'Firebase'],
    category: 'Mobile App',
    categoryColor: 'from-green-500/20 to-blue-500/20'
  },
  {
    id: 4,
    imageSrc: '/p4.png',
    imageAlt: 'hsgroup.cz - Kompletní systém designu značky',
    title: 'hsgroup.cz',
    description: 'Kompletní systém designu značky včetně identity, loga a guidelines',
    tags: ['Figma', 'Illustrator'],
    category: 'Brand Design',
    categoryColor: 'from-orange-500/20 to-red-500/20'
  },
  {
    id: 5,
    imageSrc: '/p5.png',
    imageAlt: 'darksalon.cz - Přepracování online obchodu',
    title: 'darksalon.cz',
    description: 'Kompletní identita značky včetně loga, barevné palety a brand guidelines',
    tags: ['Shopify', 'Liquid'],
    category: 'E-commerce',
    categoryColor: 'from-pink-500/20 to-purple-500/20'
  },
  {
    id: 6,
    imageSrc: '/screen.png',
    imageAlt: 'CodeGrip - Náhled obrazovky',
    title: "Queen's hair",
    description: 'Kompletní identita značky včetně loga, barevné palety a brand guidelines',
    tags: ['Brand Identity', 'Logo Design'],
    category: 'Branding',
    categoryColor: 'from-cyan-500/20 to-blue-500/20'
  }
];
