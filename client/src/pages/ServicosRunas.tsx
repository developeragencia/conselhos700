import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Star, 
  Clock, 
  Users, 
  Shield,
  Zap,
  Heart,
  Briefcase,
  Home
} from 'lucide-react';

export default function ServicosRunas() {
  // Buscar consultores especializados em runas do banco
  const { data: consultants = [], isLoading } = useQuery({
    queryKey: ['/api/consultants'],
    select: (data: any[]) => data.filter(consultant => 
      consultant.specialties?.includes('runas') || 
      consultant.title?.toLowerCase().includes('runas')
    )
  });

  // Buscar serviços de runas do banco
  const { data: services = [] } = useQuery({
    queryKey: ['/api/services'],
    select: (data: any[]) => data.filter(service => 
      service.category === 'runas' || 
      service.name?.toLowerCase().includes('runas')
    )
  });

  const runicServices = [
    {
      id: 1,
      name: "Consulta Completa de Runas",
      description: "Leitura detalhada com 9 runas para orientação completa",
      price: "R$ 75,00",
      duration: "60 min",
      icon: Shield
    },
    {
      id: 2,
      name: "Runas do Amor",
      description: "Orientação específica para questões românticas e relacionamentos",
      price: "R$ 55,00", 
      duration: "45 min",
      icon: Heart
    },
    {
      id: 3,
      name: "Runas Profissionais",
      description: "Direcionamento para carreira, trabalho e questões financeiras",
      price: "R$ 65,00",
      duration: "50 min", 
      icon: Briefcase
    },
    {
      id: 4,
      name: "Runas da Proteção",
      description: "Consulta focada em proteção espiritual e energética",
      price: "R$ 70,00",
      duration: "55 min",
      icon: Shield
    }
  ];

  const runicSymbols = [
    { name: "Fehu", meaning: "Riqueza, gado, prosperidade material", element: "Fogo" },
    { name: "Uruz", meaning: "Força primitiva, vitalidade, poder interior", element: "Terra" },
    { name: "Thurisaz", meaning: "Gigante, força destrutiva e criativa", element: "Fogo" },
    { name: "Ansuz", meaning: "Deus, comunicação, sabedoria divina", element: "Ar" },
    { name: "Raidho", meaning: "Viagem, movimento, progresso", element: "Ar" },
    { name: "Kenaz", meaning: "Tocha, conhecimento, iluminação", element: "Fogo" },
    { name: "Gebo", meaning: "Dádiva, equilíbrio, parceria", element: "Ar" },
    { name: "Wunjo", meaning: "Alegria, harmonia, realização", element: "Terra" }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 via-blue-800 to-indigo-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 text-blue-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Consultas de Runas
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Descubra a sabedoria ancestral dos povos nórdicos através das runas sagradas. 
              Receba orientação através deste oráculo milenar de força e proteção.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Sobre as Runas */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Zap className="w-6 h-6 mr-3 text-blue-600" />
              O Poder das Runas
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              As runas são um sistema oracular ancestral utilizado pelos povos germânicos e nórdicos há mais de 
              2000 anos. Cada runa carrega em si não apenas um símbolo, mas toda uma cosmologia de significados 
              profundos conectados às forças primordiais da natureza.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Diferente de outros oráculos, as runas trabalham com energias muito diretas e práticas, oferecendo 
              orientações claras para questões do dia a dia, decisões importantes e compreensão dos ciclos de vida.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Shield className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <h4 className="font-semibold mb-2">Proteção</h4>
                <p className="text-sm text-gray-600">Orientação para proteção física, emocional e espiritual</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Zap className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <h4 className="font-semibold mb-2">Força Interior</h4>
                <p className="text-sm text-gray-600">Descoberta e fortalecimento do poder pessoal</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Home className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <h4 className="font-semibold mb-2">Orientação Prática</h4>
                <p className="text-sm text-gray-600">Conselhos diretos para situações concretas da vida</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tipos de Consulta */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Tipos de Consulta de Runas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {runicServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <IconComponent className="w-8 h-8 text-blue-600 mr-3" />
                        <div>
                          <CardTitle className="text-xl">{service.name}</CardTitle>
                          <div className="flex items-center mt-2 space-x-4">
                            <Badge variant="outline" className="text-blue-600">
                              <Clock className="w-3 h-3 mr-1" />
                              {service.duration}
                            </Badge>
                            <span className="font-semibold text-lg text-blue-600">
                              {service.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Agendar Consulta
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Significados das Runas */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Principais Runas e Seus Significados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {runicSymbols.map((rune, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-lg text-blue-700 mb-2">{rune.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{rune.meaning}</p>
                  <Badge variant="outline" className="text-xs">
                    Elemento: {rune.element}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Consultores Especializados */}
        {consultants.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Especialistas em Runas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultants.map((consultant: any) => (
                <Card key={consultant.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {consultant.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{consultant.name}</CardTitle>
                        <p className="text-sm text-gray-600">{consultant.title}</p>
                        <div className="flex items-center mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">
                            {consultant.rating} ({consultant.reviewCount} avaliações)
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {consultant.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-blue-600">
                        R$ {consultant.price}/min
                      </span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Consultar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <CardContent className="text-center py-12">
            <Shield className="w-16 h-16 mx-auto mb-6 text-blue-200" />
            <h2 className="text-3xl font-bold mb-4">
              Conecte-se com a Sabedoria Ancestral
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Descubra as respostas que procura através da força e sabedoria das runas nórdicas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Users className="w-5 h-5 mr-2" />
                Ver Todos os Consultores
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Agendar Consulta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}