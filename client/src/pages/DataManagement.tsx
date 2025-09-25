import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Users, Star, MessageSquare } from "lucide-react";

interface Consultant {
  id: number;
  name: string;
  title: string;
  description: string;
  pricePerMinute: string;
  rating: string;
  reviewCount: number;
  imageUrl: string;
  whatsapp: string;
  specialty: string;
  isActive: boolean;
  status: string;
}

interface Testimonial {
  id: number;
  content: string;
  authorName: string;
  authorLocation: string;
  authorImageUrl: string;
  rating: number;
  createdAt: string;
}

export default function DataManagement() {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // New consultant form state
  const [newConsultant, setNewConsultant] = useState({
    name: "",
    title: "",
    description: "",
    pricePerMinute: "",
    specialty: "",
    whatsapp: "",
    imageUrl: ""
  });

  // New testimonial form state
  const [newTestimonial, setNewTestimonial] = useState({
    content: "",
    authorName: "",
    authorLocation: "",
    authorImageUrl: "",
    rating: 5
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [consultantsRes, testimonialsRes] = await Promise.all([
        apiRequest("GET", "/api/admin/consultants"),
        apiRequest("GET", "/api/testimonials")
      ]);

      if (consultantsRes.ok) {
        const consultantsData = await consultantsRes.json();
        setConsultants(consultantsData);
      }

      if (testimonialsRes.ok) {
        const testimonialsData = await testimonialsRes.json();
        setTestimonials(testimonialsData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addConsultant = async () => {
    setLoading(true);
    try {
      const response = await apiRequest("POST", "/api/admin/consultants", {
        ...newConsultant,
        pricePerMinute: parseFloat(newConsultant.pricePerMinute),
        isActive: true,
        status: "approved"
      });

      if (response.ok) {
        toast({
          title: "Consultor adicionado",
          description: "Novo consultor criado com sucesso",
        });
        setNewConsultant({
          name: "",
          title: "",
          description: "",
          pricePerMinute: "",
          specialty: "",
          whatsapp: "",
          imageUrl: ""
        });
        fetchData();
      } else {
        throw new Error("Falha ao adicionar consultor");
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao adicionar consultor",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addTestimonial = async () => {
    setLoading(true);
    try {
      const response = await apiRequest("POST", "/api/admin/testimonials", newTestimonial);

      if (response.ok) {
        toast({
          title: "Depoimento adicionado",
          description: "Novo depoimento criado com sucesso",
        });
        setNewTestimonial({
          content: "",
          authorName: "",
          authorLocation: "",
          authorImageUrl: "",
          rating: 5
        });
        fetchData();
      } else {
        throw new Error("Falha ao adicionar depoimento");
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao adicionar depoimento",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteConsultant = async (id: number) => {
    try {
      const response = await apiRequest("DELETE", `/api/admin/consultants/${id}`);
      if (response.ok) {
        toast({
          title: "Consultor removido",
          description: "Consultor deletado com sucesso",
        });
        fetchData();
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao remover consultor",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Gerenciamento de Dados Reais
          </h1>
          <p className="text-blue-200">
            Administração de consultores e depoimentos baseados em dados autênticos do banco PostgreSQL
          </p>
        </div>

        <Tabs defaultValue="consultants" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="consultants" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Consultores ({consultants.length})
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Depoimentos ({testimonials.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="consultants" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Adicionar Novo Consultor
                </CardTitle>
                <CardDescription>
                  Adicione consultores reais ao banco de dados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Nome completo"
                    value={newConsultant.name}
                    onChange={(e) => setNewConsultant({...newConsultant, name: e.target.value})}
                  />
                  <Input
                    placeholder="Título/Especialização"
                    value={newConsultant.title}
                    onChange={(e) => setNewConsultant({...newConsultant, title: e.target.value})}
                  />
                </div>
                <Textarea
                  placeholder="Descrição detalhada do consultor"
                  value={newConsultant.description}
                  onChange={(e) => setNewConsultant({...newConsultant, description: e.target.value})}
                />
                <div className="grid md:grid-cols-3 gap-4">
                  <Input
                    type="number"
                    placeholder="Preço por minuto"
                    value={newConsultant.pricePerMinute}
                    onChange={(e) => setNewConsultant({...newConsultant, pricePerMinute: e.target.value})}
                  />
                  <Input
                    placeholder="Especialidade"
                    value={newConsultant.specialty}
                    onChange={(e) => setNewConsultant({...newConsultant, specialty: e.target.value})}
                  />
                  <Input
                    placeholder="WhatsApp"
                    value={newConsultant.whatsapp}
                    onChange={(e) => setNewConsultant({...newConsultant, whatsapp: e.target.value})}
                  />
                </div>
                <Input
                  placeholder="URL da imagem"
                  value={newConsultant.imageUrl}
                  onChange={(e) => setNewConsultant({...newConsultant, imageUrl: e.target.value})}
                />
                <Button onClick={addConsultant} disabled={loading} className="w-full">
                  {loading ? "Adicionando..." : "Adicionar Consultor"}
                </Button>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {consultants.map((consultant) => (
                <Card key={consultant.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{consultant.name}</h3>
                        <p className="text-sm text-gray-600">{consultant.title}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteConsultant(consultant.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm mb-3">{consultant.description}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{consultant.rating} ({consultant.reviewCount} avaliações)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge variant={consultant.isActive ? "default" : "secondary"}>
                        {consultant.isActive ? "Ativo" : "Inativo"}
                      </Badge>
                      <span className="text-sm font-medium">R$ {consultant.pricePerMinute}/min</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Adicionar Novo Depoimento
                </CardTitle>
                <CardDescription>
                  Adicione depoimentos reais de clientes ao banco de dados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Conteúdo do depoimento"
                  value={newTestimonial.content}
                  onChange={(e) => setNewTestimonial({...newTestimonial, content: e.target.value})}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Nome do autor"
                    value={newTestimonial.authorName}
                    onChange={(e) => setNewTestimonial({...newTestimonial, authorName: e.target.value})}
                  />
                  <Input
                    placeholder="Localização"
                    value={newTestimonial.authorLocation}
                    onChange={(e) => setNewTestimonial({...newTestimonial, authorLocation: e.target.value})}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="URL da foto do autor"
                    value={newTestimonial.authorImageUrl}
                    onChange={(e) => setNewTestimonial({...newTestimonial, authorImageUrl: e.target.value})}
                  />
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    placeholder="Avaliação (1-5)"
                    value={newTestimonial.rating}
                    onChange={(e) => setNewTestimonial({...newTestimonial, rating: parseInt(e.target.value)})}
                  />
                </div>
                <Button onClick={addTestimonial} disabled={loading} className="w-full">
                  {loading ? "Adicionando..." : "Adicionar Depoimento"}
                </Button>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm mb-3">{testimonial.content}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm">{testimonial.authorName}</p>
                        <p className="text-xs text-gray-600">{testimonial.authorLocation}</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(testimonial.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}