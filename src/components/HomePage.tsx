import { Facebook, Twitter, Instagram, Music, MessageCircle, Star } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Superior */}
      <div className="bg-blue-800 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Facebook size={16} />
              <Twitter size={16} />
              <Instagram size={16} />
              <Music size={16} />
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span>+55 11 95165-3210</span>
              <span>24 Horas por Dia</span>
              <span>contato@conselhosesotericos.com.br</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navegação */}
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://ext.same-assets.com/741558681/155226442.png"
              alt="Conselhos Esotéricos Logo"
              className="h-16"
            />
          </div>
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">HOME</Link>
            <Link href="#consultores" className="text-gray-700 hover:text-blue-600 font-medium">PROFISSIONAIS</Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">CRIAR CONTA</Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium">ENTRAR</Link>
          </div>
        </div>
      </nav>

      {/* Seção Hero */}
      <section className="relative h-screen overflow-hidden bg-gradient-to-br from-purple-800 to-blue-800">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-4xl">
            <p className="text-2xl mb-4 opacity-90">A TUA VIDA ESTÁ UM POUCO BAGUNÇADA?</p>
            <h1 className="text-6xl font-bold mb-6">PODEMOS TE AJUDAR A ENCONTRAR O CAMINHO</h1>
            <p className="text-xl mb-8">e desfrutar do equilíbrio, da paz, o amor e a tranquilidade</p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 text-lg font-semibold rounded transition-colors">
              Consultar Agora
            </button>
          </div>
        </div>
      </section>

      {/* Seção Consultores */}
      <section id="consultores" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-800 mb-4">Nossos Consultores</h2>
            <p className="text-lg text-gray-600">Profissionais experientes prontos para te ajudar</p>
          </div>

          <div className="grid grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img
                  src="https://ext.same-assets.com/741558681/3228089916.jpeg"
                  alt="Fabianna"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Em Atendimento
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-2">Fabianna</h3>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    5.0 (1247 avaliações)
                  </span>
                </div>
                <p className="text-gray-600 mb-4">Tarot e Cartomancia</p>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    R$ 3,50/min
                  </div>
                  <Link href="/consultor/fabianna">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition-colors flex items-center justify-center">
                      <MessageCircle className="mr-2" size={16} />
                      Consultar
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img
                  src="https://ext.same-assets.com/741558681/540868604.png"
                  alt="AnnaFreya"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Disponível
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-2">AnnaFreya</h3>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    4.9 (890 avaliações)
                  </span>
                </div>
                <p className="text-gray-600 mb-4">Runas e Numerologia</p>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    R$ 4,00/min
                  </div>
                  <Link href="/consultor/annafreya">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition-colors flex items-center justify-center">
                      <MessageCircle className="mr-2" size={16} />
                      Consultar
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img
                  src="https://ext.same-assets.com/741558681/2547096740.jpeg"
                  alt="Mystic Luna"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium">
                    Ocupado
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-2">Mystic Luna</h3>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    4.8 (650 avaliações)
                  </span>
                </div>
                <p className="text-gray-600 mb-4">Astrologia e Cristais</p>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    R$ 3,75/min
                  </div>
                  <Link href="/consultor/mysticluna">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition-colors flex items-center justify-center">
                      <MessageCircle className="mr-2" size={16} />
                      Consultar
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative">
                <img
                  src="https://ext.same-assets.com/741558681/1685023612.jpeg"
                  alt="Sophia Vidente"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Disponível
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-2">Sophia Vidente</h3>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    4.9 (1050 avaliações)
                  </span>
                </div>
                <p className="text-gray-600 mb-4">Vidência e Búzios</p>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    R$ 4,25/min
                  </div>
                  <Link href="/consultor/sophiavidente">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition-colors flex items-center justify-center">
                      <MessageCircle className="mr-2" size={16} />
                      Consultar
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Botão WhatsApp */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/5511951653210?text=Olá! Gostaria de fazer uma consulta esotérica."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
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