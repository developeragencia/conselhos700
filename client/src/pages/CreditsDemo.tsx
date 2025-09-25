import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Coins, Gift, CreditCard, Star } from "lucide-react";

interface UserCredits {
  totalCredits: number;
  bonusCredits: number;
  hasReceivedBonus: boolean;
  firstPurchaseCompleted: boolean;
}

export default function CreditsDemo() {
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const [purchaseAmount, setPurchaseAmount] = useState("50");
  const [loading, setLoading] = useState(false);
  const [userId] = useState("1"); // Demo user ID
  const { toast } = useToast();

  const fetchCredits = async () => {
    try {
      const response = await apiRequest("GET", `/api/credits/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setCredits(data);
      }
    } catch (error) {
      console.error("Erro ao buscar créditos:", error);
    }
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const response = await apiRequest("POST", "/api/credits/purchase", {
        userId,
        amount: parseFloat(purchaseAmount),
        paymentMethod: "demo"
      });

      if (response.ok) {
        const result = await response.json();
        
        toast({
          title: "Compra realizada com sucesso!",
          description: result.bonusActivated 
            ? "Créditos adicionados + 10 minutos de bônus ativados!" 
            : "Créditos adicionados à sua conta",
        });

        if (result.bonusActivated) {
          toast({
            title: "🎁 Bônus de Boas-vindas Ativado!",
            description: "Você ganhou 10 minutos grátis para sua primeira consulta!",
          });
        }

        await fetchCredits();
      } else {
        const error = await response.json();
        toast({
          title: "Erro na compra",
          description: error.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro na compra",
        description: "Falha ao processar compra",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Sistema de Créditos e Bônus
          </h1>
          <p className="text-blue-200">
            Demonstração do sistema baseado em CPF com bônus para novos usuários
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Saldo Atual */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-yellow-500" />
                Seu Saldo
              </CardTitle>
              <CardDescription>
                Créditos disponíveis para consultas
              </CardDescription>
            </CardHeader>
            <CardContent>
              {credits ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Créditos Principais</span>
                    <span className="text-xl font-bold text-green-600">
                      {credits.totalCredits} min
                    </span>
                  </div>
                  
                  {credits.bonusCredits > 0 && (
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium flex items-center gap-2">
                        <Gift className="h-4 w-4 text-orange-500" />
                        Créditos Bônus
                      </span>
                      <span className="text-xl font-bold text-orange-600">
                        {credits.bonusCredits} min
                      </span>
                    </div>
                  )}

                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Disponível</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {credits.totalCredits + credits.bonusCredits} min
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    {!credits.firstPurchaseCompleted && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Elegível para Bônus de Boas-vindas
                      </Badge>
                    )}
                    {credits.hasReceivedBonus && (
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        Bônus Recebido
                      </Badge>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Carregando saldo...
                </div>
              )}
            </CardContent>
          </Card>

          {/* Comprar Créditos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-500" />
                Comprar Créditos
              </CardTitle>
              <CardDescription>
                Adicione minutos à sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Quantidade (em minutos)
                </label>
                <Input
                  type="number"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(e.target.value)}
                  min="10"
                  step="10"
                />
              </div>

              {credits && !credits.firstPurchaseCompleted && (
                <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-5 w-5 text-orange-500" />
                    <span className="font-semibold text-orange-800">
                      Oferta Especial de Boas-vindas!
                    </span>
                  </div>
                  <p className="text-sm text-orange-700">
                    Esta é sua primeira compra! Você ganhará <strong>10 minutos grátis</strong> após confirmar a compra.
                  </p>
                </div>
              )}

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Créditos:</span>
                  <span>{purchaseAmount} minutos</span>
                </div>
                {credits && !credits.firstPurchaseCompleted && (
                  <div className="flex justify-between text-orange-600 font-medium">
                    <span>Bônus:</span>
                    <span>+10 minutos grátis</span>
                  </div>
                )}
                <div className="flex justify-between border-t pt-2 font-semibold">
                  <span>Total:</span>
                  <span>
                    {parseInt(purchaseAmount) + (credits && !credits.firstPurchaseCompleted ? 10 : 0)} minutos
                  </span>
                </div>
              </div>

              <Button 
                onClick={handlePurchase} 
                className="w-full"
                disabled={loading || !purchaseAmount}
              >
                {loading ? "Processando..." : "Comprar Créditos"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Informações do Sistema */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Sistema Baseado em CPF - Funcionalidades Implementadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Cadastro com CPF</h3>
                <p className="text-sm text-blue-600">
                  CPF como chave única previne cadastros duplicados
                </p>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Email Obrigatório</h3>
                <p className="text-sm text-green-600">
                  Validação de email é obrigatória no cadastro
                </p>
              </div>
              
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-orange-800 mb-2">Bônus Automático</h3>
                <p className="text-sm text-orange-600">
                  10 minutos grátis ativados na primeira compra
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">APIs Implementadas:</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• POST /api/auth/register - Cadastro com CPF</li>
                <li>• POST /api/auth/login - Login com email</li>
                <li>• POST /api/credits/purchase - Compra de créditos com bônus</li>
                <li>• GET /api/credits/:userId - Consulta de saldo</li>
                <li>• WebSocket /ws - Chat em tempo real</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}