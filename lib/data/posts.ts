export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
  content: string;
};

export const MOCK_POSTS: Post[] = [
  {
    id: "supabase-report",
    slug: "supabase-report",
    title: "Todo sobre Supabase: Versiones y Diferencias",
    excerpt: "Si estás buscando la alternativa Open Source a Firebase, conoce Supabase. Analizamos sus versiones, precios y si te conviene usar la nube oficial o auto-hospedarlo.",
    date: "AGOSTO 2026",
    category: "Tecnología y Tendencias",
    author: "Cómputo e IA del Sur",
    readTime: "LEER REPORTE",
    content: "" // El contenido está en app/[locale]/blog/supabase-report/page.tsx, por lo que aquí va vacío
  },
  {
    id: "claude-report",
    slug: "claude-report",
    title: "Claude vs Claude Platform: ¿Por qué mi factura se disparó?", // Será sobrescrito por next-intl en BlogPosts.claude-report.title
    excerpt: "Investigamos por qué usar Claude mediante línea de comandos (CLI) resulta mucho más caro que la suscripción a Claude Team. Conoce las diferencias entre cobrar por asiento vs cobrar por token.",
    date: "AGOSTO 2026",
    category: "Investigación",
    author: "Cómputo e IA del Sur",
    readTime: "LEER REPORTE",
    content: "" // El contenido está en app/[locale]/blog/claude-report/page.tsx
  }
];

export function getAllPosts(): Post[] {
  return MOCK_POSTS;
}

export function getPostById(id: string): Post | undefined {
  return MOCK_POSTS.find((p) => p.id === id);
}

export function getPostBySlug(slug: string): Post | undefined {
  return MOCK_POSTS.find((p) => p.slug === slug);
}
