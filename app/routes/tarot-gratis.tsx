import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Link } from "@remix-run/react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export const meta: MetaFunction = () => {
  return [
    { title: "Tarot Gratuito - Sensitivos na Web" },
    { name: "description", content: "Faça sua consulta de tarot gratuita online. Cartas interativas com interpretação completa." },
  ];
};

export default function TarotGratis() {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [showReading, setShowReading] = useState(false);

  const handleCardSelect = (cardIndex: number) => {
    if (selectedCards.length < 3 && !selectedCards.includes(cardIndex)) {
      const newCards = [...selectedCards, cardIndex];
      setSelectedCards(newCards);
      
      if (newCards.length === 3) {
        setTimeout(() => setShowReading(true), 500);
      }
    }
  };

  const resetReading = () => {
    setSelectedCards([]);
    setShowReading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
              <h1 className="text-2xl font-bold text-white">Sensitivos na Web</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/consultores" className="text-white/80 hover:text-white">Consultores</Link>
              <Link to="/servicos" className="text-white/80 hover:text-white">Serviços</Link>
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">🔮 Tarot Gratuito</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Escolha 3 cartas e descubra o que o universo tem a revelar sobre seu futuro
          </p>
        </div>

        {!showReading ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-white/80 mb-4">
                Cartas selecionadas: {selectedCards.length}/3
              </p>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className={`w-4 h-4 rounded-full ${
                      selectedCards.length >= num 
                        ? 'bg-purple-500' 
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 mb-8">
              {Array.from({ length: 22 }, (_, i) => (
                <div
                  key={i}
                  onClick={() => handleCardSelect(i)}
                  className={`
                    aspect-[2/3] bg-gradient-to-br from-purple-800 to-blue-900 
                    rounded-lg border-2 border-white/20 cursor-pointer
                    flex items-center justify-center text-white font-bold
                    hover:border-purple-400 transition-all hover:scale-105
                    ${selectedCards.includes(i) ? 'border-purple-400 scale-105 bg-purple-700' : ''}
                  `}
                >
                  {selectedCards.includes(i) ? '✨' : '🔮'}
                </div>
              ))}
            </div>

            {selectedCards.length > 0 && (
              <div className="text-center">
                <Button variant="outline" onClick={resetReading}>
                  Recomeçar
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Sua Leitura de Tarot
            </h3>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {tarotReadings.slice(0, 3).map((reading, index) => (
                <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="w-20 h-32 bg-gradient-to-br from-purple-700 to-blue-800 rounded-lg mx-auto mb-4 flex items-center justify-center text-4xl">
                      {reading.symbol}
                    </div>
                    <CardTitle className="text-white">{reading.card}</CardTitle>
                    <CardDescription className="text-purple-300">{reading.position}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {reading.meaning}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="text-white text-center">Interpretação Geral</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 leading-relaxed text-center">
                  As cartas revelam um momento de transformação em sua vida. O passado trouxe lições importantes, 
                  o presente oferece oportunidades únicas, e o futuro promete realizações através de sua determinação. 
                  Confie em sua intuição e mantenha-se aberto aos sinais do universo.
                </p>
              </CardContent>
            </Card>

            <div className="text-center space-y-4">
              <Button onClick={resetReading} size="lg">
                Nova Consulta
              </Button>
              <div>
                <p className="text-white/60 mb-2">Gostou da consulta?</p>
                <Button variant="outline" asChild>
                  <Link to="/consultores">Consulta com Especialista</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const tarotReadings = [
  {
    card: "O Mago",
    position: "Passado",
    symbol: "🎩",
    meaning: "Representa suas habilidades latentes e o poder de manifestação que você desenvolveu ao longo do tempo. Indica que você possui as ferramentas necessárias para criar sua realidade."
  },
  {
    card: "A Força",
    position: "Presente", 
    symbol: "🦁",
    meaning: "Simboliza coragem interior e autocontrole. Este é um momento para usar sua força interior para superar desafios com paciência e determinação."
  },
  {
    card: "O Sol",
    position: "Futuro",
    symbol: "☀️", 
    meaning: "Representa sucesso, alegria e realizações. Indica que tempos prósperos e felizes estão chegando, trazendo clareza e energia positiva para sua vida."
  }
];