import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  subject: z.string().min(5, "Assunto deve ter pelo menos 5 caracteres"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: FormValues) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  async function onSubmit(values: FormValues) {
    contactMutation.mutate(values);
  }

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Telefone",
      value: "(11) 99999-9999",
      description: "Seg a Sex, 9h às 18h"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "contato@conselhosesotericos.com.br",
      description: "Respondemos em até 24h"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Endereço",
      value: "São Paulo, SP",
      description: "Atendimento online"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Horário",
      value: "24/7 Online",
      description: "Consultores disponíveis"
    }
  ];

  const faqs = [
    {
      question: "Como funciona uma consulta online?",
      answer: "As consultas são realizadas via chat, vídeo ou áudio através da nossa plataforma segura. Você escolhe o método que preferir."
    },
    {
      question: "Qual a duração das consultas?",
      answer: "As consultas variam de 30 a 90 minutos, dependendo do tipo de serviço escolhido e das suas necessidades."
    },
    {
      question: "Como escolher o consultor ideal?",
      answer: "Você pode filtrar por especialidade, avaliações e disponibilidade. Cada consultor tem um perfil detalhado com suas especializações."
    },
    {
      question: "As consultas são confidenciais?",
      answer: "Sim, garantimos total confidencialidade. Todas as consultas são privadas e seguras, seguindo rigorosos protocolos de privacidade."
    }
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
              <MessageCircle className="w-16 h-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Entre em Contato
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                Estamos aqui para ajudar você em sua jornada espiritual. Fale conosco!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Informações de Contato */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="text-primary mb-4 flex justify-center">
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-primary font-medium mb-1">
                    {info.value}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {info.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Formulário de Contato */}
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Envie sua Mensagem
                  </h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome Completo</FormLabel>
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
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="seu@email.com" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefone</FormLabel>
                              <FormControl>
                                <Input placeholder="(11) 99999-9999" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Assunto</FormLabel>
                              <FormControl>
                                <Input placeholder="Como podemos ajudar?" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mensagem</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Descreva sua dúvida ou como podemos ajudá-lo..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-shadow"
                        disabled={contactMutation.isPending}
                      >
                        {contactMutation.isPending ? (
                          "Enviando..."
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Enviar Mensagem
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </div>
              </motion.div>

              {/* FAQ */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-8">
                  Perguntas Frequentes
                </h2>
                
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="text-lg font-bold text-gray-800 mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Atendimento Rápido */}
                <div className="mt-8 bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-3">
                    Precisa de Atendimento Imediato?
                  </h3>
                  <p className="mb-4 opacity-90">
                    Nossos consultores estão online agora para ajudá-lo
                  </p>
                  <a
                    href="/consultores"
                    className="inline-block bg-white text-primary font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Falar Agora
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mapa e Localização */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Nossa Localização
              </h2>
              <p className="text-xl text-gray-600">
                Atendemos todo o Brasil através da nossa plataforma online
              </p>
            </motion.div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Atendimento Online
                  </h3>
                  <p className="text-gray-600">
                    Consultores disponíveis 24/7 para atendê-lo onde você estiver
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}