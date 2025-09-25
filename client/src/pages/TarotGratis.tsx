import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Sparkles, 
  Shuffle, 
  RotateCcw,
  Heart,
  Briefcase,
  Users,
  Home,
  DollarSign,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TarotCard {
  id: number;
  name: string;
  meaning: string;
  reversedMeaning: string;
  image: string;
  isReversed: boolean;
  suit: string;
  type: string;
}

interface Reading {
  question: string;
  questionType: string;
  cards: TarotCard[];
  interpretation: string;
  advice: string;
  timestamp: Date;
}

const TAROT_CARDS: TarotCard[] = [
  {
    id: 1,
    name: "O Louco",
    meaning: "Novos começos, inocência, espontaneidade, espírito livre",
    reversedMeaning: "Imprudência, riscos desnecessários, falta de direção",
    image: "/api/placeholder/200/350",
    isReversed: false,
    suit: "Arcanos Maiores",
    type: "major"
  },
  {
    id: 2,
    name: "O Mago",
    meaning: "Manifestação, poder pessoal, ação, criatividade",
    reversedMeaning: "Manipulação, falta de energia, objetivos confusos",
    image: "/api/placeholder/200/350",
    isReversed: false,
    suit: "Arcanos Maiores",
    type: "major"
  },
  {
    id: 3,
    name: "A Sacerdotisa",
    meaning: "Intuição, mistério, conhecimento interior, sabedoria",
    reversedMeaning: "Segredos, informações ocultas, desconexão interior",
    image: "/api/placeholder/200/350",
    isReversed: false,
    suit: "Arcanos Maiores",
    type: "major"
  },
  {
    id: 4,
    name: "A Imperatriz",
    meaning: "Fertilidade, criatividade, natureza, abundância",
    reversedMeaning: "Dependência, falta de crescimento, esterilidade",
    image: "/api/placeholder/200/350",
    isReversed: false,
    suit: "Arcanos Maiores",
    type: "major"
  },
  {
    id: 5,
    name: "O Imperador",
    meaning: "Autoridade, estrutura, controle, estabilidade",
    reversedMeaning: "Tirania, rigidez excessiva, falta de disciplina",
    image: "/api/placeholder/200/350",
    isReversed: false,
    suit: "Arcanos Maiores",
    type: "major"
  },
  {
    id: 6,
    name: "O Hierofante",
    meaning: "Tradição, ensino espiritual, orientação, conformidade",
    reversedMeaning: "Rebelião, subversão, novas abordagens",
    image: "/api/placeholder/200/350",
    isReversed: false,
    suit: "Arcanos Maiores",
    type: "major"
  },
  {
    id: 7,
    name: "Os Enamorados",
    meaning: "Amor, harmonia, relacionamentos, escolhas",
    reversedMeaning: "Desequilíbrio, escolhas ruins, relacionamentos tensos",
    image: "/api/placeholder/200/350",
    isReversed: false,
    suit: "Arcanos Maiores",
    type: "major"
  },
  {
    id: 8,
    name: "A Justiça",
    meaning: "Equilíbrio, justiça, verdade, causa e efeito",
    reversedMeaning: "Injustiça, desequilíbrio, falta de responsabilidade",
    image: "/api/placeholder/200/350",
    isReversed: false,
    suit: "Arcanos Maiores",
    type: "major"
  },
  {
    id: 9,
    name: "A Roda da Fortuna",
    meaning: "Mudança, ciclos, destino, oportunidade",
    reversedMeaning: "Má sorte, falta de controle, ciclos negativos",
    image: "/api/placeholder/200/350",
    isReversed: false,
    suit: "Arcanos Maiores",
    type: "major"
  },
  {
    id: 10,
    name: "A Força",
    meaning: "Força interior, coragem, paciência, controle",
    reversedMeaning: "Fraqueza, insegurança, falta de autocontrole",
    image: "/api/placeholder/200/350",
    isReversed: false,
    suit: "Arcanos Maiores",
    type: "major"
  }
];

const QUESTION_TYPES = [
  { value: "amor", label: "Amor e Relacionamentos", icon: Heart },
  { value: "trabalho", label: "Carreira e Trabalho", icon: Briefcase },
  { value: "familia", label: "Família e Amigos", icon: Users },
  { value: "pessoal", label: "Desenvolvimento Pessoal", icon: Star },
  { value: "financas", label: "Finanças e Dinheiro", icon: DollarSign },
  { value: "geral", label: "Orientação Geral", icon: Home }
];

