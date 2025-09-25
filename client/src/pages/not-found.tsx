import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900">
      <div className="text-center text-white px-8">
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            404
          </h1>
        </div>
        
        <h2 className="text-3xl font-semibold mb-4">
          Página Não Encontrada
        </h2>
        
        <p className="text-lg text-purple-200 mb-8 max-w-md mx-auto">
          Parece que você se perdeu no universo místico. A página que 
          você está procurando não existe ou foi movida para outra 
          dimensão espiritual.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
            >
              🏠 Voltar ao Início
            </Button>
          </Link>
          
          <Link href="/consultores">
            <Button 
              variant="outline" 
              size="lg"
              className="border-purple-400 text-purple-300 hover:bg-purple-800 px-8 py-3"
            >
              🔮 Ver Consultores
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
