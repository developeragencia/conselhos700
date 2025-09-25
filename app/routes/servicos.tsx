import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export const meta: MetaFunction = () => {
  return [
    { title: "Serviços - Sensitivos na Web" },
    { name: "description", content: "Conheça todos os nossos serviços esotéricos: tarot, astrologia, mediunidade, numerologia, runas e terapias alternativas." },
  ];
};

export default function Servicos() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
              <h1 className="text-2xl font-bold text-white">Sensitivos na Web</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/consultores" className="text-white/80 hover:text-white">Consultores</Link>
              <Link to="/servicos" className="text-white">Serviços</Link>
              <Link to="/loja" className="text-white/80 hover:text-white">Loja</Link>
              <Link to="/blog" className="text-white/80 hover:text-white">Blog</Link>
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Nossos Serviços</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Descubra todos os serviços esotéricos disponíveis em nossa plataforma
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white text-3xl mb-4 mx-auto">
                  {service.icon}
                </div>
                <CardTitle className="text-white">{service.title}</CardTitle>
                <CardDescription className="text-white/70">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold text-white text-center">{service.price}</div>
                  <Button className="w-full" asChild>
                    <Link to={service.link}>Agendar Consulta</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white/5 rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Como Funciona</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl mb-4 mx-auto">
                  {index + 1}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Pronto para Começar?</h3>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Conecte-se agora com nossos consultores especializados e comece sua jornada espiritual
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/consultores">Encontrar Consultor</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/tarot-gratis">Tarot Gratuito</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

const services = [
  {
    icon: "🔮",
    title: "Tarot",
    description: "Consultas de tarot com interpretação profissional",
    price: "R$ 89,90",
    link: "/servicos/tarot"
  },
  {
    icon: "⭐",
    title: "Astrologia",
    description: "Mapas astrais e previsões personalizadas",
    price: "R$ 120,00",
    link: "/servicos/astrologia"
  },
  {
    icon: "👁️",
    title: "Mediunidade",
    description: "Conexão espiritual e mensagens",
    price: "R$ 95,00",
    link: "/servicos/mediunidade"
  },
  {
    icon: "🔢",
    title: "Numerologia",
    description: "Análise numerológica completa",
    price: "R$ 75,00",
    link: "/servicos/numerologia"
  },
  {
    icon: "🗿",
    title: "Runas",
    description: "Leitura de runas nórdicas",
    price: "R$ 85,00",
    link: "/servicos/runas"
  },
  {
    icon: "🌟",
    title: "Oráculos",
    description: "Consultas com diversos oráculos",
    price: "R$ 80,00",
    link: "/servicos/oraculos"
  },
  {
    icon: "💆",
    title: "Reiki",
    description: "Terapia energética à distância",
    price: "R$ 100,00",
    link: "/servicos/reiki"
  },
  {
    icon: "💎",
    title: "Cristaloterapia",
    description: "Terapia com cristais e pedras",
    price: "R$ 110,00",
    link: "/servicos/cristaloterapia"
  }
];

const features = [
  {
    title: "Escolha o Serviço",
    description: "Selecione o tipo de consulta que mais combina com suas necessidades"
  },
  {
    title: "Conecte-se",
    description: "Escolha seu consultor favorito e agende sua sessão online"
  },
  {
    title: "Receba Orientação",
    description: "Tenha sua consulta personalizada com interpretação profissional"
  }
];