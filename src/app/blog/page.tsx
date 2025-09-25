"use client";

import { Star, Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  featured: boolean;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Os Mistérios da Lua Cheia: Como Aproveitar sua Energia",
    slug: "misterios-lua-cheia-energia",
    excerpt: "Descubra como a energia lunar pode transformar sua vida espiritual e como sincronizar seus rituais com as fases lunares.",
    content: "A lua cheia é um momento de grande poder energético...",
    imageUrl: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?w=800&h=400&fit=crop",
    category: "Astrologia",
    author: "Sophia Vidente",
    publishedAt: "2024-12-15",
    readTime: "8 min",
    featured: true,
    tags: ["lua", "energia", "rituais", "astrologia"]
  },
  {
    id: 2,
    title: "Cristais para Proteção: Guia Completo das Pedras Sagradas",
    slug: "cristais-protecao-guia-pedras-sagradas",
    excerpt: "Conheça os cristais mais poderosos para proteção espiritual e como utilizá-los no seu dia a dia.",
    content: "Os cristais são ferramentas poderosas de proteção...",
    imageUrl: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=400&fit=crop",
    category: "Cristaloterapia",
    author: "Mystic Luna",
    publishedAt: "2024-12-12",
    readTime: "6 min",
    featured: false,
    tags: ["cristais", "proteção", "energia", "limpeza"]
  },
  {
    id: 3,
    title: "Numerologia: Descubra o Poder dos Números na Sua Vida",
    slug: "numerologia-poder-numeros-vida",
    excerpt: "Entenda como os números influenciam seu destino e como calcular seu número pessoal.",
    content: "A numerologia é uma ciência antiga que revela...",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
    category: "Numerologia",
    author: "AnnaFreya",
    publishedAt: "2024-12-10",
    readTime: "10 min",
    featured: true,
    tags: ["numerologia", "números", "destino", "personalidade"]
  },
  {
    id: 4,
    title: "Tarot: Como Fazer uma Leitura Eficaz para Si Mesmo",
    slug: "tarot-leitura-eficaz-autoconhecimento",
    excerpt: "Aprenda técnicas essenciais para realizar leituras de tarot pessoais e desenvolver sua intuição.",
    content: "O tarot é uma ferramenta poderosa de autoconhecimento...",
    imageUrl: "https://images.unsplash.com/photo-1571442463800-1337d7af9d2f?w=800&h=400&fit=crop",
    category: "Tarot",
    author: "Fabianna",
    publishedAt: "2024-12-08",
    readTime: "12 min",
    featured: false,
    tags: ["tarot", "autoconhecimento", "intuição", "cartas"]
  },
  {
    id: 5,
    title: "Runas Nórdicas: Sabedoria Ancestral para Tempos Modernos",
    slug: "runas-nordicas-sabedoria-ancestral",
    excerpt: "Explore o poder das runas nórdicas e como usar essa sabedoria milenar para orientação espiritual.",
    content: "As runas são símbolos sagrados dos povos nórdicos...",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
    category: "Runas",
    author: "AnnaFreya",
    publishedAt: "2024-12-05",
    readTime: "9 min",
    featured: false,
    tags: ["runas", "nórdico", "ancestral", "orientação"]
  },
  {
    id: 6,
    title: "Limpeza Energética: Purificando Ambientes e Aura",
    slug: "limpeza-energetica-purificacao-ambientes",
    excerpt: "Técnicas eficazes para limpar energias negativas de ambientes e fortalecer sua proteção espiritual.",
    content: "A limpeza energética é fundamental para manter...",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    category: "Energias",
    author: "Sophia Vidente",
    publishedAt: "2024-12-03",
    readTime: "7 min",
    featured: false,
    tags: ["limpeza", "energia", "proteção", "ambiente"]
  }
];

const categories = ["Todos", "Astrologia", "Cristaloterapia", "Numerologia", "Tarot", "Runas", "Energias"];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-dark-blue text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gold mb-4">📚 Blog Esotérico</h1>
          <p className="text-xl text-gray-300">Conhecimento ancestral e sabedoria mística para sua jornada espiritual</p>
        </div>
      </div>

      {/* Navegação */}
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-dark-blue hover:text-gold font-medium">
            ← Voltar para Home
          </Link>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-dark-blue font-medium">HOME</Link>
            <Link href="/blog" className="text-dark-blue font-medium">BLOG</Link>
            <Link href="/consultores" className="text-gray-700 hover:text-dark-blue font-medium">CONSULTORES</Link>
            <Link href="/creditos" className="text-gray-700 hover:text-dark-blue font-medium">CRÉDITOS</Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Filtros por Categoria */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="cursor-pointer hover:bg-gold hover:text-dark-blue px-4 py-2 text-sm"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Posts em Destaque */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-dark-blue mb-6">📌 Posts em Destaque</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.filter(post => post.featured).map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 right-3 bg-gold text-dark-blue">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-dark-blue hover:text-gold transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-gold hover:text-dark-blue transition-colors font-medium"
                  >
                    Ler mais <ArrowRight size={16} className="ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Todos os Posts */}
        <section>
          <h2 className="text-2xl font-bold text-dark-blue mb-6">📖 Todos os Artigos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 right-3 bg-mystic-purple text-white">
                    {post.category}
                  </Badge>
                  {post.featured && (
                    <Badge className="absolute top-3 left-3 bg-gold text-dark-blue">
                      Destaque
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-dark-blue hover:text-gold transition-colors text-lg">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-gold hover:text-dark-blue transition-colors font-medium"
                  >
                    Ler mais <ArrowRight size={16} className="ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Botão WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/5511951653210?text=Olá! Gostaria de saber mais sobre o blog esotérico."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green hover:bg-green/90 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          aria-label="Contato WhatsApp"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
          </svg>
        </a>
      </div>
    </div>
  );
}