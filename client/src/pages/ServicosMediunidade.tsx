import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Clock, 
  Users, 
  Eye,
  Heart,
  MessageCircle,
  Shield,
  Zap
} from 'lucide-react';

export default function ServicosMediunidade() {
  // Buscar consultores especializados em mediunidade do banco
  const { data: consultants = [], isLoading } = useQuery({
    queryKey: ['/api/consultants'],
    select: (data: any[]) => data.filter(consultant => 
      consultant.specialty === 'mediunidade' || 
      consultant.specialties?.includes('mediunidade') ||
      consultant.title?.toLowerCase().includes('médium') ||
      consultant.title?.toLowerCase().includes('mediunidade')
    )
  });

  // Buscar serviços de mediunidade do banco
  const { data: services = [] } = useQuery({
    queryKey: ['/api/services'],
    select: (data: any[]) => data.filter(service => 
      service.category === 'mediunidade' || 
      service.name?.toLowerCase().includes('mediunidade') ||
      service.name?.toLowerCase().includes('médium')
    )
  });

  const mediumshipServices = [
    {
      id: 1,
      name: "Psicografia Mediúnica",
      description: "Receba mensagens diretas de entes queridos através da escrita mediúnica",
      price: "R$ 95,00",
      duration: "60 min",
      icon: MessageCircle
    },
    {
      id: 2,
      name: "Consulta com Mentor Espiritual",
      description: "Orientação através de guias e mentores espirituais",
      price: "R$ 85,00", 
      duration: "50 min",
      icon: Eye
    },
    {
      id: 3,
      name: "Desobsessão Espiritual",
      description: "Limpeza e proteção contra influências espirituais negativas",
      price: "R$ 120,00",
      duration: "75 min", 
      icon: Shield
    },
    {
      id: 4,
      name: "Desenvolvimento Mediúnico",
      description: "Orientação para desenvolvimento de capacidades mediúnicas",
      price: "R$ 90,00",
      duration: "60 min",
      icon: Zap
    }
  ];

  const mediumshipTypes = [
    {
      type: "Psicografia",
      description: "Comunicação através da escrita automática, recebendo mensagens de espíritos",
      characteristics: "Ideal para receber mensagens de entes queridos falecidos"
    },
    {
      type: "Psicofonia",
      description: "O médium permite que o espírito se comunique através de sua voz",
      characteristics: "Comunicação direta e em tempo real com entidades espirituais"
    },
    {
      type: "Vidência",
      description: "Capacidade de ver e perceber presenças e energias espirituais",
      characteristics: "Visão do plano espiritual e das influências energéticas"
    },
    {
      type: "Intuição",
      description: "Recepção de informações através de insights e impressões intuitivas",
      characteristics: "Orientações sutis vindas do plano espiritual"
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <Eye className="w-16 h-16 mx-auto mb-6 text-purple-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Consultas Mediúnicas
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Conecte-se com o plano espiritual através de médiuns experientes. 
              Receba mensagens, orientações e cura espiritual através da mediunidade.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Sobre a Mediunidade */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Eye className="w-6 h-6 mr-3 text-purple-600" />
              O Que é Mediunidade
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              A mediunidade é uma capacidade natural que permite a comunicação entre o mundo físico 
              e o plano espiritual. Através de médiuns desenvolvidos e éticos, é possível receber 
              mensagens, orientações e cura espiritual de forma segura e esclarecedora.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Nossos médiuns trabalham com seriedade e responsabilidade, sempre priorizando o bem-estar 
              espiritual e emocional dos consulentes, oferecendo clareza, conforto e direcionamento 
              através da conexão com mentores espirituais e entes queridos.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <MessageCircle className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                <h4 className="font-semibold mb-2">Comunicação Espiritual</h4>
                <p className="text-sm text-gray-600">Mensagens de entes queridos e guias espirituais</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Shield className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                <h4 className="font-semibold mb-2">Proteção e Limpeza</h4>
                <p className="text-sm text-gray-600">Desobsessão e proteção contra energias negativas</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Zap className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                <h4 className="font-semibold mb-2">Desenvolvimento</h4>
                <p className="text-sm text-gray-600">Orientação para desenvolver capacidades mediúnicas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tipos de Consulta Mediúnica */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Tipos de Consulta Mediúnica</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mediumshipServices.map((service) => {
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
                      Agendar Consulta
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Tipos de Mediunidade */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Tipos de Mediunidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mediumshipTypes.map((type, index) => (
                <div key={index} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-lg text-purple-700 mb-3">{type.type}</h4>
                  <p className="text-gray-600 mb-3">{type.description}</p>
                  <p className="text-sm text-gray-500 italic">{type.characteristics}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Médiuns Especializados */}
        {consultants.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Médiuns Especializados</h2>
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
                        R$ {consultant.price}/min
                      </span>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Consultar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Orientações Importantes */}
        <Card className="mb-12 border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-xl text-amber-800">Orientações Importantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-amber-700">
              <p>• <strong>Preparação:</strong> Mantenha-se em estado de serenidade e abertura espiritual antes da consulta.</p>
              <p>• <strong>Respeito:</strong> Trate a consulta mediúnica com seriedade e respeito ao plano espiritual.</p>
              <p>• <strong>Expectativas:</strong> Tenha expectativas realistas sobre as mensagens que podem ser recebidas.</p>
              <p>• <strong>Ética:</strong> Nossos médiuns seguem rigorosos códigos éticos na prática mediúnica.</p>
              <p>• <strong>Confidencialidade:</strong> Todas as informações compartilhadas são mantidas em absoluto sigilo.</p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
          <CardContent className="text-center py-12">
            <Eye className="w-16 h-16 mx-auto mb-6 text-purple-200" />
            <h2 className="text-3xl font-bold mb-4">
              Conecte-se com o Plano Espiritual
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Receba orientações, mensagens e cura através da mediunidade consciente e ética
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                <Users className="w-5 h-5 mr-2" />
                Ver Todos os Médiuns
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                Agendar Consulta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}