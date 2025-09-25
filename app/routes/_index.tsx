import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export const meta: MetaFunction = () => {
  return [
    { title: "Sensitivos na Web - Consultas Esotéricas Online" },
    { name: "description", content: "Plataforma completa para consultas esotéricas com os melhores consultores especializados em tarot, astrologia, mediunidade e terapias alternativas." },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
              <h1 className="text-2xl font-bold text-white">Sensitivos na Web</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/consultores" className="text-white/80 hover:text-white">Consultores</Link>
              <Link to="/servicos" className="text-white/80 hover:text-white">Serviços</Link>
              <Link to="/loja" className="text-white/80 hover:text-white">Loja</Link>
              <Link to="/blog" className="text-white/80 hover:text-white">Blog</Link>
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/registro">Cadastrar</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Descubra Seu
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Futuro</span>
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Conecte-se com consultores especializados em tarot, astrologia, mediunidade e terapias alternativas. 
            Orientação espiritual profissional quando você precisar.
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
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Nossos Serviços</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white text-2xl mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-white">{service.title}</CardTitle>
                  <CardDescription className="text-white/70">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full text-white" asChild>
                    <Link to={service.link}>Saiba Mais</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-black/20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/40">
        <div className="container mx-auto text-center">
          <p className="text-white/60">© 2025 Sensitivos na Web. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

const services = [
  {
    icon: "🔮",
    title: "Tarot",
    description: "Consultas de tarot com os melhores especialistas",
    link: "/servicos/tarot"
  },
  {
    icon: "⭐",
    title: "Astrologia",
    description: "Mapas astrais e previsões personalizadas",
    link: "/servicos/astrologia"
  },
  {
    icon: "👁️",
    title: "Mediunidade",
    description: "Conexão espiritual e mensagens do além",
    link: "/servicos/mediunidade"
  },
  {
    icon: "💎",
    title: "Cristaloterapia",
    description: "Terapia com cristais e pedras energéticas",
    link: "/servicos/cristaloterapia"
  }
];

const stats = [
  { number: "500+", label: "Consultores Ativos" },
  { number: "10k+", label: "Consultas Realizadas" },
  { number: "4.9⭐", label: "Avaliação Média" },
  { number: "24/7", label: "Suporte Online" }
];