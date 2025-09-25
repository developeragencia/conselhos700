import React, { useState } from "react";
import { motion } from "framer-motion";
import { Coins, Zap, Gift, Check, Star, CreditCard, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";

interface CreditPackage {
  id: number;
  amount: number;
  price: number;
  originalPrice: number;
  bonus: number;
  economy: string;
  features: string[];
  popular: boolean;
  color: string;
}

export default function ComprarCreditos() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Buscar dados reais de pacotes de crédito do banco
  const { data: creditPackages = [], isLoading } = useQuery({
    queryKey: ['/api/credit-packages'],
    enabled: true
  });

  // Mutation para processar compra
  const purchaseMutation = useMutation({
    mutationFn: async (packageId: number) => {
      const response = await apiRequest("POST", "/api/purchase/credits", { packageId });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Compra realizada com sucesso!",
        description: `${data.creditsAdded} créditos adicionados à sua conta.`,
      });
    },
    onError: () => {
      toast({
        title: "Erro na compra",
        description: "Não foi possível processar sua compra. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  // Pacotes padrão caso não haja dados no banco
  const defaultPackages: CreditPackage[] = [
    {
      id: 1,
      amount: 50,
      price: 45,
      originalPrice: 50,
      bonus: 0,
      economy: "10%",
      features: [
        "50 créditos",
        "Válido por 60 dias",
        "Use em qualquer consultor",
        "Suporte 24h"
      ],
      popular: false,
      color: "from-indigo-600 to-indigo-700"
    },
    {
      id: 2,
      amount: 100,
      price: 85,
      originalPrice: 100,
      bonus: 10,
      economy: "15%",
      features: [
        "100 créditos + 10 bônus",
        "Válido por 90 dias",
        "Use em qualquer consultor",
        "Desconto em consultas premium",
        "Suporte prioritário"
      ],
      popular: true,
      color: "from-purple-600 to-purple-700"
    },
    {
      id: 3,
      amount: 250,
      price: 199,
      originalPrice: 250,
      bonus: 50,
      economy: "20%",
      features: [
        "250 créditos + 50 bônus",
        "Válido por 120 dias",
        "Use em qualquer consultor",
        "Acesso a consultores VIP",
        "Transferível para amigos",
        "Suporte VIP 24h"
      ],
      popular: false,
      color: "from-violet-600 to-violet-700"
    },
    {
      id: 4,
      amount: 500,
      price: 379,
      originalPrice: 500,
      bonus: 150,
      economy: "25%",
      features: [
        "500 créditos + 150 bônus",
        "Válido por 180 dias",
        "Acesso ilimitado",
        "Consultores VIP exclusivos",
        "Relatórios personalizados",
        "Gerente de conta dedicado"
      ],
      popular: false,
      color: "from-indigo-700 to-purple-700"
    }
  ];

  const packagesToShow = creditPackages.length > 0 ? creditPackages : defaultPackages;

  const handlePurchase = async (packageData: CreditPackage) => {
    if (!isAuthenticated) {
      toast({
        title: "Login necessário",
        description: "Faça login para comprar créditos.",
        variant: "destructive",
      });
      return;
    }

    setSelectedPackage(packageData.id);
    await purchaseMutation.mutateAsync(packageData.id);
    setSelectedPackage(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <section className="py-20 text-center bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4"
        >
          <div className="flex items-center justify-center mb-6">
            <Coins className="w-16 h-16 text-amber-400 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Comprar Créditos
            </h1>
          </div>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Adquira créditos para consultas com nossos especialistas certificados. 
            Investimento em autoconhecimento e orientação espiritual.
          </p>
        </motion.div>
      </section>

      {/* Credit Packages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packagesToShow.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      MAIS POPULAR
                    </Badge>
                  </div>
                )}

                <Card className={`h-full ${pkg.popular ? 'ring-2 ring-amber-400 scale-105 shadow-2xl' : 'shadow-lg'} hover:shadow-xl transition-all duration-300 bg-white`}>
                  <CardHeader className={`bg-gradient-to-br ${pkg.color} text-white rounded-t-lg relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10">
                      <CardTitle className="text-2xl font-bold text-center">
                        {pkg.amount} Créditos
                        {pkg.bonus > 0 && (
                          <span className="block text-lg font-medium opacity-95">
                            + {pkg.bonus} bônus
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription className="text-center text-white/95 mt-3">
                        <div className="text-3xl font-bold">
                          R$ {pkg.price}
                        </div>
                        {pkg.originalPrice > pkg.price && (
                          <div className="text-sm mt-1">
                            <span className="line-through opacity-80">R$ {pkg.originalPrice}</span>
                            <Badge variant="secondary" className="ml-2 bg-amber-400 text-amber-900 font-medium">
                              Economize {pkg.economy}
                            </Badge>
                          </div>
                        )}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handlePurchase(pkg)}
                      disabled={purchaseMutation.isPending && selectedPackage === pkg.id}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {purchaseMutation.isPending && selectedPackage === pkg.id ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          Processando...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Comprar Agora
                        </div>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Por que escolher nossos créditos?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sistema seguro e confiável para suas consultas espirituais
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Segurança Total",
                description: "Transações protegidas e dados criptografados para sua tranquilidade",
                color: "from-emerald-500 to-emerald-600"
              },
              {
                icon: Zap,
                title: "Ativação Instantânea",
                description: "Créditos disponíveis imediatamente após confirmação do pagamento",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Gift,
                title: "Bônus Exclusivos",
                description: "Créditos extras em pacotes maiores e promoções especiais",
                color: "from-amber-500 to-amber-600"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} flex items-center justify-center mx-auto mb-6`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Comece sua jornada espiritual hoje mesmo
              </h3>
              <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                Milhares de pessoas já transformaram suas vidas com orientações precisas. 
                Seja o próximo a descobrir seu verdadeiro caminho.
              </p>
              <div className="flex items-center justify-center gap-8 text-sm">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-amber-400 mr-2" />
                  <span>4.9/5 Avaliação</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-indigo-300 mr-2" />
                  <span>+10.000 Consultas</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-emerald-400 mr-2" />
                  <span>100% Seguro</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}