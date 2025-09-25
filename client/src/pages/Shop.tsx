import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/hooks/useCart";
import { Search, Filter, ShoppingBag, Star, Grid, List } from "lucide-react";

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { getTotalItems } = useCart();

  const { data: products, isLoading } = useQuery({
    queryKey: ["/api/products", { category: selectedCategory, search: searchTerm }],
  });

  const categories = [
    { value: "all", label: "Todas as Categorias" },
    { value: "cristais", label: "Cristais e Pedras" },
    { value: "incensos", label: "Incensos e Defumação" },
    { value: "velas", label: "Velas Ritualísticas" },
    { value: "tarot", label: "Baralhos de Tarot" },
    { value: "livros", label: "Livros Esotéricos" },
    { value: "joias", label: "Joias Místicas" },
    { value: "decoracao", label: "Decoração Esotérica" },
    { value: "oraculos", label: "Oráculos e Cartas" }
  ];

  const priceRanges = [
    { value: "all", label: "Todas as Faixas" },
    { value: "0-50", label: "Até R$ 50" },
    { value: "50-100", label: "R$ 50 - R$ 100" },
    { value: "100-200", label: "R$ 100 - R$ 200" },
    { value: "200+", label: "Acima de R$ 200" }
  ];

  const featuredProducts = [
    {
      id: "1",
      name: "Quartzo Rosa Natural",
      price: 89.90,
      originalPrice: 120.00,
      description: "Cristal do amor incondicional e cura emocional. Pedra natural de alta qualidade para harmonização dos chakras.",
      imageUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1000&auto=format&fit=crop",
      category: "cristais",
      inStock: true,
      rating: 4.8,
      reviews: 156
    },
    {
      id: "2",
      name: "Incenso Sândalo Premium",
      price: 24.90,
      description: "Incenso natural de sândalo para purificação e meditação. Caixa com 20 varetas artesanais.",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1000&auto=format&fit=crop",
      category: "incensos",
      inStock: true,
      rating: 4.9,
      reviews: 89
    },
    {
      id: "3",
      name: "Vela Violeta Transmutação",
      price: 35.00,
      description: "Vela ritualística violeta para transmutação e proteção espiritual. Duração de 8 horas.",
      imageUrl: "https://images.unsplash.com/photo-1543946207-39bd91e70ca7?q=80&w=1000&auto=format&fit=crop",
      category: "velas",
      inStock: true,
      rating: 4.7,
      reviews: 73
    },
    {
      id: "4",
      name: "Baralho Tarot Rider-Waite",
      price: 85.00,
      originalPrice: 110.00,
      description: "Baralho clássico Rider-Waite com 78 cartas e manual completo em português. Edição de luxo.",
      imageUrl: "https://images.unsplash.com/photo-1518893063132-36e46dbe2428?q=80&w=1000&auto=format&fit=crop",
      category: "tarot",
      inStock: true,
      rating: 5.0,
      reviews: 234
    },
    {
      id: "5",
      name: "Ametista Bruta Grande",
      price: 150.00,
      description: "Ametista bruta natural de alta qualidade. Ideal para decoração e energização de ambientes.",
      imageUrl: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=1000&auto=format&fit=crop",
      category: "cristais",
      inStock: true,
      rating: 4.6,
      reviews: 67
    },
    {
      id: "6",
      name: "Livro: Tarot para Iniciantes",
      price: 45.90,
      description: "Guia completo para aprender tarot do zero. Inclui interpretações detalhadas e exercícios práticos.",
      imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000&auto=format&fit=crop",
      category: "livros",
      inStock: true,
      rating: 4.5,
      reviews: 145
    }
  ];

  const filteredProducts = featuredProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    const matchesPrice = selectedPrice === "all" || (() => {
      const price = product.price;
      switch (selectedPrice) {
        case "0-50": return price <= 50;
        case "50-100": return price > 50 && price <= 100;
        case "100-200": return price > 100 && price <= 200;
        case "200+": return price > 200;
        default: return true;
      }
    })();
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary/90 to-secondary/80 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ShoppingBag className="w-16 h-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Loja Esotérica
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                Descubra produtos autênticos para sua jornada espiritual e prática esotérica
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filtros e Busca */}
        <section className="py-8 bg-white shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Busca */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar produtos..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Filtros */}
              <div className="flex flex-wrap gap-4">
                <select
                  className="py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>

                <select
                  className="py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-3 ${viewMode === "grid" ? "bg-primary text-white" : "bg-white text-gray-600"}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-3 ${viewMode === "list" ? "bg-primary text-white" : "bg-white text-gray-600"}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Carrinho */}
              <a
                href="/carrinho"
                className="relative bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Carrinho
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-primary text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </a>
            </div>
          </div>
        </section>

        {/* Lista de Produtos */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {filteredProducts.length} produtos encontrados
                </h2>
                <div className="text-gray-600">
                  Ordenar por: Mais relevantes
                </div>
              </div>

              {isLoading ? (
                <div className={`grid ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"} gap-8`}>
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                      <div className="w-full h-48 bg-gray-300 rounded-xl mb-4"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
                      <div className="h-8 bg-gray-300 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className={`grid ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"} gap-8`}>
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      {viewMode === "grid" ? (
                        <ProductCard product={product} />
                      ) : (
                        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex gap-6">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-32 h-32 object-cover rounded-xl"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-primary">
                                  R$ {product.price.toFixed(2)}
                                </div>
                                {product.originalPrice && (
                                  <div className="text-sm text-gray-500 line-through">
                                    R$ {product.originalPrice.toFixed(2)}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-gray-600 mb-4 leading-relaxed">
                              {product.description}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < Math.floor(product.rating || 0)
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                  ({product.reviews} avaliações)
                                </span>
                              </div>

                              <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                                Adicionar ao Carrinho
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Nenhum produto encontrado
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Tente ajustar os filtros ou termos de busca
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                      setSelectedPrice("all");
                    }}
                    className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Limpar Filtros
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Categorias em Destaque */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl font-bold text-center mb-12 text-gray-800"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Categorias Populares
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.slice(1, 5).map((category, index) => (
                <motion.div
                  key={category.value}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  <div className="text-4xl mb-4">
                    {category.value === "cristais" && "💎"}
                    {category.value === "incensos" && "🕯️"}
                    {category.value === "velas" && "🕯️"}
                    {category.value === "tarot" && "🔮"}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {category.label}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Produtos autênticos e de qualidade
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
  );
}