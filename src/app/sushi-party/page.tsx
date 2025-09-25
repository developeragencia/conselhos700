'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

interface Position {
  x: number;
  y: number;
}

interface Player {
  id: string;
  name: string;
  body: Position[];
  color: string;
  score: number;
  alive: boolean;
}

interface Food {
  x: number;
  y: number;
  type: 'sushi' | 'special';
  points: number;
}

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const CELL_SIZE = 10;
const INITIAL_SPEED = 100;

const SUSHI_EMOJIS = ['🍣', '🍤', '🍱', '🍙', '🥢', '🍚', '🐟', '🦐'];
const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
];

export default function SushiParty() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu');
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [foods, setFoods] = useState<Food[]>([]);
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState<{name: string, score: number}[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const directionRef = useRef<{x: number, y: number}>({x: 1, y: 0});
  const lastDirectionRef = useRef<{x: number, y: number}>({x: 1, y: 0});

  const generateFood = useCallback(() => {
    const foods: Food[] = [];
    for (let i = 0; i < 50; i++) {
      foods.push({
        x: Math.floor(Math.random() * (GAME_WIDTH / CELL_SIZE)) * CELL_SIZE,
        y: Math.floor(Math.random() * (GAME_HEIGHT / CELL_SIZE)) * CELL_SIZE,
        type: Math.random() < 0.9 ? 'sushi' : 'special',
        points: Math.random() < 0.9 ? 1 : 5
      });
    }
    return foods;
  }, []);

  const generateBots = useCallback(() => {
    const botNames = ['SushiMaster', 'NinjaRoll', 'DragonEel', 'TempuraKing', 'SashimiLord'];
    const bots: Player[] = [];
    
    for (let i = 0; i < 4; i++) {
      const startX = Math.floor(Math.random() * (GAME_WIDTH / CELL_SIZE)) * CELL_SIZE;
      const startY = Math.floor(Math.random() * (GAME_HEIGHT / CELL_SIZE)) * CELL_SIZE;
      
      bots.push({
        id: `bot-${i}`,
        name: botNames[i],
        body: [
          {x: startX, y: startY},
          {x: startX - CELL_SIZE, y: startY},
          {x: startX - CELL_SIZE * 2, y: startY}
        ],
        color: COLORS[i + 1],
        score: Math.floor(Math.random() * 50) + 10,
        alive: true
      });
    }
    return bots;
  }, []);

  const startGame = () => {
    if (!playerName.trim()) return;
    
    const playerStartX = Math.floor(GAME_WIDTH / 2 / CELL_SIZE) * CELL_SIZE;
    const playerStartY = Math.floor(GAME_HEIGHT / 2 / CELL_SIZE) * CELL_SIZE;
    
    const player: Player = {
      id: 'player',
      name: playerName,
      body: [
        {x: playerStartX, y: playerStartY},
        {x: playerStartX - CELL_SIZE, y: playerStartY},
        {x: playerStartX - CELL_SIZE * 2, y: playerStartY}
      ],
      color: COLORS[0],
      score: 0,
      alive: true
    };

    const bots = generateBots();
    setPlayers([player, ...bots]);
    setFoods(generateFood());
    setScore(0);
    setGameState('playing');
    directionRef.current = {x: 1, y: 0};
    lastDirectionRef.current = {x: 1, y: 0};
  };

  const gameOver = () => {
    setGameState('gameOver');
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
    
    // Update leaderboard
    const newEntry = {name: playerName, score};
    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    setLeaderboard(updatedLeaderboard);
    localStorage.setItem('sushi-party-leaderboard', JSON.stringify(updatedLeaderboard));
  };

  const movePlayer = useCallback((player: Player, direction: {x: number, y: number}) => {
    const head = player.body[0];
    const newHead = {
      x: head.x + direction.x * CELL_SIZE,
      y: head.y + direction.y * CELL_SIZE
    };

    // Wrap around screen
    if (newHead.x < 0) newHead.x = GAME_WIDTH - CELL_SIZE;
    if (newHead.x >= GAME_WIDTH) newHead.x = 0;
    if (newHead.y < 0) newHead.y = GAME_HEIGHT - CELL_SIZE;
    if (newHead.y >= GAME_HEIGHT) newHead.y = 0;

    const newBody = [newHead, ...player.body];
    newBody.pop(); // Remove tail

    return { ...player, body: newBody };
  }, []);

  const checkCollisions = useCallback((player: Player, allPlayers: Player[]) => {
    const head = player.body[0];
    
    // Check self collision
    for (let i = 1; i < player.body.length; i++) {
      if (head.x === player.body[i].x && head.y === player.body[i].y) {
        return true;
      }
    }
    
    // Check collision with other players
    for (const otherPlayer of allPlayers) {
      if (otherPlayer.id === player.id) continue;
      for (const segment of otherPlayer.body) {
        if (head.x === segment.x && head.y === segment.y) {
          return true;
        }
      }
    }
    
    return false;
  }, []);

  const checkFoodCollision = useCallback((player: Player, foods: Food[]) => {
    const head = player.body[0];
    const eatenFoodIndex = foods.findIndex(food => 
      food.x === head.x && food.y === head.y
    );
    
    if (eatenFoodIndex !== -1) {
      const eatenFood = foods[eatenFoodIndex];
      const newFoods = [...foods];
      newFoods.splice(eatenFoodIndex, 1);
      
      // Add new food
      newFoods.push({
        x: Math.floor(Math.random() * (GAME_WIDTH / CELL_SIZE)) * CELL_SIZE,
        y: Math.floor(Math.random() * (GAME_HEIGHT / CELL_SIZE)) * CELL_SIZE,
        type: Math.random() < 0.9 ? 'sushi' : 'special',
        points: Math.random() < 0.9 ? 1 : 5
      });
      
      return { foods: newFoods, points: eatenFood.points };
    }
    
    return { foods, points: 0 };
  }, []);

  const updateBotDirection = useCallback((bot: Player, foods: Food[]) => {
    const head = bot.body[0];
    const nearestFood = foods.reduce((nearest, food) => {
      const distance = Math.abs(head.x - food.x) + Math.abs(head.y - food.y);
      const nearestDistance = Math.abs(head.x - nearest.x) + Math.abs(head.y - nearest.y);
      return distance < nearestDistance ? food : nearest;
    }, foods[0]);
    
    if (!nearestFood) return {x: 1, y: 0};
    
    const directions = [
      {x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}
    ];
    
    let bestDirection = {x: 1, y: 0};
    let bestScore = Infinity;
    
    for (const dir of directions) {
      const newHead = {
        x: head.x + dir.x * CELL_SIZE,
        y: head.y + dir.y * CELL_SIZE
      };
      
      // Wrap around
      if (newHead.x < 0) newHead.x = GAME_WIDTH - CELL_SIZE;
      if (newHead.x >= GAME_WIDTH) newHead.x = 0;
      if (newHead.y < 0) newHead.y = GAME_HEIGHT - CELL_SIZE;
      if (newHead.y >= GAME_HEIGHT) newHead.y = 0;
      
      const distance = Math.abs(newHead.x - nearestFood.x) + Math.abs(newHead.y - nearestFood.y);
      if (distance < bestScore) {
        bestScore = distance;
        bestDirection = dir;
      }
    }
    
    return bestDirection;
  }, []);

  const gameLoop = useCallback(() => {
    setPlayers(prevPlayers => {
      const updatedPlayers = prevPlayers.map(player => {
        if (!player.alive) return player;
        
        let direction = directionRef.current;
        if (player.id !== 'player') {
          direction = updateBotDirection(player, foods);
        }
        
        const movedPlayer = movePlayer(player, direction);
        
        if (checkCollisions(movedPlayer, prevPlayers)) {
          return { ...movedPlayer, alive: false };
        }
        
        return movedPlayer;
      });
      
      // Check if player is dead
      const player = updatedPlayers.find(p => p.id === 'player');
      if (player && !player.alive) {
        gameOver();
        return updatedPlayers;
      }
      
      return updatedPlayers;
    });
    
    setFoods(prevFoods => {
      const player = players.find(p => p.id === 'player');
      if (!player) return prevFoods;
      
      const { foods: newFoods, points } = checkFoodCollision(player, prevFoods);
      if (points > 0) {
        setScore(prev => prev + points);
        // Grow player
        setPlayers(prevPlayers => 
          prevPlayers.map(p => 
            p.id === 'player' 
              ? { ...p, body: [...p.body, p.body[p.body.length - 1]], score: p.score + points }
              : p
          )
        );
      }
      
      return newFoods;
    });
    
    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
  }, [players, foods, gameState, movePlayer, checkCollisions, checkFoodCollision, updateBotDirection]);

  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, gameLoop]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      
      const lastDir = lastDirectionRef.current;
      let newDirection = directionRef.current;
      
      switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (lastDir.y === 0) newDirection = {x: 0, y: -1};
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (lastDir.y === 0) newDirection = {x: 0, y: 1};
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (lastDir.x === 0) newDirection = {x: -1, y: 0};
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (lastDir.x === 0) newDirection = {x: 1, y: 0};
          break;
      }
      
      directionRef.current = newDirection;
      lastDirectionRef.current = newDirection;
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = '#001122';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    // Draw grid
    ctx.strokeStyle = '#003366';
    ctx.lineWidth = 1;
    for (let x = 0; x <= GAME_WIDTH; x += CELL_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, GAME_HEIGHT);
      ctx.stroke();
    }
    for (let y = 0; y <= GAME_HEIGHT; y += CELL_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(GAME_WIDTH, y);
      ctx.stroke();
    }
    
    // Draw food
    foods.forEach(food => {
      ctx.fillStyle = food.type === 'special' ? '#FFD700' : '#FF6B6B';
      ctx.fillRect(food.x, food.y, CELL_SIZE, CELL_SIZE);
      
      // Draw sushi emoji
      ctx.fillStyle = '#000';
      ctx.font = `${CELL_SIZE - 2}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillText(
        SUSHI_EMOJIS[Math.floor(food.x / CELL_SIZE + food.y / CELL_SIZE) % SUSHI_EMOJIS.length],
        food.x + CELL_SIZE / 2,
        food.y + CELL_SIZE - 2
      );
    });
    
    // Draw players
    players.forEach(player => {
      if (!player.alive) return;
      
      player.body.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#FFFF00' : player.color;
        ctx.fillRect(segment.x, segment.y, CELL_SIZE, CELL_SIZE);
        
        // Draw eyes on head
        if (index === 0) {
          ctx.fillStyle = '#000';
          ctx.fillRect(segment.x + 2, segment.y + 2, 2, 2);
          ctx.fillRect(segment.x + 6, segment.y + 2, 2, 2);
        }
      });
    });
  }, [players, foods]);

  useEffect(() => {
    // Load leaderboard from localStorage
    const saved = localStorage.getItem('sushi-party-leaderboard');
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
  }, []);

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-black/80 text-white border-purple-500">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🍣 Sushi Party
            </CardTitle>
            <p className="text-purple-200 text-lg">
              Cresça sua cobra sushi e domine o oceano!
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="playerName" className="text-purple-200">Seu Nome</Label>
              <Input
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="bg-purple-900/50 border-purple-500 text-white"
                placeholder="Digite seu nome"
                maxLength={20}
              />
            </div>
            
            <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500">
              <h3 className="font-bold text-purple-200 mb-2">🎮 Como Jogar:</h3>
              <ul className="text-sm text-purple-300 space-y-1">
                <li>• Use as setas ou WASD para mover</li>
                <li>• Colete sushi para crescer</li>
                <li>• Evite colidir com outras cobras</li>
                <li>• Sushi dourado vale 5 pontos</li>
                <li>• Seja o maior do oceano!</li>
              </ul>
            </div>
            
            {leaderboard.length > 0 && (
              <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500">
                <h3 className="font-bold text-purple-200 mb-2">🏆 Ranking:</h3>
                <div className="space-y-1">
                  {leaderboard.slice(0, 5).map((entry, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-purple-300">{index + 1}. {entry.name}</span>
                      <span className="text-purple-400">{entry.score} pts</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <Button 
              onClick={startGame}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3"
              disabled={!playerName.trim()}
            >
              COMEÇAR JOGO! 🍣
            </Button>
            
            <div className="text-center">
              <Link href="/" className="text-purple-400 hover:text-purple-300 underline">
                ← Voltar ao Portal
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameState === 'gameOver') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg bg-black/80 text-white border-purple-500">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-red-400 mb-4">
              🍣 Game Over!
            </CardTitle>
            <p className="text-xl text-purple-200">
              Pontuação Final: {score}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <Button 
                onClick={() => setGameState('menu')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8"
              >
                JOGAR NOVAMENTE
              </Button>
            </div>
            
            <div className="text-center">
              <Link href="/" className="text-purple-400 hover:text-purple-300 underline">
                ← Voltar ao Portal
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Game Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-white">
            <h1 className="text-2xl font-bold">🍣 Sushi Party</h1>
            <p>Jogador: {playerName} | Pontuação: {score}</p>
          </div>
          <div className="text-white text-right">
            <p className="text-sm">Use WASD ou setas para mover</p>
          </div>
        </div>
        
        {/* Game Canvas */}
        <div className="flex justify-center mb-4">
          <canvas
            ref={canvasRef}
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            className="border-2 border-purple-500 bg-black rounded-lg"
          />
        </div>
        
        {/* Leaderboard */}
        <div className="bg-black/80 text-white p-4 rounded-lg border border-purple-500">
          <h3 className="font-bold mb-2">🏆 Jogadores Online:</h3>
          <div className="grid grid-cols-2 gap-4">
            {players.filter(p => p.alive).map((player, index) => (
              <div key={player.id} className="flex justify-between">
                <span className={player.id === 'player' ? 'font-bold text-yellow-400' : 'text-purple-300'}>
                  {index + 1}. {player.name}
                </span>
                <span className="text-purple-400">{player.score} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}