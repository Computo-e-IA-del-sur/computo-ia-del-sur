import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SwarmBackground from "@/components/SwarmBackground";
import { getAllPosts } from "@/lib/data/posts";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Blog | CÓMPUTO E IA DEL SUR",
  description: "Artículos técnicos, noticias y novedades sobre nuestro ecosistema tecnológico.",
};

import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

import { getTranslations } from "next-intl/server";

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getAllPosts();
  const t = await getTranslations("BlogIndex");
  const tPosts = await getTranslations("BlogPosts");

  return (
    <div className="min-h-screen bg-[#051015] text-[#E2E8F0] flex flex-col relative selection:bg-[#2DBEED]/30 selection:text-[#2DBEED]">
      <SwarmBackground />
      <Navbar />

      <main className="flex-1 pt-36 pb-28 md:pt-44 md:pb-32 px-6 max-w-6xl mx-auto w-full relative z-10">
        {/* Header Hero del Blog */}
        <header className="max-w-3xl mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-white leading-tight">
            {t("title").split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-[var(--primary-teal)] drop-shadow-[0_0_15px_rgba(45,190,237,0.3)]">
              {t("title").split(" ").slice(-1)}
            </span>
          </h1>

          <p className="text-lg text-slate-300">
            {t("subtitle")}
          </p>
        </header>

        {/* Grid de Artículos estilo Honeycomb */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="relative overflow-hidden bg-[#0A1E27]/40 backdrop-blur-md border border-[#2DBEED]/15 rounded-lg group transition-all duration-500 ease-out p-6 sm:p-8 hover:-translate-y-2 hover:bg-[#0A1E27]/60 hover:border-[#C9933B]/50 hover:shadow-[0_0_40px_rgba(201,147,59,0.15)] flex flex-col justify-between"
            >
              {/* Pseudo-elemento decorativo de nodo de panal en la esquina superior derecha */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#C9933B]/20 to-transparent border-t border-r border-[#C9933B] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div>
                {/* Metadatos en tipografía de terminal */}
                <div className="flex items-center justify-between mb-4 gap-2">
                  <span className="border border-[#2DBEED]/30 text-[#2DBEED] text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-[#2DBEED]/10">
                    {tPosts(`${post.id}.category`)}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {tPosts(`${post.id}.readTime`)}
                  </span>
                </div>

                <p className="text-xs font-mono text-[#C9933B] mb-3">
                  {post.date}
                </p>

                <h2 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-[#2DBEED] transition-colors leading-snug">
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    {tPosts(`${post.id}.title`)}
                  </Link>
                </h2>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-normal">
                  {tPosts(`${post.id}.excerpt`)}
                </p>
              </div>

              <div>
                <p className="text-xs font-mono text-slate-500 pb-4 border-b border-[#2DBEED]/10 mb-4">
                  {post.author}
                </p>

                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#2DBEED] group-hover:text-[#C9933B] transition-colors"
                >
                  &gt; INICIALIZAR LECTURA...
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
