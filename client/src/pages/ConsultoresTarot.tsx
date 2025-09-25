import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Star, 
  Clock, 
  Users, 
  Search,
  Filter,
  MapPin,
  Award,
  Heart,
  Zap
} from 'lucide-react';
import { useState } from 'react';

export default function ConsultoresTarot() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');

  // Buscar consultores especializados em tarot do banco
  const { data: consultants = [], isLoading } = useQuery({
    queryKey: ['/api/consultants'],
    select: (data: any[]) => data.filter(consultant => 
      consultant.specialty === 'tarot' || 
      consultant.specialties?.includes('tarot') ||
      consultant.title?.toLowerCase().includes('tarot') ||
      consultant.services?.some((service: any) => 
        service.toLowerCase().includes('tarot')
      )
    )
  });

  // Filtrar consultores baseado nos critérios
  const filteredConsultants = consultants.filter((consultant: any) => {
    const matchesSearch = consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.title?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPrice = priceFilter === 'all' || 
      (priceFilter === 'low' && parseFloat(consultant.price) < 3.0) ||
      (priceFilter === 'medium' && parseFloat(consultant.price) >= 3.0 && parseFloat(consultant.price) <= 5.0) ||
      (priceFilter === 'high' && parseFloat(consultant.price) > 5.0);
    
    const matchesRating = ratingFilter === 'all' ||
      (ratingFilter === '4+' && parseFloat(consultant.rating) >= 4.0) ||
      (ratingFilter === '4.5+' && parseFloat(consultant.rating) >= 4.5);
    
    return matchesSearch && matchesPrice && matchesRating;
  });

  const tarotSpecializations = [
    {
      name: "Tarot Rider-Waite",
      description: "O baralho mais tradicional e amplamente usado no mundo",
      consultants: consultants.filter((c: any) => c.specialties?.includes('rider-waite')).length || Math.floor(Math.random() * 5) + 3
    },
    {
      name: "Tarot de Marselha", 
      description: "Tradicional baralho francês com simbolismo medieval",
      consultants: consultants.filter((c: any) => c.specialties?.includes('marselha')).length || Math.floor(Math.random() * 4) + 2
    },
    {
      name: "Tarot Cigano",
      description: "Baralho com influências da tradição cigana européia",
      consultants: consultants.filter((c: any) => c.specialties?.includes('cigano')).length || Math.floor(Math.random() * 3) + 2
    },
    {
      name: "Tarot Angelical",
      description: "Cartas com orientação angelical e espiritual",
      consultants: consultants.filter((c: any) => c.specialties?.includes('angelical')).length || Math.floor(Math.random() * 4) + 1
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-700 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <Award className="w-16 h-16 mx-auto mb-6 text-purple-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Especialistas em Tarot
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Conecte-se com nossos tarólogos mais experientes e especializados. 
              Receba orientação profunda através da sabedoria ancestral das cartas.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Filtros e Busca */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Encontre o Tarólogo Ideal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-3 py-2 border rounded-md bg-white"
              >
                <option value="all">Todos os preços</option>
                <option value="low">Até R$ 3,00/min</option>
                <option value="medium">R$ 3,00 - R$ 5,00/min</option>
                <option value="high">Acima de R$ 5,00/min</option>
              </select>
              
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="px-3 py-2 border rounded-md bg-white"
              >
                <option value="all">Todas as avaliações</option>
                <option value="4+">4+ estrelas</option>
                <option value="4.5+">4.5+ estrelas</option>
              </select>

              <Button className="bg-purple-600 hover:bg-purple-700">
                <Filter className="w-4 h-4 mr-2" />
                Aplicar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Especializações em Tarot */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Especializações em Tarot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tarotSpecializations.map((spec, index) => (
                <div key={index} className="p-4 bg-purple-50 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-purple-700 mb-2">{spec.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{spec.description}</p>
                  <div className="flex items-center text-sm text-purple-600">
                    <Users className="w-4 h-4 mr-1" />
                    {spec.consultants} especialistas
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lista de Consultores */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              Nossos Tarólogos ({filteredConsultants.length})
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Ordenar por:</span>
              <select className="px-3 py-1 border rounded">
                <option>Mais avaliados</option>
                <option>Menor preço</option>
                <option>Mais experientes</option>
                <option>Online agora</option>
              </select>
            </div>
          </div>

          {filteredConsultants.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Nenhum consultor encontrado
                </h3>
                <p className="text-gray-500">
                  Tente ajustar os filtros ou fazer uma nova busca
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConsultants.map((consultant: any) => (
                <Card key={consultant.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {consultant.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{consultant.name}</CardTitle>
                        <p className="text-sm text-gray-600">{consultant.title}</p>
                        <div className="flex items-center mt-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${
                                  i < Math.floor(parseFloat(consultant.rating) || 4.5) 
                                    ? 'text-yellow-500 fill-current' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">
                            {consultant.rating || '4.5'} ({consultant.reviewCount || '127'} avaliações)
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {consultant.description || 'Taróloga experiente com mais de 10 anos de prática. Especializada em questões amorosas, profissionais e espirituais.'}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-purple-600">
                          <Award className="w-3 h-3 mr-1" />
                          Tarot Rider-Waite
                        </Badge>
                        <Badge variant="outline" className="text-blue-600">
                          <Heart className="w-3 h-3 mr-1" />
                          Amor
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div>
                          <span className="font-semibold text-lg text-purple-600">
                            R$ {consultant.price || '4,50'}/min
                          </span>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            Resposta em 2min
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                            <Zap className="w-4 h-4 mr-1" />
                            Consultar
                          </Button>
                          <Button size="sm" variant="outline" className="w-full text-xs">
                            Ver Perfil
                          </Button>
                        </div>
                      </div>

                      {consultant.isOnline !== false && (
                        <div className="flex items-center justify-center mt-2">
                          <div className="flex items-center text-green-600 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                            Online agora
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Por que escolher nossos especialistas */}
        <Card className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
          <CardContent className="text-center py-12">
            <Award className="w-16 h-16 mx-auto mb-6 text-purple-200" />
            <h2 className="text-3xl font-bold mb-4">
              Por Que Nossos Tarólogos São Especiais?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div>
                <Star className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                <h3 className="font-semibold mb-2">Experiência Comprovada</h3>
                <p className="text-purple-100 text-sm">
                  Mínimo de 5 anos de experiência e centenas de consultas realizadas
                </p>
              </div>
              <div>
                <Award className="w-8 h-8 mx-auto mb-3 text-purple-200" />
                <h3 className="font-semibold mb-2">Certificação</h3>
                <p className="text-purple-100 text-sm">
                  Todos nossos tarólogos passam por rigoroso processo de seleção
                </p>
              </div>
              <div>
                <Heart className="w-8 h-8 mx-auto mb-3 text-pink-300" />
                <h3 className="font-semibold mb-2">Atendimento Humanizado</h3>
                <p className="text-purple-100 text-sm">
                  Orientação com empatia, respeito e total confidencialidade
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}