"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, Check, Star } from "lucide-react";

interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  bonus: number;
  popular?: boolean;
}

const creditPackages: CreditPackage[] = [
  {
    id: "basic",
    name: "Básico",
    credits: 20,
    price: 20,
    bonus: 0
  },
  {
    id: "popular",
    name: "Popular",
    credits: 50,
    price: 45,
    bonus: 5,
    popular: true
  },
  {
    id: "premium",
    name: "Premium",
    credits: 100,
    price: 80,
    bonus: 20
  },
  {
    id: "vip",
    name: "VIP",
    credits: 200,
    price: 150,
    bonus: 50
  }
];

export default function CreditosPage() {
  const router = useRouter();
  const [userCredits, setUserCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    loadUserCredits(token);
  }, [router]);

  const loadUserCredits = async (token: string) => {
    try {
      const response = await fetch('/api/credits/balance', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUserCredits(data.credits);
      }
    } catch (err) {
      console.error('Erro ao carregar créditos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (pkg: CreditPackage) => {
    setSelectedPackage(pkg);
    setProcessing(true);

    try {
      // Simulate Stripe checkout process
      // In production, this would redirect to Stripe Checkout
      const token = localStorage.getItem('token');
      
      // For now, we'll simulate a successful purchase
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add credits to user account
      const response = await fetch('/api/credits/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: pkg.credits + pkg.bonus,
          referenceId: `stripe_${Date.now()}`
        })
      });

      if (response.ok) {
        const data = await response.json();
        setUserCredits(data.credits);
        alert(`Compra realizada com sucesso! Você recebeu ${pkg.credits + pkg.bonus} créditos.`);
      } else {
        alert('Erro ao processar compra. Tente novamente.');
      }
    } catch (err) {
      alert('Erro ao processar compra. Tente novamente.');
    } finally {
      setProcessing(false);
      setSelectedPackage(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
          </Link>
            <h1 className="text-2xl font-bold text-gray-900">Créditos</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Credits */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-8 text-white mb-8">
                <div className="text-center">
            <CreditCard className="w-16 h-16 mx-auto mb-4 opacity-80" />
            <h2 className="text-3xl font-bold mb-2">Seus Créditos</h2>
            <p className="text-4xl font-bold mb-4">R$ {userCredits.toFixed(2)}</p>
            <p className="text-purple-200">
              Use seus créditos para consultas esotéricas em tempo real
            </p>
                </div>
              </div>

        {/* Credit Packages */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Escolha seu Pacote de Créditos
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {creditPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-lg shadow-lg p-6 ${
                  pkg.popular ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Mais Popular
                    </div>
                  </div>
                )}
                
                  <div className="text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h4>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-purple-600">R$ {pkg.price}</span>
                  </div>

                  <div className="mb-6">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {pkg.credits} créditos
                    </div>
                    {pkg.bonus > 0 && (
                      <div className="text-green-600 font-medium">
                        + {pkg.bonus} bônus
                      </div>
                    )}
                    <div className="text-sm text-gray-500 mt-1">
                      Total: {pkg.credits + pkg.bonus} créditos
                    </div>
                  </div>

                  <button
                    onClick={() => handlePurchase(pkg)}
                    disabled={processing}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      pkg.popular
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-gray-600 hover:bg-gray-700 text-white'
                    } disabled:bg-gray-400 disabled:cursor-not-allowed`}
                  >
                    {processing && selectedPackage?.id === pkg.id ? (
                      'Processando...'
                    ) : (
                      'Comprar Agora'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Por que escolher nossos créditos?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Pagamento Seguro</h4>
              <p className="text-gray-600">
                Processamento seguro via Stripe com criptografia SSL
              </p>
          </div>
            
                <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-blue-600" />
                </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Créditos Instantâneos</h4>
              <p className="text-gray-600">
                Seus créditos são adicionados imediatamente após o pagamento
              </p>
                </div>
            
                <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Bônus Especiais</h4>
              <p className="text-gray-600">
                Receba créditos extras em pacotes maiores
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Perguntas Frequentes
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Como funcionam os créditos?
              </h4>
              <p className="text-gray-600">
                Os créditos são cobrados por minuto durante suas consultas. Cada consultor tem um valor por minuto diferente.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Os créditos expiram?
              </h4>
              <p className="text-gray-600">
                Não, seus créditos não expiram e podem ser usados a qualquer momento.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Posso solicitar reembolso?
              </h4>
              <p className="text-gray-600">
                Sim, oferecemos reembolso em até 7 dias após a compra, desde que os créditos não tenham sido utilizados.
              </p>
            </div>
          </div>
      </div>

        {/* Contact */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Precisa de ajuda? Entre em contato conosco
          </p>
          <a
            href="https://wa.me/5511951653210?text=Olá! Preciso de ajuda com créditos."
          target="_blank"
          rel="noopener noreferrer"
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
          </svg>
            WhatsApp
        </a>
        </div>
      </div>
    </div>
  );
}