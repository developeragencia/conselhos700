import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Clock, 
  Users, 
  Zap,
  Heart,
  Shield,
  Waves,
  Sun
} from 'lucide-react';

export default function ServicosReiki() {
  // Buscar consultores especializados em reiki do banco
  const { data: consultants = [], isLoading } = useQuery({
    queryKey: ['/api/consultants'],
    select: (data: any[]) => data.filter(consultant => 
      consultant.specialty === 'reiki' || 
      consultant.specialties?.includes('reiki') ||
      consultant.title?.toLowerCase().includes('reiki')
    )
  });

  // Buscar serviços de reiki do banco
  const { data: services = [] } = useQuery({
    queryKey: ['/api/services'],
    select: (data: any[]) => data.filter(service => 
      service.category === 'reiki' || 
      service.name?.toLowerCase().includes('reiki')
    )
  });

  const reikiServices = [
    {
      id: 1,
      name: "Reiki Tradicional Usui",
      description: "Cura energética tradicional através da imposição de mãos",
      price: "R$ 80,00",
      duration: "60 min",
      icon: Sun
    },
    {
      id: 2,
      name: "Reiki à Distância",
      description: "Envio de energia curativa através de conexão energética remota",
      price: "R$ 65,00", 
      duration: "45 min",
      icon: Waves
    },
    {
      id: 3,
      name: "Reiki Karuna",
      description: "Reiki de alta vibração focado em cura emocional profunda",
      price: "R$ 90,00",
      duration: "60 min", 
      icon: Heart
    },
    {
      id: 4,
      name: "Reiki para Animais",
      description: "Aplicação específica de reiki para cura de animais de estimação",
      price: "R$ 70,00",
      duration: "45 min",
      icon: Shield
    }
  ];

  const reikiLevels = [
    {
      level: "Nível 1 - Shoden",
      description: "Primeiro grau de Reiki, focado na autocura e cura de outros por contato direto",
      capabilities: [
        "Autocura através da energia Reiki",
        "Cura de outras pessoas por imposição de mãos",
        "Purificação energética de objetos e ambientes",
        "Conexão inicial com a energia universal"
      ]
    },
    {
      level: "Nível 2 - Okuden", 
      description: "Segundo grau que introduz símbolos sagrados e cura à distância",
      capabilities: [
        "Uso dos símbolos sagrados do Reiki",
        "Cura à distância sem limitações físicas",
        "Cura mental e emocional direcionada",
        "Amplificação da energia através dos símbolos"
      ]
    },
    {
      level: "Nível 3A - Shinpiden",
      description: "Mestrado interior focado no crescimento espiritual pessoal",
      capabilities: [
        "Símbolo do Mestre para cura espiritual",
        "Aprofundamento da conexão espiritual",
        "Cura em níveis mais profundos da alma",
        "Preparação para o ensino do Reiki"
      ]
    },
    {
      level: "Nível 3B - Shihan",
      description: "Mestrado completo com capacidade de iniciar outros no Reiki",
      capabilities: [
        "Realizar iniciações em todos os níveis",
        "Ensinar e formar novos reikianos",
        "Domínio completo dos símbolos e técnicas",
        "Responsabilidade de preservar a linhagem"
      ]
    }
  ];

  const reikiBenefits = [
    "Redução do estresse e ansiedade",
    "Alívio de dores físicas crônicas",
    "Melhora na qualidade do sono",
    "Fortalecimento do sistema imunológico",
    "Equilíbrio emocional e mental",
    "Aceleração de processos de cura",
    "Limpeza e harmonização dos chakras",
    "Aumento da vitalidade e disposição"
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-blue-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-teal-700 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <Sun className="w-16 h-16 mx-auto mb-6 text-green-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Terapia Reiki
            </h1>
            <p className="text-xl text-green-200 max-w-3xl mx-auto">
              Experimente a cura através da energia universal do Reiki. 
              Promova equilíbrio, bem-estar e cura em todos os níveis do seu ser.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Sobre o Reiki */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Sun className="w-6 h-6 mr-3 text-green-600" />
              O Que é Reiki
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              O Reiki é uma técnica japonesa de cura energética desenvolvida por Mikao Usui no início 
              do século XX. A palavra "Reiki" significa "energia vital universal" (rei = universal, 
              ki = energia vital) e baseia-se na canalização desta energia através das mãos.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Esta prática holística promove o relaxamento, reduz o estresse e estimula os processos 
              naturais de cura do corpo. O Reiki trabalha em todos os níveis - físico, mental, 
              emocional e espiritual - restaurando o equilíbrio energético.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Zap className="w-8 h-8 mx-auto mb-3 text-green-600" />
                <h4 className="font-semibold mb-2">Energia Universal</h4>
                <p className="text-sm text-gray-600">Canalização da energia vital do universo</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Heart className="w-8 h-8 mx-auto mb-3 text-green-600" />
                <h4 className="font-semibold mb-2">Cura Holística</h4>
                <p className="text-sm text-gray-600">Tratamento em todos os níveis do ser</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Shield className="w-8 h-8 mx-auto mb-3 text-green-600" />
                <h4 className="font-semibold mb-2">Não Invasivo</h4>
                <p className="text-sm text-gray-600">Técnica suave e completamente segura</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tipos de Sessão de Reiki */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Modalidades de Reiki</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reikiServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <IconComponent className="w-8 h-8 text-green-600 mr-3" />
                        <div>
                          <CardTitle className="text-xl">{service.name}</CardTitle>
                          <div className="flex items-center mt-2 space-x-4">
                            <Badge variant="outline" className="text-green-600">
                              <Clock className="w-3 h-3 mr-1" />
                              {service.duration}
                            </Badge>
                            <span className="font-semibold text-lg text-green-600">
                              {service.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Agendar Sessão
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Benefícios do Reiki */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Benefícios do Reiki</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {reikiBenefits.map((benefit, index) => (
                <div key={index} className="p-4 bg-green-50 rounded-lg text-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-semibold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Níveis do Reiki */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Níveis de Formação em Reiki</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reikiLevels.map((level, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-green-700">{level.level}</CardTitle>
                  <p className="text-gray-600">{level.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {level.capabilities.map((capability, capIndex) => (
                      <li key={capIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Reikianos Especializados */}
        {consultants.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Mestres e Terapeutas Reiki</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultants.map((consultant: any) => (
                <Card key={consultant.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
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
                      <span className="font-semibold text-green-600">
                        R$ {consultant.price}/sessão
                      </span>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Agendar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Preparação para a Sessão */}
        <Card className="mb-12 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-xl text-blue-800">Preparação para a Sessão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-blue-700">
              <p>• <strong>Hidratação:</strong> Beba bastante água antes e depois da sessão para facilitar a eliminação de toxinas.</p>
              <p>• <strong>Roupas:</strong> Use roupas confortáveis e soltas para melhor circulação energética.</p>
              <p>• <strong>Alimentação:</strong> Evite refeições pesadas antes da sessão, prefira algo leve.</p>
              <p>• <strong>Medicamentos:</strong> Continue tomando medicamentos prescritos normalmente - o Reiki é complementar.</p>
              <p>• <strong>Abertura:</strong> Mantenha-se receptivo e relaxado durante toda a sessão.</p>
              <p>• <strong>Após a sessão:</strong> Reserve um tempo para descanso e observe as sensações do seu corpo.</p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-green-600 to-teal-700 text-white">
          <CardContent className="text-center py-12">
            <Sun className="w-16 h-16 mx-auto mb-6 text-green-200" />
            <h2 className="text-3xl font-bold mb-4">
              Desperte sua Energia Vital
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Experimente a cura suave e profunda do Reiki para restaurar seu equilíbrio e vitalidade
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                <Users className="w-5 h-5 mr-2" />
                Ver Todos os Terapeutas
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                Agendar Sessão
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}