const SPREAD_TYPES = [
  { value: "uma_carta", label: "Uma Carta", description: "Orientação simples e direta" },
  { value: "tres_cartas", label: "Três Cartas", description: "Passado, Presente e Futuro" },
  { value: "cruz_celta", label: "Cruz Celta", description: "Leitura completa e detalhada" }
];

export default function TarotGratis() {
  const [currentStep, setCurrentStep] = useState<'question' | 'cards' | 'result'>('question');
  const [question, setQuestion] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [spreadType, setSpreadType] = useState('tres_cartas');
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [currentReading, setCurrentReading] = useState<Reading | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const { toast } = useToast();

  const shuffleCards = () => {
    setIsShuffling(true);
    
    setTimeout(() => {
      const shuffled = [...TAROT_CARDS];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        
        // Randomly reverse some cards
        shuffled[i] = {
          ...shuffled[i],
          isReversed: Math.random() > 0.7
        };
      }
      
      const numberOfCards = spreadType === 'uma_carta' ? 1 : spreadType === 'tres_cartas' ? 3 : 7;
      const selected = shuffled.slice(0, numberOfCards);
      
      setSelectedCards(selected);
      setIsShuffling(false);
      setCurrentStep('cards');
    }, 2000);
  };

  const generateReading = () => {
    if (!question || selectedCards.length === 0) return;

    const interpretations = {
      uma_carta: generateSingleCardReading,
      tres_cartas: generateThreeCardReading,
      cruz_celta: generateCelticCrossReading
    };

    const interpretation = interpretations[spreadType as keyof typeof interpretations]();
    
    const reading: Reading = {
      question,
      questionType,
      cards: selectedCards,
      interpretation: interpretation.interpretation,
      advice: interpretation.advice,
      timestamp: new Date()
    };

    setCurrentReading(reading);
    setCurrentStep('result');

    toast({
      title: "Leitura completa!",
      description: "Sua consulta de tarot foi gerada com sucesso.",
    });
  };

  const generateSingleCardReading = () => {
    const card = selectedCards[0];
    const meaning = card.isReversed ? card.reversedMeaning : card.meaning;
    
    return {
      interpretation: `A carta ${card.name} representa ${meaning}. Esta carta traz uma mensagem importante para sua pergunta sobre ${getQuestionTypeLabel(questionType)}.`,
      advice: `Reflita sobre como ${meaning.toLowerCase()} se aplica à sua situação atual. O tarot sugere que você deve prestar atenção especial a esses aspectos em sua vida.`
    };
  };

  const generateThreeCardReading = () => {
    const [past, present, future] = selectedCards;
    
    return {
      interpretation: `
        **Passado (${past.name})**: ${past.isReversed ? past.reversedMeaning : past.meaning}. 
        Esta influência do passado ainda ressoa em sua vida atual.
        
        **Presente (${present.name})**: ${present.isReversed ? present.reversedMeaning : present.meaning}. 
        Esta é a energia que domina sua situação atual.
        
        **Futuro (${future.name})**: ${future.isReversed ? future.reversedMeaning : future.meaning}. 
        Esta é a tendência que se manifesta se você continuar no caminho atual.
      `,
      advice: `O tarot sugere que você aprenda com as lições do passado, trabalhe conscientemente com as energias do presente e se prepare para as oportunidades futuras. Foque especialmente na energia de ${present.name} que domina seu momento atual.`
    };
  };

  const generateCelticCrossReading = () => {
    return {
      interpretation: "Leitura detalhada da Cruz Celta com sete cartas oferecendo uma visão completa da sua situação.",
      advice: "Esta leitura complexa requer contemplação cuidadosa de cada posição e sua inter-relação."
    };
  };

  const getQuestionTypeLabel = (type: string) => {
    return QUESTION_TYPES.find(qt => qt.value === type)?.label || '';
  };

  const resetReading = () => {
    setCurrentStep('question');
    setQuestion('');
    setQuestionType('');
    setSelectedCards([]);
    setCurrentReading(null);
  };

  const getQuestionIcon = (type: string) => {
    const questionType = QUESTION_TYPES.find(qt => qt.value === type);
    if (!questionType) return Heart;
    return questionType.icon;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 mr-3" />
            <h1 className="text-4xl font-bold">Tarot Grátis</h1>
          </div>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Receba orientação espiritual gratuita através das cartas de tarot. 
            Faça sua pergunta e deixe o universo guiar você.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Etapa 1: Pergunta */}
        {currentStep === 'question' && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Faça sua pergunta ao Tarot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="question-type">Sobre o que você gostaria de consultar?</Label>
                <Select value={questionType} onValueChange={setQuestionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha uma área da sua vida" />
                  </SelectTrigger>
                  <SelectContent>
                    {QUESTION_TYPES.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center">
                            <IconComponent className="w-4 h-4 mr-2" />
                            {type.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="spread-type">Tipo de consulta</Label>
                <Select value={spreadType} onValueChange={setSpreadType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SPREAD_TYPES.map((spread) => (
                      <SelectItem key={spread.value} value={spread.value}>
                        <div>
                          <div className="font-medium">{spread.label}</div>
                          <div className="text-sm text-gray-600">{spread.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="question">Sua pergunta (opcional)</Label>
                <Textarea
                  id="question"
                  placeholder="Digite sua pergunta específica ou deixe em branco para uma orientação geral..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={3}
                />
              </div>

              <Button 
                onClick={shuffleCards}
                disabled={!questionType || isShuffling}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isShuffling ? (
                  <>
                    <Shuffle className="w-4 h-4 mr-2 animate-spin" />
                    Embaralhando as cartas...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Consultar o Tarot
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Etapa 2: Seleção das cartas */}
        {currentStep === 'cards' && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Suas cartas foram selecionadas</CardTitle>
              <p className="text-center text-gray-600">
                As energias cósmicas escolheram estas cartas especialmente para você
              </p>
            </CardHeader>
            <CardContent>
              <div className={`grid gap-6 mb-6 ${
                selectedCards.length === 1 ? 'grid-cols-1 justify-items-center' :
                selectedCards.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
                'grid-cols-2 md:grid-cols-4'
              }`}>
                {selectedCards.map((card, index) => (
                  <div key={card.id} className="text-center">
                    <div className={`relative mb-3 ${card.isReversed ? 'transform rotate-180' : ''}`}>
                      <img 
                        src={card.image} 
                        alt={card.name}
                        className="w-32 h-48 mx-auto rounded-lg shadow-lg border-2 border-purple-200"
                      />
                      {card.isReversed && (
                        <Badge variant="destructive" className="absolute top-2 right-2">
                          Invertida
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg">{card.name}</h3>
                    <Badge variant="outline" className="mt-1">{card.suit}</Badge>
                    {selectedCards.length === 3 && (
                      <p className="text-sm text-gray-600 mt-1">
                        {index === 0 ? 'Passado' : index === 1 ? 'Presente' : 'Futuro'}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center space-x-4">
                <Button variant="outline" onClick={shuffleCards}>
                  <Shuffle className="w-4 h-4 mr-2" />
                  Embaralhar novamente
                </Button>
                <Button 
                  onClick={generateReading}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Ver interpretação
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Etapa 3: Resultado */}
        {currentStep === 'result' && currentReading && (
          <div className="space-y-6">
            {/* Cabeçalho da leitura */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">Sua Leitura de Tarot</CardTitle>
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center">
                    {React.createElement(getQuestionIcon(currentReading.questionType), { 
                      className: "w-5 h-5 mr-2 text-purple-600" 
                    })}
                    <Badge variant="outline">{getQuestionTypeLabel(currentReading.questionType)}</Badge>
                  </div>
                  {currentReading.question && (
                    <p className="text-gray-600 italic">"{currentReading.question}"</p>
                  )}
                </div>
              </CardHeader>
            </Card>

            {/* As cartas */}
            <Card>
              <CardHeader>
                <CardTitle>Suas Cartas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`grid gap-4 ${
                  currentReading.cards.length === 1 ? 'grid-cols-1 justify-items-center' :
                  currentReading.cards.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
                  'grid-cols-2 md:grid-cols-4'
                }`}>
                  {currentReading.cards.map((card, index) => (
                    <div key={card.id} className="text-center p-4 border rounded-lg">
                      <div className={`relative mb-3 ${card.isReversed ? 'transform rotate-180' : ''}`}>
                        <img 
                          src={card.image} 
                          alt={card.name}
                          className="w-24 h-36 mx-auto rounded shadow"
                        />
                      </div>
                      <h4 className="font-semibold">{card.name}</h4>
                      {card.isReversed && <Badge variant="destructive" className="mt-1">Invertida</Badge>}
                      <p className="text-sm text-gray-600 mt-2">
                        {card.isReversed ? card.reversedMeaning : card.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interpretação */}
            <Card>
              <CardHeader>
                <CardTitle>Interpretação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {currentReading.interpretation}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Conselho */}
            <Card>
              <CardHeader>
                <CardTitle>Orientação e Conselho</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {currentReading.advice}
                </p>
              </CardContent>
            </Card>

            {/* Ações */}
            <div className="text-center space-x-4">
              <Button variant="outline" onClick={resetReading}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Nova consulta
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Heart className="w-4 h-4 mr-2" />
                Consulta com especialista
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}