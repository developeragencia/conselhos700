import React, { useState, useEffect } from "react";
import { TarotCard } from "@/components/TarotCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface TarotCardType {
  id: number;
  name: string;
  image: string;
  meaning: {
    upright: string;
    reversed: boolean;
    description: string;
  };
  isRevealed: boolean;
  isSelected: boolean;
  isBackFacing: boolean;
}

export const TarotReading: React.FC = () => {
  const [cards, setCards] = useState<TarotCardType[]>([]);
  const [selectedCard, setSelectedCard] = useState<TarotCardType | null>(null);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const { toast } = useToast();

  const { data: tarotCards, isLoading } = useQuery({
    queryKey: ["/api/tarot/cards"],
  });

  useEffect(() => {
    if (tarotCards && tarotCards.length > 0) {
      // Initialize cards with isRevealed = false
      const preparedCards = tarotCards.map((card: any) => ({
        ...card,
        isRevealed: false,
        isSelected: false,
        isBackFacing: true,
        meaning: {
          ...card.meaning,
          reversed: Math.random() > 0.5, // Randomly determine if card is reversed
        }
      }));
      setCards(preparedCards);
    }
  }, [tarotCards]);

  const shuffleCards = () => {
    setIsRevealed(false);
    setSelectedCard(null);
    
    // Shuffle animation
    setIsShuffled(true);
    
    setTimeout(() => {
      // Actual shuffle logic
      const shuffled = [...cards].sort(() => Math.random() - 0.5).map(card => ({
        ...card,
        isRevealed: false,
        isSelected: false,
        meaning: {
          ...card.meaning,
          reversed: Math.random() > 0.5,
        }
      }));
      setCards(shuffled);
    }, 1000);
  };

  const selectCard = (card: TarotCardType) => {
    if (isRevealed) return;
    
    // Update selected card
    setSelectedCard(card);
    
    // Update cards state to show which card is selected
    setCards(cards.map(c => 
      c.id === card.id ? { ...c, isSelected: true } : { ...c, isSelected: false }
    ));
  };

  const revealCard = () => {
    if (!selectedCard) {
      toast({
        title: "Selecione uma carta",
        description: "Por favor, selecione uma carta antes de revelar.",
        variant: "destructive",
      });
      return;
    }
    
    setIsRevealed(true);
    
    // Update cards state to reveal the selected card
    setCards(cards.map(c => 
      c.id === selectedCard.id ? { ...c, isRevealed: true } : c
    ));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-heading font-bold text-primary mb-3">Tire uma Carta de Tarot</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Concentre-se na sua pergunta, embaralhe as cartas, escolha uma e receba orientação espiritual imediata.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {/* Tarot Reading Area */}
        <div className="bg-gray-100 rounded-lg p-6">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {cards.slice(0, 8).map((card) => (
              <TarotCard
                key={card.id}
                card={card}
                onClick={() => selectCard(card)}
                className={`transform ${isShuffled ? 'animate-pulse' : ''}`}
              />
            ))}
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <Button
              variant="outline"
              className="bg-secondary text-white hover:bg-secondary/90"
              onClick={shuffleCards}
            >
              Embaralhar
            </Button>
            
            <Button
              variant="default"
              className="bg-accent text-white hover:bg-accent/90"
              onClick={revealCard}
              disabled={!selectedCard}
            >
              Revelar Carta
            </Button>
          </div>
        </div>
        
        {/* Card Reading Result */}
        {isRevealed && selectedCard && (
          <Card className="mt-8 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 flex justify-center">
                <div className={`w-full max-w-[200px] ${selectedCard.meaning.reversed ? 'rotate-180' : ''}`}>
                  <img 
                    src={selectedCard.image}
                    alt={selectedCard.name}
                    className="w-full h-auto rounded-md shadow-lg"
                  />
                </div>
              </div>
              <div className="md:col-span-2 p-6">
                <h3 className="text-2xl font-heading font-bold text-primary mb-2">
                  {selectedCard.name} {selectedCard.meaning.reversed ? '(Invertida)' : ''}
                </h3>
                <p className="text-accent font-bold mb-4">
                  {selectedCard.meaning.reversed 
                    ? `Significado Invertido` 
                    : `Significado Normal`}
                </p>
                <p className="text-gray-700 mb-6">
                  {selectedCard.meaning.description}
                </p>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h4 className="font-bold text-primary mb-2">Reflexão</h4>
                  <p className="text-gray-600 italic">
                    "Esta carta sugere que você deve {selectedCard.meaning.reversed 
                      ? "reconsiderar suas escolhas atuais e buscar um novo caminho." 
                      : "confiar em sua intuição e seguir adiante com confiança."} 
                      Medite sobre como esta mensagem se aplica à sua situação."
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
