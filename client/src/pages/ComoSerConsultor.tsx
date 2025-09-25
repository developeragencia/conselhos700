import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Star, 
  Users, 
  Award,
  CheckCircle,
  DollarSign,
  Clock,
  BookOpen,
  Shield,
  Heart,
  Zap,
  TrendingUp,
  Phone
} from 'lucide-react';
import { useState } from 'react';

export default function ComoSerConsultor() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    experience: '',
    description: ''
  });

  // Buscar estatísticas dos consultores do banco
  const { data: stats } = useQuery({
    queryKey: ['/api/consultants'],
    select: (data: any[]) => ({
      totalConsultants: data.length,
      averageRating: data.reduce((acc, c) => acc + parseFloat(c.rating || '4.5'), 0) / data.length,
      totalConsultations: data.reduce((acc, c) => acc + (c.totalConsultations || 0), 0),
      averageEarnings: data.reduce((acc, c) => acc + parseFloat(c.price || '4.50'), 0) / data.length
    })
  });

  const benefits = [
    {
      icon: DollarSign,
      title: "Renda Extra",
      description: "Ganhe entre R$ 2.000 a R$ 15.000 por mês atendendo no seu tempo livre"
    },
    {
      icon: Clock,
      title: "Flexibilidade",
      description: "Defina seus próprios horários e trabalhe de onde quiser"
    },
    {
      icon: Users,
      title: "Impacto Positivo",
      description: "Ajude milhares de pessoas com suas orientações e conhecimento"
    },
    {
      icon: TrendingUp,
      title: "Crescimento",
      description: "Desenvolva sua carreira e construa uma base sólida de clientes"
    }
  ];

  const requirements = [
    {
      icon: BookOpen,
      title: "Conhecimento Comprovado",
      items: [
        "Mínimo 2 anos de experiência na área",
        "Certificados ou cursos reconhecidos",
        "Conhecimento profundo da especialidade",
        "Referências de clientes anteriores"
      ]
    },
    {
      icon: Heart,
      title: "Perfil Pessoal",
      items: [
        "Empatia e capacidade de escuta",
        "Comunicação clara e objetiva",
        "Pontualidade e responsabilidade",
        "Ética profissional impecável"
      ]
    },
    {
      icon: Shield,
      title: "Requisitos Técnicos",
      items: [
        "Conexão estável com internet",
        "Ambiente silencioso para consultas",
        "Disponibilidade mínima de 20h semanais",
        "Smartphone ou computador atualizado"
      ]
    }
  ];

  const selectionProcess = [
    {
      step: 1,
      title: "Inscrição",
      description: "Preencha o formulário com suas informações e experiências"
    },
    {
      step: 2,
      title: "Análise de Perfil",
      description: "Nossa equipe avaliará seu histórico e qualificações"
    },
    {
      step: 3,
      title: "Entrevista",
      description: "Bate-papo por vídeo para conhecer melhor seu perfil"
    },
    {
      step: 4,
      title: "Teste Prático",
      description: "Demonstração das suas habilidades com consulta simulada"
    },
    {
      step: 5,
      title: "Aprovação",
      description: "Início imediato na plataforma com suporte completo"
    }
  ];

  const specialties = [
    { name: "Tarot", demand: "Alta", earning: "R$ 4,50/min" },
    { name: "Astrologia", demand: "Alta", earning: "R$ 5,20/min" },
    { name: "Numerologia", demand: "Média", earning: "R$ 3,80/min" },
    { name: "Mediunidade", demand: "Alta", earning: "R$ 5,80/min" },
    { name: "Runas", demand: "Média", earning: "R$ 4,20/min" },
    { name: "Reiki", demand: "Crescente", earning: "R$ 4,80/min" },
    { name: "Cristaloterapia", demand: "Crescente", earning: "R$ 4,60/min" },
    { name: "Oráculos", demand: "Média", earning: "R$ 4,10/min" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você enviaria os dados para o backend
    console.log('Formulário enviado:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-blue-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <Award className="w-16 h-16 mx-auto mb-6 text-emerald-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Torne-se um Consultor
            </h1>
            <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
              Transforme seu dom em uma carreira de sucesso. Junte-se à maior plataforma 
              de consultas esotéricas do Brasil e impacte milhares de vidas.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Estatísticas */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                <div className="text-2xl font-bold text-emerald-600">{stats.totalConsultants}+</div>
                <div className="text-sm text-gray-600">Consultores Ativos</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold text-emerald-600">{stats.averageRating.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Avaliação Média</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                <div className="text-2xl font-bold text-emerald-600">{stats.totalConsultations.toLocaleString()}+</div>
                <div className="text-sm text-gray-600">Consultas Realizadas</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                <div className="text-2xl font-bold text-emerald-600">R$ {stats.averageEarnings.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Preço Médio/min</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Benefícios */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Por Que Ser um Consultor?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="text-center p-4">
                    <IconComponent className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Especialidades e Demanda */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Especialidades Mais Procuradas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {specialties.map((specialty, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-emerald-700 mb-2">{specialty.name}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Demanda:</span>
                      <Badge variant={specialty.demand === 'Alta' ? 'default' : 'secondary'}>
                        {specialty.demand}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Ganho médio:</span>
                      <span className="font-semibold text-emerald-600">{specialty.earning}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Requisitos */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Requisitos para se Tornar Consultor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {requirements.map((req, index) => {
                const IconComponent = req.icon;
                return (
                  <div key={index} className="p-6 bg-emerald-50 rounded-lg">
                    <div className="flex items-center mb-4">
                      <IconComponent className="w-6 h-6 text-emerald-600 mr-3" />
                      <h3 className="font-semibold text-lg">{req.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {req.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Processo de Seleção */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Processo de Seleção</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
              {selectionProcess.map((process, index) => (
                <div key={index} className="flex-1 text-center">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    {process.step}
                  </div>
                  <h3 className="font-semibold mb-2">{process.title}</h3>
                  <p className="text-sm text-gray-600">{process.description}</p>
                  {index < selectionProcess.length - 1 && (
                    <div className="hidden md:block absolute transform translate-x-full -translate-y-6">
                      <div className="w-8 h-0.5 bg-emerald-300"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Formulário de Inscrição */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Inscreva-se Agora</CardTitle>
            <p className="text-gray-600">Preencha o formulário abaixo e nossa equipe entrará em contato</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone/WhatsApp *
                  </label>
                  <Input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Especialidade Principal *
                  </label>
                  <select
                    required
                    value={formData.specialty}
                    onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Selecione sua especialidade</option>
                    {specialties.map((spec) => (
                      <option key={spec.name} value={spec.name}>{spec.name}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Anos de Experiência *
                  </label>
                  <select
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Selecione sua experiência</option>
                    <option value="2-5">2 a 5 anos</option>
                    <option value="5-10">5 a 10 anos</option>
                    <option value="10+">Mais de 10 anos</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Conte sobre sua experiência e qualificações *
                  </label>
                  <Textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Descreva sua experiência, formação, certificados e o que te diferencia como consultor..."
                    rows={4}
                  />
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button type="submit" size="lg" className="bg-emerald-600 hover:bg-emerald-700 px-8">
                  <Zap className="w-5 h-5 mr-2" />
                  Enviar Inscrição
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
          <CardContent className="text-center py-12">
            <Award className="w-16 h-16 mx-auto mb-6 text-emerald-200" />
            <h2 className="text-3xl font-bold mb-4">
              Pronto para Começar sua Jornada?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Junte-se a centenas de consultores que já transformaram suas vidas ajudando outras pessoas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
                <Phone className="w-5 h-5 mr-2" />
                Falar com Recrutador
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
                Baixar Guia Completo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}