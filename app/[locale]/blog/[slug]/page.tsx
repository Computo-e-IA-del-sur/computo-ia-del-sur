import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SwarmBackground from "@/components/SwarmBackground";
import { getAllPosts, getPostBySlug } from "@/lib/data/posts";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  const locales = ["es", "en", "zh"];
  
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Artículo no encontrado | CÓMPUTO E IA DEL SUR" };
  }

  return {
    title: `${post.title} | CÓMPUTO E IA DEL SUR`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#051015] text-[#E2E8F0] flex flex-col relative selection:bg-[#2DBEED]/30 selection:text-[#2DBEED]">
      <SwarmBackground />
      <Navbar />

      <main className="flex-1 pt-36 pb-28 md:pt-44 md:pb-32 px-6 max-w-3xl mx-auto w-full relative z-10">
        {/* Botón de Regreso a la lista de artículos */}
        <div className="mb-10">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#0A1E27]/60 border border-[#2DBEED]/30 text-[#2DBEED] text-xs font-mono font-semibold tracking-widest uppercase hover:bg-[#2DBEED]/10 hover:border-[#C9933B]/60 hover:text-[#C9933B] transition-all"
          >
            &lt; VOLVER AL ENJAMBRE
          </Link>
        </div>

        {/* Cabecera del Artículo */}
        <header className="mb-12 border-b border-[#2DBEED]/15 pb-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="border border-[#2DBEED]/30 text-[#2DBEED] text-xs font-mono tracking-widest uppercase px-3.5 py-1 rounded-full bg-[#2DBEED]/10">
              {post.category}
            </span>
            <span className="text-xs font-mono text-slate-400">
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#2DBEED] via-slate-100 to-[#C9933B] leading-tight">
            {post.title}
          </h1>

          {/* Metadatos separados por barras (/) */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#C9933B]">
            <span>{post.date}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">{post.author}</span>
          </div>
        </header>

        {/* Contenido del Artículo */}
        <article className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-base sm:text-lg space-y-6">
          {post.content.split("\n\n").map((block, idx) => {
            const trimmed = block.trim();
            if (trimmed.startsWith("## ")) {
              return (
                <h2
                  key={idx}
                  className="text-2xl sm:text-3xl font-bold text-slate-100 mt-10 mb-4 border-l-4 border-l-[#2DBEED] pl-4 bg-[#0A1E27]/40 py-2 rounded-r-md"
                >
                  {trimmed.replace("## ", "")}
                </h2>
              );
            }
            if (trimmed.startsWith("### ")) {
              return (
                <h3
                  key={idx}
                  className="text-xl font-bold text-[#C9933B] mt-8 mb-3 font-mono tracking-wide"
                >
                  {trimmed.replace("### ", "")}
                </h3>
              );
            }
            if (trimmed.startsWith("> ")) {
              return (
                <blockquote
                  key={idx}
                  className="border-l-4 border-l-[#C9933B] bg-[#0A1E27]/80 p-5 rounded-r-md italic text-slate-200 font-normal my-6 shadow-lg"
                >
                  {trimmed.replace("> ", "")}
                </blockquote>
              );
            }
            if (trimmed.startsWith("```")) {
              const codeContent = trimmed
                .replace(/^```[a-z]*\n?/, "")
                .replace(/\n?```$/, "");
              return (
                <pre
                  key={idx}
                  className="bg-[#06171b] border border-[#2DBEED]/30 p-5 font-mono text-xs text-[#2DBEED] rounded-md overflow-x-auto shadow-inner my-6"
                >
                  <code>{codeContent}</code>
                </pre>
              );
            }
            if (trimmed.startsWith("* ")) {
              const items = trimmed.split("\n").map((line) => line.replace("* ", ""));
              return (
                <ul key={idx} className="list-disc list-inside space-y-2 pl-4 text-slate-300">
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx}>{item}</li>
                  ))}
                </ul>
              );
            }
            if (trimmed.startsWith("1. ")) {
              const items = trimmed.split("\n").map((line) => line.replace(/^[0-9]+\.\s*/, ""));
              return (
                <ol key={idx} className="list-decimal list-inside space-y-2 pl-4 text-slate-300">
                  {items.map((item, itemIdx) => (
                    <li key={itemIdx}>{item}</li>
                  ))}
                </ol>
              );
            }

            return (
              <p key={idx} className="leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </article>
      </main>

      <Footer />
    </div>
  );
}
