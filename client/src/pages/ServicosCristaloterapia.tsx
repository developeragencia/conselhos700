import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Clock, 
  Users, 
  Gem,
  Heart,
  Shield,
  Zap,
  Sparkles
} from 'lucide-react';

export default function ServicosCristaloterapia() {
  // Buscar consultores especializados em cristaloterapia do banco
  const { data: consultants = [], isLoading } = useQuery({
    queryKey: ['/api/consultants'],
    select: (data: any[]) => data.filter(consultant => 
      consultant.specialty === 'cristaloterapia' || 
      consultant.specialties?.includes('cristaloterapia') ||
      consultant.title?.toLowerCase().includes('cristal')
    )
  });

  // Buscar serviços de cristaloterapia do banco
  const { data: services = [] } = useQuery({
    queryKey: ['/api/services'],
    select: (data: any[]) => data.filter(service => 
      service.category === 'cristaloterapia' || 
      service.name?.toLowerCase().includes('cristal')
    )
  });

  const crystalServices = [
    {
      id: 1,
      name: "Limpeza e Harmonização dos Chakras",
      description: "Alinhamento energético completo usando cristais específicos para cada chakra",
      price: "R$ 85,00",
      duration: "60 min",
      icon: Zap
    },
    {
      id: 2,
      name: "Cura com Cristais",
      description: "Sessão terapêutica direcionada usando propriedades específicas dos cristais",
      price: "R$ 75,00", 
      duration: "50 min",
      icon: Heart
    },
    {
      id: 3,
      name: "Proteção Energética",
      description: "Criação de escudo protetor usando cristais de proteção e limpeza áurica",
      price: "R$ 80,00",
      duration: "55 min", 
      icon: Shield
    },
    {
      id: 4,
      name: "Programação de Cristais",
      description: "Ativação e programação de cristais pessoais para objetivos específicos",
      price: "R$ 70,00",
      duration: "45 min",
      icon: Sparkles
    }
  ];

  const healingCrystals = [
    {
      name: "Quartzo Rosa",
      properties: "Amor próprio, cura emocional, relacionamentos",
      chakra: "Chakra Cardíaco",
      color: "Rosa suave",
      element: "Água"
    },
    {
      name: "Ametista", 
      properties: "Espiritualidade, intuição, proteção, tranquilidade",
      chakra: "Chakra Coronário",
      color: "Violeta",
      element: "Ar"
    },
    {
      name: "Quartzo Verde",
      properties: "Cura do coração, abundância, crescimento",
      chakra: "Chakra Cardíaco", 
      color: "Verde",
      element: "Terra"
    },
    {
      name: "Citrino",
      properties: "Prosperidade, autoestima, energia vital",
      chakra: "Chakra do Plexo Solar",
      color: "Amarelo dourado",
      element: "Fogo"
    },
    {
      name: "Sodalita",
      properties: "Comunicação, verdade, sabedoria",
      chakra: "Chakra Laríngeo",
      color: "Azul profundo",
      element: "Ar"
    },
    {
      name: "Hematita",
      properties: "Proteção, aterramento, força",
      chakra: "Chakra Raiz",
      color: "Metálico escuro",
      element: "Terra"
    },
    {
      name: "Cornalina",
      properties: "Criatividade, coragem, vitalidade",
      chakra: "Chakra Sacral",
      color: "Laranja avermelhado",
      element: "Fogo"
    },
    {
      name: "Lápis Lazúli",
      properties: "Sabedoria, clareza mental, intuição",
      chakra: "Chakra Frontal",
      color: "Azul intenso",
      element: "Água"
    }
  ];

  const chakraSystem = [
    { name: "Raiz", color: "Vermelho", crystals: "Hematita, Jaspe Vermelho, Granada" },
    { name: "Sacral", color: "Laranja", crystals: "Cornalina, Calcita Laranja, Pedra do Sol" },
    { name: "Plexo Solar", color: "Amarelo", crystals: "Citrino, Âmbar, Pirita" },
    { name: "Cardíaco", color: "Verde/Rosa", crystals: "Quartzo Rosa, Quartzo Verde, Esmeralda" },
    { name: "Laríngeo", color: "Azul", crystals: "Sodalita, Água Marinha, Lápis Lazúli" },
    { name: "Frontal", color: "Índigo", crystals: "Lápis Lazúli, Fluorita, Safira" },
    { name: "Coronário", color: "Violeta/Branco", crystals: "Ametista, Quartzo Branco, Selenita" }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <Gem className="w-16 h-16 mx-auto mb-6 text-purple-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cristaloterapia
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Descubra o poder de cura dos cristais e minerais. 
              Harmonize sua energia através da sabedoria milenar das pedras preciosas.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Sobre a Cristaloterapia */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Gem className="w-6 h-6 mr-3 text-purple-600" />
              O Poder dos Cristais
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              A cristaloterapia é uma terapia holística ancestral que utiliza as propriedades 
              energéticas dos cristais e minerais para promover cura física, emocional e espiritual. 
              Cada cristal possui uma frequência vibracional única que interage com nosso campo energético.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Os cristais atuam como amplificadores, transmutadores e estabilizadores de energia, 
              ajudando a restaurar o equilíbrio natural do corpo e da mente. Esta prática milenar 
              combina conhecimento científico sobre estruturas cristalinas com sabedoria espiritual antiga.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Zap className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                <h4 className="font-semibold mb-2">Harmonização Energética</h4>
                <p className="text-sm text-gray-600">Equilibrio dos chakras e meridianos energéticos</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Heart className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                <h4 className="font-semibold mb-2">Cura Holística</h4>
                <p className="text-sm text-gray-600">Tratamento integrado do corpo, mente e espírito</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Shield className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                <h4 className="font-semibold mb-2">Proteção Energética</h4>
                <p className="text-sm text-gray-600">Criação de escudos protetivos contra energias negativas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tipos de Sessão de Cristaloterapia */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Modalidades de Cristaloterapia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {crystalServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <IconComponent className="w-8 h-8 text-purple-600 mr-3" />
                        <div>
                          <CardTitle className="text-xl">{service.name}</CardTitle>
                          <div className="flex items-center mt-2 space-x-4">
                            <Badge variant="outline" className="text-purple-600">
                              <Clock className="w-3 h-3 mr-1" />
                              {service.duration}
                            </Badge>
                            <span className="font-semibold text-lg text-purple-600">
                              {service.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Agendar Sessão
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Sistema de Chakras */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Cristais para os Chakras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
              {chakraSystem.map((chakra, index) => (
                <div key={index} className="p-4 border rounded-lg text-center hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-full mx-auto mb-3`} 
                       style={{ backgroundColor: chakra.color.toLowerCase() }}></div>
                  <h4 className="font-semibold text-sm text-gray-800 mb-2">{chakra.name}</h4>
                  <p className="text-xs text-gray-600">{chakra.crystals}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cristais de Cura */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Principais Cristais de Cura</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healingCrystals.map((crystal, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow bg-gradient-to-br from-white to-purple-50">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Gem className="w-6 h-6 text-purple-600" />
                    <CardTitle className="text-lg">{crystal.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium text-sm text-gray-700">Propriedades: </span>
                    <p className="text-sm text-gray-600">{crystal.properties}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm text-gray-700">Chakra: </span>
                    <span className="text-sm text-gray-600">{crystal.chakra}</span>
                  </div>
                  <div>
                    <span className="font-medium text-sm text-gray-700">Cor: </span>
                    <span className="text-sm text-gray-600">{crystal.color}</span>
                  </div>
                  <div>
                    <span className="font-medium text-sm text-gray-700">Elemento: </span>
                    <span className="text-sm text-gray-600">{crystal.element}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Cristaloterapeutas Especializados */}
        {consultants.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Cristaloterapeutas Especializados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultants.map((consultant: any) => (
                <Card key={consultant.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
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
                      <span className="font-semibold text-purple-600">
                        R$ {consultant.price}/sessão
                      </span>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Agendar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Cuidados com os Cristais */}
        <Card className="mb-12 border-indigo-200 bg-indigo-50">
          <CardHeader>
            <CardTitle className="text-xl text-indigo-800">Cuidados e Limpeza dos Cristais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-indigo-700">
              <p>• <strong>Limpeza Energética:</strong> Limpe seus cristais regularmente com água corrente, sal marinho ou defumação com sálvia.</p>
              <p>• <strong>Recarga:</strong> Exponha os cristais à luz solar ou lunar para recarregar suas energias naturais.</p>
              <p>• <strong>Programação:</strong> Defina intenções claras ao trabalhar com cada cristal específico.</p>
              <p>• <strong>Armazenamento:</strong> Guarde os cristais em locais limpos, preferencialmente envolvidos em tecidos naturais.</p>
              <p>• <strong>Intuição:</strong> Confie em sua intuição ao escolher quais cristais usar em cada momento.</p>
              <p>• <strong>Respeito:</strong> Trate os cristais com reverência, reconhecendo-os como seres vivos da natureza.</p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
          <CardContent className="text-center py-12">
            <Gem className="w-16 h-16 mx-auto mb-6 text-purple-200" />
            <h2 className="text-3xl font-bold mb-4">
              Desperte o Poder dos Cristais
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Conecte-se com a sabedoria ancestral dos minerais e transforme sua energia através da cristaloterapia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                <Users className="w-5 h-5 mr-2" />
                Ver Todos os Terapeutas
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                Agendar Sessão
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}