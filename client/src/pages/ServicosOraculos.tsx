import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Clock, 
  Users, 
  Sparkles,
  Moon,
  Sun,
  Crown,
  Flower
} from 'lucide-react';

export default function ServicosOraculos() {
  // Buscar consultores especializados em oráculos do banco
  const { data: consultants = [], isLoading } = useQuery({
    queryKey: ['/api/consultants'],
    select: (data: any[]) => data.filter(consultant => 
      consultant.specialty === 'oraculos' || 
      consultant.specialties?.includes('oraculos') ||
      consultant.title?.toLowerCase().includes('oráculo')
    )
  });

  // Buscar serviços de oráculos do banco
  const { data: services = [] } = useQuery({
    queryKey: ['/api/services'],
    select: (data: any[]) => data.filter(service => 
      service.category === 'oraculos' || 
      service.name?.toLowerCase().includes('oráculo')
    )
  });

  const oracleServices = [
    {
      id: 1,
      name: "Oráculo da Deusa",
      description: "Conexão com a energia feminina divina para orientação e cura",
      price: "R$ 70,00",
      duration: "50 min",
      icon: Moon
    },
    {
      id: 2,
      name: "Oráculo dos Anjos",
      description: "Mensagens angelicais para proteção, amor e orientação espiritual",
      price: "R$ 65,00", 
      duration: "45 min",
      icon: Sparkles
    },
    {
      id: 3,
      name: "Oráculo Xamânico",
      description: "Sabedoria ancestral e conexão com animais de poder",
      price: "R$ 80,00",
      duration: "60 min", 
      icon: Sun
    },
    {
      id: 4,
      name: "Oráculo das Fadas",
      description: "Magia e encantamento para questões do coração e criatividade",
      price: "R$ 60,00",
      duration: "40 min",
      icon: Flower
    }
  ];

  const oracleTypes = [
    {
      name: "Oráculo dos Anjos",
      description: "Cartas angelicais que trazem mensagens de proteção, amor e orientação divina",
      focus: "Proteção, cura emocional, orientação espiritual",
      energy: "Luz, paz, amor incondicional"
    },
    {
      name: "Oráculo da Deusa",
      description: "Conexão com arquétipos femininos sagrados e ciclos lunares",
      focus: "Intuição, fertilidade, poder feminino, ciclos da vida",
      energy: "Energia lunar, criação, transformação"
    },
    {
      name: "Oráculo Xamânico",
      description: "Sabedoria ancestral dos povos nativos e conexão com a natureza",
      focus: "Animais de poder, jornada da alma, cura ancestral",
      energy: "Terra, elementos, espíritos da natureza"
    },
    {
      name: "Oráculo das Fadas",
      description: "Magia elemental e conexão com seres da natureza",
      focus: "Criatividade, alegria, manifestação, magia do cotidiano",
      energy: "Leveza, encantamento, transformação suave"
    },
    {
      name: "Oráculo Cigano",
      description: "Tradição cigana com foco na sorte, amor e destino",
      focus: "Relacionamentos, prosperidade, caminhos do destino",
      energy: "Paixão, liberdade, intuição profunda"
    },
    {
      name: "Oráculo Druida",
      description: "Sabedoria celta e conexão com árvores sagradas",
      focus: "Sabedoria ancestral, ciclos sazonais, magia natural",
      energy: "Conhecimento antigo, força da natureza"
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-pink-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Consultas com Oráculos
            </h1>
            <p className="text-xl text-pink-200 max-w-3xl mx-auto">
              Conecte-se com diferentes tradições oraculares do mundo. 
              Receba orientação através de anjos, deusas, xamãs e seres mágicos.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Sobre os Oráculos */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Sparkles className="w-6 h-6 mr-3 text-pink-600" />
              O Poder dos Oráculos
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Os oráculos são sistemas divinatórios que nos conectam com diferentes aspectos da 
              sabedoria universal. Cada tradição oracular carrega energias específicas e oferece 
              perspectivas únicas sobre nossa jornada de vida.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Diferente do tarot tradicional, os oráculos trabalham com energias mais fluidas e 
              intuitivas, oferecendo mensagens de amor, cura e orientação através de diferentes 
              tradições espirituais do mundo.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <Sparkles className="w-8 h-8 mx-auto mb-3 text-pink-600" />
                <h4 className="font-semibold mb-2">Orientação Angelical</h4>
                <p className="text-sm text-gray-600">Mensagens de proteção e amor dos anjos</p>
              </div>
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <Moon className="w-8 h-8 mx-auto mb-3 text-pink-600" />
                <h4 className="font-semibold mb-2">Energia Feminina</h4>
                <p className="text-sm text-gray-600">Conexão com a sabedoria da Deusa</p>
              </div>
              <div className="text-center p-4 bg-pink-50 rounded-lg">
                <Sun className="w-8 h-8 mx-auto mb-3 text-pink-600" />
                <h4 className="font-semibold mb-2">Sabedoria Ancestral</h4>
                <p className="text-sm text-gray-600">Tradições xamânicas e indígenas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tipos de Consulta com Oráculos */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Tipos de Consulta com Oráculos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {oracleServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <IconComponent className="w-8 h-8 text-pink-600 mr-3" />
                        <div>
                          <CardTitle className="text-xl">{service.name}</CardTitle>
                          <div className="flex items-center mt-2 space-x-4">
                            <Badge variant="outline" className="text-pink-600">
                              <Clock className="w-3 h-3 mr-1" />
                              {service.duration}
                            </Badge>
                            <span className="font-semibold text-lg text-pink-600">
                              {service.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Button className="w-full bg-pink-600 hover:bg-pink-700">
                      Agendar Consulta
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Tipos de Oráculos */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Tradições Oraculares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {oracleTypes.map((oracle, index) => (
                <div key={index} className="p-6 border rounded-lg hover:shadow-md transition-shadow bg-gradient-to-br from-white to-pink-50">
                  <h4 className="font-semibold text-lg text-pink-700 mb-3">{oracle.name}</h4>
                  <p className="text-gray-600 mb-3 text-sm">{oracle.description}</p>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-sm text-gray-700">Foco: </span>
                      <span className="text-sm text-gray-600">{oracle.focus}</span>
                    </div>
                    <div>
                      <span className="font-medium text-sm text-gray-700">Energia: </span>
                      <span className="text-sm text-gray-600">{oracle.energy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Consultores Especializados */}
        {consultants.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Especialistas em Oráculos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultants.map((consultant: any) => (
                <Card key={consultant.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
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
                      <span className="font-semibold text-pink-600">
                        R$ {consultant.price}/min
                      </span>
                      <Button size="sm" className="bg-pink-600 hover:bg-pink-700">
                        Consultar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Como Escolher o Oráculo Ideal */}
        <Card className="mb-12 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="text-xl text-purple-800">Como Escolher o Oráculo Ideal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-purple-700">
              <p>• <strong>Para questões do coração:</strong> Oráculo da Deusa ou das Fadas</p>
              <p>• <strong>Para proteção e cura:</strong> Oráculo dos Anjos</p>
              <p>• <strong>Para jornada espiritual:</strong> Oráculo Xamânico ou Druida</p>
              <p>• <strong>Para amor e relacionamentos:</strong> Oráculo Cigano</p>
              <p>• <strong>Para criatividade e alegria:</strong> Oráculo das Fadas</p>
              <p>• <strong>Para sabedoria ancestral:</strong> Oráculo Druida ou Xamânico</p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-pink-600 to-purple-700 text-white">
          <CardContent className="text-center py-12">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-pink-200" />
            <h2 className="text-3xl font-bold mb-4">
              Desperte sua Magia Interior
            </h2>
            <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
              Conecte-se com tradições sagradas e receba orientação divina através dos oráculos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50">
                <Users className="w-5 h-5 mr-2" />
                Ver Todos os Consultores
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-pink-600">
                Agendar Consulta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}