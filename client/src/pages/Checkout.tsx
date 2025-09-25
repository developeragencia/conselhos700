import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CreditCard, ShoppingBag, Check, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

// Carregar Stripe com chave pública
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_default');

interface CheckoutFormProps {
  selectedPackage: any;
  onSuccess: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ selectedPackage, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/pagamento/sucesso`,
        },
      });

      if (error) {
        toast({
          title: "Erro no Pagamento",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Pagamento Confirmado!",
          description: "Sua compra foi processada com sucesso.",
        });
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Erro Inesperado",
        description: "Ocorreu um erro durante o processamento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
          Informações do Pagamento
        </h3>
        <PaymentElement />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processando...</span>
          </>
        ) : (
          <>
            <Check className="w-5 h-5" />
            <span>Confirmar Pagamento - R$ {selectedPackage?.price || 0}</span>
          </>
        )}
      </motion.button>
    </form>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [step, setStep] = useState(1);

  const packages = [
    {
      id: 1,
      name: "Consulta Individual",
      price: 45,
      description: "Uma consulta completa de 30 minutos",
      features: ["30 minutos de atendimento", "Chat direto", "Relatório personalizado"]
    },
    {
      id: 2,
      name: "Pacote Essencial",
      price: 120,
      originalPrice: 150,
      description: "3 consultas com desconto especial",
      features: ["3 consultas de 30 min", "Suporte via WhatsApp", "Relatórios detalhados", "Desconto de 20%"],
      popular: true
    },
    {
      id: 3,
      name: "Plano Premium",
      price: 199,
      originalPrice: 250,
      description: "5 consultas + benefícios exclusivos",
      features: ["5 consultas de 30 min", "Atendimento prioritário", "Consultas de follow-up", "Acesso a workshops"]
    }
  ];

  useEffect(() => {
    if (selectedPackage) {
      createPaymentIntent();
    }
  }, [selectedPackage]);

  const createPaymentIntent = async () => {
    try {
      const response = await apiRequest("POST", "/api/create-payment-intent", {
        amount: selectedPackage.price,
        packageId: selectedPackage.id,
        packageName: selectedPackage.name
      });
      
      const data = await response.json();
      setClientSecret(data.clientSecret);
      setStep(2);
    } catch (error) {
      console.error("Erro ao criar intent de pagamento:", error);
    }
  };

  const handlePackageSelect = (pkg: any) => {
    setSelectedPackage(pkg);
  };

  const handlePaymentSuccess = () => {
    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Pagamento Confirmado!</h2>
          <p className="text-gray-600 mb-6">
            Sua compra foi processada com sucesso. Em breve você receberá um email com os detalhes.
          </p>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700"
          >
            Ir para Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  if (step === 2 && clientSecret) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">Finalizar Compra</h1>
              <p className="text-purple-100">Complete seu pagamento de forma segura</p>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Resumo do Pedido */}
                <div>
                  <h3 className="text-xl font-semibold mb-6">Resumo do Pedido</h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{selectedPackage?.name}</h4>
                        <p className="text-gray-600 text-sm mb-2">{selectedPackage?.description}</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {selectedPackage?.features.map((feature: string, index: number) => (
                            <li key={index} className="flex items-center">
                              <Check className="w-3 h-3 text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total:</span>
                        <span className="text-2xl font-bold text-purple-600">
                          R$ {selectedPackage?.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formulário de Pagamento */}
                <div>
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm selectedPackage={selectedPackage} onSuccess={handlePaymentSuccess} />
                  </Elements>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Escolha seu Pacote</h1>
          <p className="text-xl text-gray-600">Selecione o plano ideal para suas consultas espirituais</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden ${pkg.popular ? 'ring-2 ring-purple-500 relative' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-6">{pkg.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-purple-600">R$ {pkg.price}</span>
                    {pkg.originalPrice && (
                      <span className="text-lg text-gray-400 line-through ml-2">R$ {pkg.originalPrice}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePackageSelect(pkg)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Selecionar Pacote
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-white rounded-lg shadow-md p-4">
            <AlertCircle className="w-5 h-5 text-blue-500 mr-3" />
            <span className="text-gray-700">
              Pagamento 100% seguro através do Stripe. Seus dados estão protegidos.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}