import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Settings, 
  MessageCircle, 
  Phone, 
  Video, 
  DollarSign, 
  Clock, 
  Bell, 
  Shield,
  User,
  Camera
} from "lucide-react";

const configSchema = z.object({
  // Dados pessoais
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  biografia: z.string().min(50, "Biografia deve ter pelo menos 50 caracteres"),
  foto: z.string().url("URL da foto inválida").optional(),
  
  // Configurações de contato
  whatsapp: z.string().min(10, "Número do WhatsApp inválido"),
  telefone: z.string().min(10, "Número do telefone inválido").optional(),
  email: z.string().email("Email inválido"),
  
  // Configurações de atendimento
  precoPorMinuto: z.number().min(1, "Preço deve ser maior que R$ 1,00"),
  tempoMinimoConsulta: z.number().min(5, "Tempo mínimo deve ser pelo menos 5 minutos"),
  
  // Disponibilidade
  disponibilidadeChat: z.boolean(),
  disponibilidadeWhatsapp: z.boolean(),
  disponibilidadeTelefone: z.boolean(),
  disponibilidadeVideo: z.boolean(),
  
  // Configurações de horário
  horarioInicio: z.string(),
  horarioFim: z.string(),
  diasDisponiveis: z.array(z.string()),
  
  // Configurações de notificação
  notificacoesSms: z.boolean(),
  notificacoesEmail: z.boolean(),
  notificacoesPush: z.boolean(),
  
  // Status
  statusAtendimento: z.enum(["online", "ocupado", "ausente", "offline"]),
  mensagemStatus: z.string().optional()
});

type ConfigFormValues = z.infer<typeof configSchema>;

export default function ConsultorConfig() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("perfil");

  const form = useForm<ConfigFormValues>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      nome: "Redação Portal",
      biografia: "Sou tarologa há mais de 15 anos, especializada em amor e relacionamentos...",
      foto: "",
      whatsapp: "5511999999999",
      telefone: "",
      email: "maria@exemplo.com",
      precoPorMinuto: 8.50,
      tempoMinimoConsulta: 10,
      disponibilidadeChat: true,
      disponibilidadeWhatsapp: true,
      disponibilidadeTelefone: true,
      disponibilidadeVideo: false,
      horarioInicio: "09:00",
      horarioFim: "22:00",
      diasDisponiveis: ["segunda", "terca", "quarta", "quinta", "sexta"],
      notificacoesSms: true,
      notificacoesEmail: true,
      notificacoesPush: true,
      statusAtendimento: "online",
      mensagemStatus: ""
    },
  });

  const configMutation = useMutation({
    mutationFn: (data: ConfigFormValues) => apiRequest("PUT", "/api/consultant/config", data),
    onSuccess: () => {
      toast({
        title: "Configurações salvas com sucesso!",
        description: "Suas configurações foram atualizadas.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao salvar configurações",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: ConfigFormValues) {
    configMutation.mutate(values);
  }

  const diasSemana = [
    { value: "segunda", label: "Segunda-feira" },
    { value: "terca", label: "Terça-feira" },
    { value: "quarta", label: "Quarta-feira" },
    { value: "quinta", label: "Quinta-feira" },
    { value: "sexta", label: "Sexta-feira" },
    { value: "sabado", label: "Sábado" },
    { value: "domingo", label: "Domingo" }
  ];

  const tabs = [
    { id: "perfil", label: "Perfil", icon: <User className="w-4 h-4" /> },
    { id: "contato", label: "Contato", icon: <MessageCircle className="w-4 h-4" /> },
    { id: "atendimento", label: "Atendimento", icon: <Phone className="w-4 h-4" /> },
    { id: "horarios", label: "Horários", icon: <Clock className="w-4 h-4" /> },
    { id: "notificacoes", label: "Notificações", icon: <Bell className="w-4 h-4" /> },
    { id: "status", label: "Status", icon: <Shield className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-3">
            <Settings className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Configurações do Consultor</h1>
              <p className="text-gray-600">Gerencie suas configurações de atendimento e perfil</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar de Navegação */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* Tab: Perfil */}
                  {activeTab === "perfil" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold mb-6 text-gray-800">Informações do Perfil</h2>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="nome"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome Completo</FormLabel>
                              <FormControl>
                                <Input placeholder="Seu nome completo" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="foto"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>URL da Foto de Perfil</FormLabel>
                              <FormControl>
                                <Input placeholder="https://exemplo.com/foto.jpg" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="biografia"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Biografia Profissional</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Conte sobre sua experiência, especialidades e abordagem..." 
                                className="min-h-32"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  )}

                  {/* Tab: Contato */}
                  {activeTab === "contato" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold mb-6 text-gray-800">Informações de Contato</h2>
                      
                      <div className="space-y-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <MessageCircle className="w-5 h-5 text-green-600" />
                            <h3 className="font-semibold text-green-800">WhatsApp (Obrigatório)</h3>
                          </div>
                          <p className="text-sm text-green-700 mb-4">
                            Seu WhatsApp será usado para atendimento direto e notificações importantes.
                          </p>
                          
                          <FormField
                            control={form.control}
                            name="whatsapp"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Número do WhatsApp</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="5511999999999 (com código do país)" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="telefone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Telefone Adicional (Opcional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="(11) 99999-9999" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="seu@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Tab: Atendimento */}
                  {activeTab === "atendimento" && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold mb-6 text-gray-800">Configurações de Atendimento</h2>
                      
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="precoPorMinuto"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preço por Minuto (R$)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    step="0.50"
                                    min="1"
                                    placeholder="8.50" 
                                    {...field}
                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="tempoMinimoConsulta"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tempo Mínimo de Consulta (minutos)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number"
                                    min="5"
                                    placeholder="10" 
                                    {...field}
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                          <h3 className="font-semibold text-blue-800 mb-4">Tipos de Atendimento Disponíveis</h3>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="disponibilidadeChat"
                              render={({ field }) => (
                                <FormItem className="flex items-center justify-between space-y-0 p-3 border rounded-lg">
                                  <div className="flex items-center space-x-3">
                                    <MessageCircle className="w-5 h-5 text-blue-600" />
                                    <FormLabel>Chat na Plataforma</FormLabel>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="disponibilidadeWhatsapp"
                              render={({ field }) => (
                                <FormItem className="flex items-center justify-between space-y-0 p-3 border rounded-lg">
                                  <div className="flex items-center space-x-3">
                                    <MessageCircle className="w-5 h-5 text-green-600" />
                                    <FormLabel>WhatsApp</FormLabel>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="disponibilidadeTelefone"
                              render={({ field }) => (
                                <FormItem className="flex items-center justify-between space-y-0 p-3 border rounded-lg">
                                  <div className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-orange-600" />
                                    <FormLabel>Telefone</FormLabel>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="disponibilidadeVideo"
                              render={({ field }) => (
                                <FormItem className="flex items-center justify-between space-y-0 p-3 border rounded-lg">
                                  <div className="flex items-center space-x-3">
                                    <Video className="w-5 h-5 text-purple-600" />
                                    <FormLabel>Videochamada</FormLabel>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Botão de Salvar */}
                  <div className="flex justify-end pt-6 border-t border-gray-200">
                    <Button 
                      type="submit" 
                      className="px-8 py-3"
                      disabled={configMutation.isPending}
                    >
                      {configMutation.isPending ? "Salvando..." : "Salvar Configurações"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}