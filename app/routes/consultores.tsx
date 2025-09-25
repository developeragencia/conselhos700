import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export const meta: MetaFunction = () => {
  return [
    { title: "Consultores - Sensitivos na Web" },
    { name: "description", content: "Encontre os melhores consultores especializados em tarot, astrologia, mediunidade e terapias alternativas." },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Simulando dados dos consultores (em produção viria da API)
  const consultores = [
    {
      id: 1,
      name: "Ana Paula Silva",
      specialty: "Tarot",
      rating: 4.9,
      reviews: 234,
      price: "R$ 89,90",
      image: "/images/consultor1.jpg",
      online: true,
      whatsapp: "5511999999999"
    },
    {
      id: 2,
      name: "Carlos Mendes",
      specialty: "Astrologia",
      rating: 4.8,
      reviews: 187,
      price: "R$ 120,00",
      image: "/images/consultor2.jpg",
      online: false,
      whatsapp: "5511888888888"
    },
    {
      id: 3,
      name: "Mariana Costa",
      specialty: "Mediunidade",
      rating: 5.0,
      reviews: 156,
      price: "R$ 95,00",
      image: "/images/consultor3.jpg",
      online: true,
      whatsapp: "5511777777777"
    }
  ];

  return json({ consultores });
};

export default function Consultores() {
  const { consultores } = useLoaderData<typeof loader>();

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
              <Link to="/consultores" className="text-white">Consultores</Link>
              <Link to="/servicos" className="text-white/80 hover:text-white">Serviços</Link>
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
          <h2 className="text-4xl font-bold text-white mb-4">Nossos Consultores</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Conecte-se com consultores especializados e experientes para orientação espiritual personalizada
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <Button variant="outline" className="bg-white/10 border-white/20 text-white">
            Todos
          </Button>
          <Button variant="ghost" className="text-white/80">
            Tarot
          </Button>
          <Button variant="ghost" className="text-white/80">
            Astrologia
          </Button>
          <Button variant="ghost" className="text-white/80">
            Mediunidade
          </Button>
          <Button variant="ghost" className="text-white/80">
            Terapias
          </Button>
        </div>

        {/* Consultores Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {consultores.map((consultor) => (
            <Card key={consultor.id} className="bg-white/10 border-white/20 backdrop-blur-sm overflow-hidden">
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">
                    👤
                  </div>
                </div>
                {consultor.online && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    Online
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-white">{consultor.name}</CardTitle>
                <CardDescription className="text-white/70">
                  Especialista em {consultor.specialty}
                </CardDescription>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {"⭐".repeat(Math.floor(consultor.rating))}
                  </div>
                  <span className="text-white/80 text-sm">
                    {consultor.rating} ({consultor.reviews} avaliações)
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-2xl font-bold text-white">{consultor.price}</div>
                <div className="space-y-2">
                  <Button className="w-full" asChild>
                    <Link to={`/consultor/${consultor.id}`}>Ver Perfil</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full bg-green-600 hover:bg-green-700 border-green-600 text-white"
                    asChild
                  >
                    <a 
                      href={`https://wa.me/${consultor.whatsapp}?text=Olá! Gostaria de agendar uma consulta de ${consultor.specialty}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      💬 WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}