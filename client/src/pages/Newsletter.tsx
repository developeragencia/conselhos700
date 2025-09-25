import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Star, Gift, BookOpen, Bell, Users } from "lucide-react";

const newsletterSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  interesses: z.array(z.string()).min(1, "Selecione pelo menos um interesse"),
  frequencia: z.string().min(1, "Selecione a frequência"),
  comoConheceu: z.string().optional(),
  aceitarTermos: z.boolean().refine(val => val === true, "Você deve aceitar os termos")
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export default function Newsletter() {
  const { toast } = useToast();

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      nome: "",
      email: "",
      interesses: [],
      frequencia: "",
      comoConheceu: "",
      aceitarTermos: false
    },
  });

  const newsletterMutation = useMutation({
    mutationFn: (data: NewsletterFormValues) => apiRequest("POST", "/api/newsletter/subscribe", data),
    onSuccess: () => {
      toast({
        title: "Inscrição realizada com sucesso!",
        description: "Você receberá nossos conteúdos exclusivos em breve. Verifique sua caixa de entrada.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Erro na inscrição",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: NewsletterFormValues) {
    newsletterMutation.mutate(values);
  }

  const interesses = [
    "Tarot", "Astrologia", "Numerologia", "Mediunidade", 
    "Espiritualidade", "Autoconhecimento", "Meditação", 
    "Cristais", "Feng Shui", "Rituais", "Luna", "Chakras"
  ];

  const frequencias = [
    { value: "diaria", label: "Diária - Dicas e inspirações" },
    { value: "semanal", label: "Semanal - Resumo dos melhores conteúdos" },
    { value: "quinzenal", label: "Quinzenal - Artigos aprofundados" },
    { value: "mensal", label: "Mensal - Newsletter completa" }
  ];

  const beneficios = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Conteúdo Exclusivo",
      description: "Artigos, dicas e conhecimentos que só assinantes recebem"
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Ofertas Especiais",
      description: "Descontos exclusivos em consultas e produtos"
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Novidades em Primeira Mão",
      description: "Seja o primeiro a saber sobre novos consultores e serviços"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Horóscopo Personalizado",
      description: "Previsões astrológicas baseadas no seu perfil"
    }
  ];

  const estatisticas = [
    { numero: "50.000+", label: "Assinantes Ativos" },
    { numero: "95%", label: "Taxa de Satisfação" },
    { numero: "3x", label: "Conteúdos por Semana" },
    { numero: "100%", label: "Gratuito" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/90 to-secondary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Mail className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Newsletter Esotérica
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Receba conhecimento espiritual, dicas práticas e ofertas exclusivas diretamente no seu email
            </p>
          </motion.div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {estatisticas.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.numero}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            O que você vai receber
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            {beneficios.map((beneficio, index) => (
              <motion.div
                key={beneficio.title}
                className="text-center bg-white rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-primary mb-4 flex justify-center">
                  {beneficio.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {beneficio.title}
                </h3>
                <p className="text-gray-600">
                  {beneficio.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="bg-white rounded-3xl shadow-xl p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
                Inscreva-se Gratuitamente
              </h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome *</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome" {...field} />
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
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="seu@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="frequencia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frequência de Envio *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Com que frequência quer receber?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {frequencias.map(freq => (
                              <SelectItem key={freq.value} value={freq.value}>
                                {freq.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="interesses"
                    render={() => (
                      <FormItem>
                        <FormLabel>Seus Interesses *</FormLabel>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {interesses.map((interesse) => (
                            <FormField
                              key={interesse}
                              control={form.control}
                              name="interesses"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={interesse}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(interesse)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, interesse])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== interesse
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {interesse}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="comoConheceu"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Como nos conheceu?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma opção (opcional)" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="google">Google</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="youtube">YouTube</SelectItem>
                            <SelectItem value="indicacao">Indicação</SelectItem>
                            <SelectItem value="blog">Blog/Site</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="aceitarTermos"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Aceito receber emails promocionais e concordo com a{" "}
                            <a href="/privacidade" className="text-primary hover:underline">
                              Política de Privacidade
                            </a>{" "}
                            *
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full py-6 text-lg font-semibold"
                    disabled={newsletterMutation.isPending}
                  >
                    {newsletterMutation.isPending ? "Inscrevendo..." : "Inscrever-se Gratuitamente"}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  Você pode cancelar sua inscrição a qualquer momento. Sem spam, prometemos!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Preview Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Exemplo do que você vai receber
          </motion.h2>

          <div className="max-w-3xl mx-auto">
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h3 className="text-lg font-bold text-gray-800">
                  Newsletter Semanal - Conselhos Esotéricos ✨
                </h3>
                <p className="text-sm text-gray-600">
                  Esta semana: Lua Nova em Peixes e seus efeitos
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">🌙 Horóscopo da Semana</h4>
                    <p className="text-gray-600 text-sm">Previsões personalizadas para seu signo</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">🔮 Carta do Tarot da Semana</h4>
                    <p className="text-gray-600 text-sm">Orientação espiritual para os próximos dias</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">💎 Cristal da Semana</h4>
                    <p className="text-gray-600 text-sm">Como usar a energia dos cristais</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800">🎁 Oferta Exclusiva</h4>
                    <p className="text-gray-600 text-sm">20% de desconto em consultas de Tarot</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Este é apenas um exemplo do rico conteúdo que você receberá
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Users className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Junte-se a mais de 50.000 pessoas
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Que já transformaram suas vidas com nossos conteúdos exclusivos sobre espiritualidade
            </p>
            <a
              href="#form"
              className="inline-block bg-white text-primary font-bold py-4 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Quero Me Inscrever Agora
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}