import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, CheckCircle, Clock, AlertCircle, QrCode, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PixPaymentProps {
  amount: number;
  description: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  userCpf?: string;
}

export default function PixPayment({ amount, description, onSuccess, onCancel, userCpf }: PixPaymentProps) {
  const [paymentData, setPaymentData] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<'creating' | 'pending' | 'completed' | 'error'>('creating');
  const [transactionId, setTransactionId] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutos
  const { toast } = useToast();

  // Criar pagamento PIX quando o componente monta
  useEffect(() => {
    createPixPayment();
  }, []);

  // Verificar status do pagamento a cada 5 segundos
  useEffect(() => {
    if (paymentStatus === 'pending' && transactionId) {
      const interval = setInterval(() => {
        checkPaymentStatus();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [paymentStatus, transactionId]);

  // Contador regressivo
  useEffect(() => {
    if (paymentStatus === 'pending' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, paymentStatus]);

  const createPixPayment = async () => {
    try {
      const response = await fetch('/api/pix/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          description,
          userCpf
        })
      });

      const data = await response.json();

      if (data.success) {
        setPaymentData(data.pixData);
        setTransactionId(data.transactionId);
        setPaymentStatus('pending');
        toast({
          title: "PIX Gerado",
          description: "Escaneie o QR Code ou copie a chave para realizar o pagamento",
        });
      } else {
        setPaymentStatus('error');
        toast({
          title: "Erro",
          description: data.error || "Erro ao gerar pagamento PIX",
          variant: "destructive",
        });
      }
    } catch (error) {
      setPaymentStatus('error');
      toast({
        title: "Erro",
        description: "Erro de conexão. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const checkPaymentStatus = async () => {
    try {
      const response = await fetch(`/api/pix/payment-status/${transactionId}`);
      const data = await response.json();

      if (data.success && data.transaction.status === 'completed') {
        setPaymentStatus('completed');
        toast({
          title: "Pagamento Confirmado!",
          description: "Seu pagamento foi processado com sucesso",
        });
        setTimeout(() => {
          onSuccess?.();
        }, 1500);
      }
    } catch (error) {
      console.error('Erro ao verificar status:', error);
    }
  };

  const copyPixCode = async () => {
    if (paymentData?.pixCode) {
      try {
        await navigator.clipboard.writeText(paymentData.pixCode);
        setCopySuccess(true);
        toast({
          title: "Copiado!",
          description: "Código PIX copiado para a área de transferência",
        });
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível copiar o código",
          variant: "destructive",
        });
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (paymentStatus === 'creating') {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full"
        />
        <p className="text-gray-600">Gerando pagamento PIX...</p>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <AlertCircle className="w-16 h-16 text-red-500" />
        <h3 className="text-xl font-bold text-red-600">Erro ao Gerar PIX</h3>
        <p className="text-gray-600 text-center">
          Não foi possível gerar o pagamento PIX. Tente novamente.
        </p>
        <div className="flex space-x-4">
          <Button onClick={createPixPayment} variant="outline">
            Tentar Novamente
          </Button>
          <Button onClick={onCancel} variant="ghost">
            Cancelar
          </Button>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'completed') {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center justify-center p-8 space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-20 h-20 text-green-500" />
        </motion.div>
        <h3 className="text-2xl font-bold text-green-600">Pagamento Confirmado!</h3>
        <p className="text-gray-600 text-center">
          Seu pagamento de R$ {amount.toFixed(2)} foi processado com sucesso.
        </p>
        <Button onClick={onSuccess} className="w-full">
          Continuar
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Cabeçalho */}
      <div className="text-center mb-6">
        <CreditCard className="w-12 h-12 text-purple-600 mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-gray-800">Pagamento PIX</h2>
        <p className="text-gray-600">R$ {amount.toFixed(2)}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      {/* Timer */}
      <div className="flex items-center justify-center mb-6 p-3 bg-orange-50 rounded-lg">
        <Clock className="w-5 h-5 text-orange-600 mr-2" />
        <span className="text-orange-600 font-mono text-lg">
          {formatTime(timeLeft)}
        </span>
        <span className="text-orange-600 ml-2 text-sm">restantes</span>
      </div>

      {/* QR Code */}
      {paymentData?.qrCodeDataURL && (
        <div className="text-center mb-6">
          <div className="inline-block p-4 bg-white rounded-lg shadow-sm border">
            <img 
              src={paymentData.qrCodeDataURL} 
              alt="QR Code PIX" 
              className="w-48 h-48 mx-auto"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Escaneie o QR Code com o app do seu banco
          </p>
        </div>
      )}

      {/* Código PIX */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ou copie a chave PIX:
        </label>
        <div className="flex">
          <input
            type="text"
            value={paymentData?.pixCode || ''}
            readOnly
            className="flex-1 p-3 border rounded-l-lg bg-gray-50 text-xs font-mono"
          />
          <Button
            onClick={copyPixCode}
            className={`px-4 rounded-l-none ${copySuccess ? 'bg-green-600 hover:bg-green-700' : ''}`}
          >
            {copySuccess ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Status */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse mr-2"></div>
          <span className="text-gray-600">Aguardando pagamento...</span>
        </div>
        <p className="text-xs text-gray-500">
          O status será atualizado automaticamente após a confirmação
        </p>
      </div>

      {/* Ações */}
      <div className="flex space-x-3">
        <Button 
          onClick={checkPaymentStatus} 
          variant="outline" 
          className="flex-1"
        >
          Verificar Status
        </Button>
        <Button onClick={onCancel} variant="ghost" className="flex-1">
          Cancelar
        </Button>
      </div>

      {/* Informações adicionais */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Instruções:</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Abra o app do seu banco</li>
          <li>• Escolha "Pagar com PIX"</li>
          <li>• Escaneie o QR Code ou cole a chave</li>
          <li>• Confirme o pagamento</li>
        </ul>
      </div>
    </div>
  );
}