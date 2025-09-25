import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { ShoppingCart, Menu, X, Star, Users, Book, Phone, LogOut, User } from "lucide-react";
// Logo oficial do Conselhos Esotéricos
import logoImage from "@assets/CONSELHOS_20250521_110746_0000_1753966138984.png";

export const Header: React.FC = () => {
  const [location, setLocation] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const currentUser = user;
  const isLoggedIn = isAuthenticated;

  const navigation = [
    { name: "HOME", href: "/" },
    { 
      name: "SERVIÇOS", 
      hasSubmenu: true,
      submenu: [
        { name: "Tarot", href: "/servicos/tarot" },
        { name: "Astrologia", href: "/servicos/astrologia" },
        { name: "Numerologia", href: "/servicos/numerologia" },
        { name: "Runas", href: "/servicos/runas" },
        { name: "Mediunidade", href: "/servicos/mediunidade" },
        { name: "Oráculos", href: "/servicos/oraculos" },
        { name: "Reiki", href: "/servicos/reiki" },
        { name: "Cristaloterapia", href: "/servicos/cristaloterapia" },
        { name: "Tarot Grátis", href: "/tarot-gratis" },
      ]
    },
    { 
      name: "CONSULTORES", 
      hasSubmenu: true,
      submenu: [
        { name: "Todos os Consultores", href: "/consultores" },
        { name: "Especialistas em Tarot", href: "/consultores/tarot" },
        { name: "Astrólogos", href: "/consultores/astrologia" },
        { name: "Médiuns", href: "/consultores/mediunidade" },
        { name: "Terapeutas", href: "/consultores/terapeutas" },
        { name: "Como ser Consultor", href: "/consultores/cadastro" },
      ]
    },
    { 
      name: "SOBRE", 
      hasSubmenu: true,
      submenu: [
        { name: "Quem Somos", href: "/quem-somos" },
        { name: "Depoimentos", href: "/depoimentos" },
        { name: "Blog", href: "/blog" },
        { name: "Contato", href: "/contato" },
      ]
    },
    { 
      name: "COMPRAR", 
      hasSubmenu: true,
      submenu: [
        { name: "Consultas Avulsas", href: "/comprar/consultas" },
        { name: "Pacotes de Consultas", href: "/comprar/pacotes" },
        { name: "Créditos", href: "/comprar/creditos" },
        { name: "Planos Mensais", href: "/comprar/planos" },
        { name: "Assinaturas", href: "/comprar/assinaturas" },
        { name: "Promoções", href: "/promocoes" },
        { name: "Loja", href: "/loja" },
      ]
    }
  ];

  const cartItemCount = getTotalItems();

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white shadow-2xl border-b border-gray-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center group cursor-pointer py-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src={logoImage} 
                alt="Conselhos Esotéricos" 
                className="h-20 sm:h-24 w-auto max-w-[280px] sm:max-w-none object-contain"
                style={{ 
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))',
                  maxHeight: '96px'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.innerHTML = '<span class="text-2xl font-bold text-primary">Conselhos Esotéricos</span>';
                  fallback.className = 'flex items-center h-20';
                  target.parentNode?.appendChild(fallback);
                }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item, index) => {
              const isLastItems = index >= navigation.length - 3;
              const submenuPosition = isLastItems ? 'right-0' : 'left-0';
              
              if (item.hasSubmenu) {
                return (
                  <div 
                    key={item.name} 
                    className="relative group"
                    onMouseEnter={() => setActiveSubmenu(item.name)}
                    onMouseLeave={() => setActiveSubmenu(null)}
                  >
                    <motion.div
                      className="px-3 py-2 rounded-lg font-medium transition-all duration-300 text-gray-700 hover:text-primary hover:bg-primary/10 cursor-pointer flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {item.name}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                    
                    <AnimatePresence>
                      {activeSubmenu === item.name && (
                        <motion.div
                          className={`absolute top-full ${submenuPosition} mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="py-2">
                            {item.submenu?.map((subItem, subIndex) => (
                              <Link key={subItem.name} href={subItem.href}>
                                <motion.div
                                  className="block px-4 py-3 text-sm text-gray-700 hover:text-primary hover:bg-primary/10 transition-colors duration-200"
                                  whileHover={{ x: 5 }}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2, delay: subIndex * 0.05 }}
                                >
                                  {subItem.name}
                                </motion.div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              } else {
                return (
                  <Link key={item.name} href={item.href || "/"}>
                    <motion.div
                      className={`relative px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                        location === item.href
                          ? "text-white bg-primary shadow-md"
                          : "text-gray-700 hover:text-primary hover:bg-primary/10"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {item.name}
                      {location === item.href && (
                        <motion.div
                          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-accent rounded-full"
                          layoutId="activeIndicator"
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              }
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Cart */}
            <Link href="/carrinho">
              <motion.div
                className="relative p-3 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 h-5 w-5 bg-accent text-white text-xs rounded-full flex items-center justify-center font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Auth Button */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Link href={
                  (currentUser as any)?.role === 'admin' ? '/admin-dashboard' :
                  (currentUser as any)?.role === 'consultor' ? '/consultant-dashboard' :
                  '/client-dashboard'
                }>
                  <motion.button
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {(currentUser as any)?.firstName?.charAt(0)?.toUpperCase() || (currentUser as any)?.email?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                    <span className="hidden md:block">
                      {(currentUser as any)?.firstName || (currentUser as any)?.email?.split('@')[0] || "Usuário"}
                    </span>
                  </motion.button>
                </Link>
                <motion.button
                  onClick={() => {
                    logout();
                    window.location.href = '/';
                  }}
                  className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/cadastro">
                  <motion.button
                    className="px-4 py-2 text-purple-600 hover:text-purple-700 font-semibold border-2 border-purple-300 hover:border-purple-500 rounded-lg transition-all duration-300 hover:bg-purple-50"
                    whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(147, 51, 234, 0.25)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    CADASTRAR
                  </motion.button>
                </Link>
                <Link href="/login">
                  <motion.button
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 8px 25px rgba(147, 51, 234, 0.4)" 
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ENTRAR
                  </motion.button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200 relative z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-200 shadow-lg fixed left-0 right-0 top-20 sm:top-24 z-40"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 max-h-[70vh] overflow-y-auto">
              <nav className="space-y-2">
                {navigation.map((item, index) => (
                  <div key={item.name} className="space-y-1">
                    {item.hasSubmenu ? (
                      <div>
                        <motion.div
                          className="block px-4 py-3 rounded-lg font-medium text-gray-700 bg-gray-50 border border-gray-200"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          {item.name}
                        </motion.div>
                        <div className="ml-4 space-y-1 mt-1">
                          {item.submenu?.map((subItem, subIndex) => (
                            <Link key={subItem.name} href={subItem.href}>
                              <motion.div
                                className="block px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-primary hover:bg-primary/10 transition-colors duration-200"
                                onClick={() => setIsMobileMenuOpen(false)}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: (index * 0.1) + (subIndex * 0.05) }}
                              >
                                {subItem.name}
                              </motion.div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link href={item.href || "/"}>
                        <motion.div
                          className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                            location === item.href
                              ? "text-white bg-primary"
                              : "text-gray-700 hover:text-primary hover:bg-primary/10"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          {item.name}
                        </motion.div>
                      </Link>
                    )}
                  </div>
                ))}
                
                {/* Mobile Auth Buttons */}
                {!isLoggedIn && (
                  <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
                    <Link href="/cadastro">
                      <motion.div
                        className="block w-full text-center px-4 py-3 text-purple-600 font-semibold border-2 border-purple-300 rounded-lg hover:bg-purple-50 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        CADASTRAR
                      </motion.div>
                    </Link>
                    <Link href="/login">
                      <motion.div
                        className="block w-full text-center px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        ENTRAR
                      </motion.div>
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};