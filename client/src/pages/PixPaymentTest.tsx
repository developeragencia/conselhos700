import React, { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Zap, Gift, DollarSign } from "lucide-react";
import PixPayment from "@/components/PixPayment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PixPaymentTest() {
  const [showPixPayment, setShowPixPayment] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  const creditPackages = [
    {
      id: 1,
      name: "Básico",
      credits: 30,
      price: 29.90,
      bonus: 5,
      description: "Ideal para começar",
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      popular: false
    },
    {
      id: 2,
      name: "Popular",
      credits: 60,
      price: 54.90,
      bonus: 15,
      description: "Melhor custo-benefício",
      icon: <Gift className="w-8 h-8 text-purple-500" />,
      popular: true
    },
    {
      id: 3,
      name: "Premium",
      credits: 120,
      price: 99.90,
      bonus: 30,
      description: "Para uso intensivo",
      icon: <DollarSign className="w-8 h-8 text-gold-500" />,
      popular: false
    }
  ];

  const handlePackageSelect = (pkg: any) => {
    setSelectedPackage(pkg);
    setShowPixPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPixPayment(false);
    setSelectedPackage(null);
    alert("Pagamento confirmado! Créditos adicionados à sua conta.");
  };

  const handlePaymentCancel = () => {
    setShowPixPayment(false);
    setSelectedPackage(null);
  };

  if (showPixPayment && selectedPackage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <PixPayment
          amount={selectedPackage.price}
          description={`Compra de Créditos - Pacote ${selectedPackage.name}`}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
          userCpf="12345678901" // Em produção, pegar do usuário logado
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Sistema de Pagamento PIX
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Teste completo do sistema PIX integrado ao Portal Esotérico. 
            Escolha um pacote de créditos e experimente o pagamento instantâneo.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {creditPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`relative h-full ${pkg.popular ? 'ring-2 ring-purple-500 shadow-xl' : 'shadow-lg'} hover:shadow-xl transition-shadow`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      MAIS POPULAR
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl w-fit">
                    {pkg.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    {pkg.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {pkg.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-center space-y-4">
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-purple-600">
                      R$ {pkg.price.toFixed(2)}
                    </div>
                    <div className="text-lg text-gray-700">
                      {pkg.credits} créditos
                    </div>
                    {pkg.bonus > 0 && (
                      <div className="text-green-600 font-semibold">
                        + {pkg.bonus} créditos bônus
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Total de créditos:</span>
                      <span className="font-semibold">{pkg.credits + pkg.bonus}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Custo por crédito:</span>
                      <span className="font-semibold">
                        R$ {(pkg.price / (pkg.credits + pkg.bonus)).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handlePackageSelect(pkg)}
                    className={`w-full py-3 ${
                      pkg.popular 
                        ? 'bg-purple-600 hover:bg-purple-700' 
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Pagar com PIX
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              icon: <Zap className="w-6 h-6 text-blue-500" />,
              title: "Pagamento Instantâneo",
              description: "Confirmação em segundos via PIX"
            },
            {
              icon: <CreditCard className="w-6 h-6 text-green-500" />,
              title: "QR Code Dinâmico",
              description: "Geração automática do código de pagamento"
            },
            {
              icon: <Gift className="w-6 h-6 text-purple-500" />,
              title: "Créditos Bônus",
              description: "Ganhe créditos extras em todos os pacotes"
            },
            {
              icon: <DollarSign className="w-6 h-6 text-orange-500" />,
              title: "Melhor Preço",
              description: "Valores justos e transparentes"
            }
          ].map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Demo Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200"
        >
          <h3 className="text-lg font-bold text-blue-800 mb-2">
            🔧 Modo de Demonstração
          </h3>
          <p className="text-blue-700 text-sm">
            Este é um ambiente de teste. O sistema PIX está totalmente funcional, mas os pagamentos 
            não serão processados realmente. Em produção, configure as variáveis de ambiente:
            PIX_KEY, MERCHANT_NAME, MERCHANT_CITY.
          </p>
        </motion.div>
      </div>
    </div>
  );
}