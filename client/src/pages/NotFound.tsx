import React from "react";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft, Star, Heart, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mb-8"
        >
          <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">
            404
          </h1>
          
          {/* Floating mystical elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => {
              const symbols = ['✦', '✧', '◊', '○', '◇', '☽', '☾', '✺'];
              return (
                <motion.div
                  key={i}
                  className="absolute text-purple-300/60"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    fontSize: `${20 + Math.random() * 20}px`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    y: [-20, -40, -60],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3
                  }}
                >
                  {symbols[i]}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Página Não Encontrada
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto">
            Parece que você se perdeu no universo místico. A página que você está procurando 
            não existe ou foi movida para outra dimensão espiritual.
          </p>
        </motion.div>

        {/* Navigation Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Voltar ao Início
            </Link>
            
            <Link
              href="/consultores"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <Search className="w-5 h-5 mr-2" />
              Ver Consultores
            </Link>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          <Link
            href="/tarot-gratis"
            className="group p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">Tarot Grátis</h3>
            </div>
          </Link>

          <Link
            href="/servicos/astrologia"
            className="group p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-indigo-200 transition-colors">
                <Sparkles className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">Astrologia</h3>
            </div>
          </Link>

          <Link
            href="/blog"
            className="group p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-yellow-200 transition-colors">
                <Heart className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">Blog</h3>
            </div>
          </Link>

          <Link
            href="/contato"
            className="group p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition-colors">
                <ArrowLeft className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 text-sm">Contato</h3>
            </div>
          </Link>
        </motion.div>

        {/* Mystical Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg max-w-lg mx-auto"
        >
          <p className="text-gray-700 italic text-lg mb-2">
            "Nem todos os que vagueiam estão perdidos."
          </p>
          <p className="text-sm text-gray-500">- Provérbio Espiritual</p>
        </motion.div>
      </div>
    </div>
  );
}