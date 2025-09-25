#!/usr/bin/env node

/**
 * CONSELHOS ESOTÉRICOS - SERVIDOR ULTRA LIMPO
 * Zero dependências de migração ou ORM
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { Pool } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'conselhos_secret_2025';
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);

// WebSocket Server
const wss = new WebSocketServer({ server });
const activeConnections = new Map(); // userId -> WebSocket
const consultationRooms = new Map(); // consultationId -> { userWs, consultantWs }

app.use(express.json());
// CORS
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.length === 0 || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// Headers para forçar atualização do preview do Replit
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('X-Preview-Update', Date.now().toString());
  console.log(`🔥 Request: ${req.method} ${req.path} - Anti-cache: ${Date.now()}`);
  next();
});

app.use(express.static(path.join(__dirname, 'dist/public')));

// Storage
let db;
const users = new Map();

// Init
const init = async () => {
  try {
    if (process.env.DATABASE_URL) {
      db = new Pool({ connectionString: process.env.DATABASE_URL });
      await db.query(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          password_hash TEXT NOT NULL,
          role TEXT NOT NULL,
          phone TEXT,
          cpf TEXT,
          credits DECIMAL(10,2) DEFAULT 10.00,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `);
      await db.query(`
        CREATE TABLE IF NOT EXISTS credits_transactions (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          type TEXT NOT NULL CHECK (type IN ('add','debit')),
          amount DECIMAL(10,2) NOT NULL,
          balance_after DECIMAL(10,2) NOT NULL,
          reference_id TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `);
      await db.query(`
        CREATE TABLE IF NOT EXISTS consultations (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          consultant_id TEXT NOT NULL,
          started_at TIMESTAMP DEFAULT NOW(),
          ended_at TIMESTAMP,
          status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','ended','cancelled')),
          price_per_minute_snapshot DECIMAL(10,2) NOT NULL,
          total_charged DECIMAL(10,2) DEFAULT 0.00,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `);
      await db.query(`
        CREATE TABLE IF NOT EXISTS messages (
          id TEXT PRIMARY KEY,
          consultation_id TEXT NOT NULL,
          sender_type TEXT NOT NULL CHECK (sender_type IN ('user','consultant')),
          content TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `);
      await db.query(`
        CREATE TABLE IF NOT EXISTS testimonials (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          consultant_id TEXT NOT NULL,
          rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
          comment TEXT,
          approved BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `);
      await db.query(`
        CREATE TABLE IF NOT EXISTS consultants (
          id TEXT PRIMARY KEY,
          slug TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL,
          title TEXT,
          specialty TEXT,
          description TEXT,
          price_per_minute DECIMAL(10,2) NOT NULL DEFAULT 3.50,
          rating DECIMAL(3,2) DEFAULT 5.00,
          review_count INTEGER DEFAULT 0,
          status TEXT NOT NULL DEFAULT 'online',
          image_url TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `);
      console.log('Database OK');
    } else {
      console.log('Memory mode');
    }
  } catch (e) {
    console.log('Memory fallback');
console.log('🚫 DEPLOYMENT MODE: No database migrations needed');
    db = null;
  }
};

// === CONSULTA CPF ===
app.post('/api/cpf/consulta', async (req, res) => {
  const { cpf } = req.body;
  
  if (!cpf || cpf.length !== 11) {
    return res.status(400).json({
      success: false,
      message: 'CPF deve ter 11 dígitos'
    });
  }

  try {
    console.log('🔍 Consultando CPF:', cpf);
    
    // Simulação de dados baseados no CPF para desenvolvimento
    const nomes = [
      'João Silva Santos', 'Maria Oliveira Costa', 'José Pereira Lima',
      'Ana Carolina Souza', 'Pedro Henrique Alves', 'Juliana Ferreira',
      'Carlos Eduardo Rocha', 'Beatriz Almeida Nunes', 'Ricardo Martins',
      'Fernanda Ribeiro Cruz'
    ];
    
    const nome = nomes[parseInt(cpf.substr(0, 2)) % nomes.length];
    
    // Simula delay de consulta real
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return res.json({
      success: true,
      data: {
        nome: nome,
        cpf: cpf,
        nascimento: '01/01/1990',
        situacao: 'Regular'
      }
    });
    
  } catch (error) {
    console.error('Erro na consulta CPF:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, name, password, role, cpf, phone } = req.body;

    if (!email || !name || !password || !role || !cpf || !phone) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios: email, password, name, role, cpf, phone' 
      });
    }

    const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const hash = await bcrypt.hash(password, 10);
    
    const user = {
      id,
      email: email.toLowerCase(),
      first_name: name.split(' ')[0],
      last_name: name.split(' ').slice(1).join(' ') || '',
      password_hash: hash,
      role,
      phone,
      cpf,
      credits: role === 'cliente' ? '10.00' : '0.00',
      is_active: true,
      created_at: new Date()
    };

    if (db) {
      try {
        await db.query(`
          INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `, [user.id, user.email, user.first_name, user.last_name, user.password_hash, 
            user.role, user.phone, user.cpf, user.credits, user.is_active, user.created_at]);
      } catch (e) {
        users.set(user.email, user);
      }
    } else {
      users.set(user.email, user);
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, firstName: user.first_name, role: user.role },
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} registrado com sucesso!`
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha obrigatórios' });
    }

    let user;
    if (db) {
      try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
        user = result.rows[0];
      } catch (e) {
        user = users.get(email.toLowerCase());
      }
    } else {
      user = users.get(email.toLowerCase());
    }

    if (!user || !user.is_active) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    if (!(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role,
        credits: user.credits
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno' });
  }
});

// === Credits endpoints ===
app.get('/api/credits/balance', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(token, JWT_SECRET);
    if (db) {
      const result = await db.query('SELECT credits FROM users WHERE id = $1', [decoded.userId]);
      if (result.rowCount === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
      return res.json({ credits: result.rows[0].credits });
    }
    return res.status(503).json({ error: 'Banco de dados indisponível' });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.post('/api/credits/add', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(token, JWT_SECRET);
    const { amount, referenceId } = req.body || {};
    const add = Number(amount);
    if (!add || add <= 0) return res.status(400).json({ error: 'Valor inválido' });
    if (db) {
      const userRes = await db.query('SELECT credits FROM users WHERE id = $1', [decoded.userId]);
      if (userRes.rowCount === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
      const current = Number(userRes.rows[0].credits);
      const next = (current + add).toFixed(2);
      await db.query('UPDATE users SET credits = $1 WHERE id = $2', [next, decoded.userId]);
      const txId = `tx_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
      await db.query(
        'INSERT INTO credits_transactions (id, user_id, type, amount, balance_after, reference_id) VALUES ($1,$2,$3,$4,$5,$6)',
        [txId, decoded.userId, 'add', add, next, referenceId || null]
      );
      return res.json({ success: true, credits: next, transactionId: txId });
    }
    return res.status(503).json({ error: 'Banco de dados indisponível' });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.post('/api/credits/debit', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(token, JWT_SECRET);
    const { amount, referenceId } = req.body || {};
    const debit = Number(amount);
    if (!debit || debit <= 0) return res.status(400).json({ error: 'Valor inválido' });
    if (db) {
      const userRes = await db.query('SELECT credits FROM users WHERE id = $1', [decoded.userId]);
      if (userRes.rowCount === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
      const current = Number(userRes.rows[0].credits);
      if (current < debit) return res.status(400).json({ error: 'Saldo insuficiente' });
      const next = (current - debit).toFixed(2);
      await db.query('UPDATE users SET credits = $1 WHERE id = $2', [next, decoded.userId]);
      const txId = `tx_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
      await db.query(
        'INSERT INTO credits_transactions (id, user_id, type, amount, balance_after, reference_id) VALUES ($1,$2,$3,$4,$5,$6)',
        [txId, decoded.userId, 'debit', debit, next, referenceId || null]
      );
      return res.json({ success: true, credits: next, transactionId: txId });
    }
    return res.status(503).json({ error: 'Banco de dados indisponível' });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

// API Auth endpoints
app.get('/api/auth/user', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    let user;
    
    if (db) {
      try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);
        user = result.rows[0];
      } catch (e) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
    } else {
      // Memory fallback
      const found = Array.from(users.values()).find(u => u.id === decoded.userId);
      user = found;
    }

    if (!user || !user.is_active) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      role: user.role,
      credits: user.credits
    });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

// Mock APIs for frontend functionality
app.get('/api/consultants/featured', (req, res) => {
  res.json([
    {
      id: 1,
      name: "Maria Silva",
      title: "Especialista em Tarot e Astrologia",
      specialty: "Tarot e Astrologia",
      experience: "10 anos",
      rating: "4.9",
      reviewCount: 1250,
      description: "Especialista em leitura de tarot com mais de 10 anos de experiência",
      pricePerMinute: "3.50",
      status: "online",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      nextAvailable: "Agora",
      specialties: ["Tarot", "Astrologia", "Amor"],
      description: "Especialista em relacionamentos e orientação espiritual com mais de 10 anos de experiência."
    },
    {
      id: 2,
      name: "João Santos",
      title: "Especialista em Numerologia",
      specialty: "Numerologia",
      experience: "8 anos",
      rating: "4.8",
      reviewCount: 980,
      description: "Numerólogo experiente com foco em autoconhecimento e desenvolvimento pessoal",
      pricePerMinute: "2.80",
      status: "busy",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Ana Costa",
      title: "Médium e Vidente",
      specialty: "Mediunidade",
      experience: "15 anos",
      rating: "4.95",
      reviewCount: 2100,
      description: "Médium experiente com dom natural para comunicação com o plano espiritual",
      pricePerMinute: "4.20",
      status: "online",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    }
  ]);
});

// Consultants - list all
app.get('/api/consultants', async (req, res) => {
  try {
    if (db) {
      const result = await db.query('SELECT * FROM consultants ORDER BY created_at DESC');
      return res.json(result.rows);
    }
    // Memory fallback uses the featured list as demo
    return res.json([]);
  } catch (error) {
    console.error('Erro ao listar consultores:', error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

// Consultants - create
app.post('/api/consultants', async (req, res) => {
  try {
    const { slug, name, title, specialty, description, pricePerMinute, rating, reviewCount, status, imageUrl } = req.body || {};
    if (!slug || !name) {
      return res.status(400).json({ error: 'Campos obrigatórios: slug, name' });
    }
    const id = `consultant_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    if (db) {
      const query = `
        INSERT INTO consultants (id, slug, name, title, specialty, description, price_per_minute, rating, review_count, status, image_url)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
        RETURNING *
      `;
      const values = [
        id,
        slug,
        name,
        title || null,
        specialty || null,
        description || null,
        pricePerMinute ?? 3.5,
        rating ?? 5,
        reviewCount ?? 0,
        status || 'online',
        imageUrl || null,
      ];
      const result = await db.query(query, values);
      return res.status(201).json(result.rows[0]);
    }
    return res.status(503).json({ error: 'Banco de dados indisponível' });
  } catch (error) {
    console.error('Erro ao criar consultor:', error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

// Consultants - get by slug
app.get('/api/consultants/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ error: 'Slug obrigatório' });
    }
    if (db) {
      const result = await db.query('SELECT * FROM consultants WHERE slug = $1', [slug]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Consultor não encontrado' });
      }
      return res.json(result.rows[0]);
    }
    return res.status(503).json({ error: 'Banco de dados indisponível' });
  } catch (error) {
    console.error('Erro ao buscar consultor:', error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

// WebSocket Connection Handler
wss.on('connection', (ws, req) => {
  console.log('New WebSocket connection');
  
  ws.on('message', async (data) => {
    try {
      const message = JSON.parse(data.toString());
      const { type, token, consultationId, content } = message;
      
      if (type === 'auth') {
        const decoded = jwt.verify(token, JWT_SECRET);
        activeConnections.set(decoded.userId, ws);
        ws.userId = decoded.userId;
        ws.userRole = decoded.role;
        ws.send(JSON.stringify({ type: 'auth_success', userId: decoded.userId }));
        return;
      }
      
      if (type === 'join_consultation') {
        if (!ws.userId || !consultationId) return;
        
        // Verify consultation exists and user has access
        if (db) {
          const result = await db.query(
            'SELECT * FROM consultations WHERE id = $1 AND (user_id = $2 OR consultant_id = $2)',
            [consultationId, ws.userId]
          );
          if (result.rowCount === 0) return;
          
          const consultation = result.rows[0];
          if (!consultationRooms.has(consultationId)) {
            consultationRooms.set(consultationId, {});
          }
          
          const room = consultationRooms.get(consultationId);
          if (ws.userRole === 'cliente') {
            room.userWs = ws;
          } else if (ws.userRole === 'consultor') {
            room.consultantWs = ws;
          }
          
          ws.consultationId = consultationId;
          ws.send(JSON.stringify({ type: 'joined_consultation', consultationId }));
        }
        return;
      }
      
      if (type === 'message' && ws.consultationId && content) {
        const consultationId = ws.consultationId;
        const senderType = ws.userRole === 'cliente' ? 'user' : 'consultant';
        
        // Save message to database
        if (db) {
          const messageId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
          await db.query(
            'INSERT INTO messages (id, consultation_id, sender_type, content) VALUES ($1, $2, $3, $4)',
            [messageId, consultationId, senderType, content]
          );
        }
        
        // Broadcast to room
        const room = consultationRooms.get(consultationId);
        if (room) {
          const broadcastMessage = {
            type: 'message',
            consultationId,
            senderType,
            content,
            timestamp: new Date().toISOString()
          };
          
          if (room.userWs && room.userWs.readyState === 1) {
            room.userWs.send(JSON.stringify(broadcastMessage));
          }
          if (room.consultantWs && room.consultantWs.readyState === 1) {
            room.consultantWs.send(JSON.stringify(broadcastMessage));
          }
        }
        return;
      }
      
    } catch (error) {
      console.error('WebSocket message error:', error);
      ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
    }
  });
  
  ws.on('close', () => {
    if (ws.userId) {
      activeConnections.delete(ws.userId);
    }
    if (ws.consultationId) {
      const room = consultationRooms.get(ws.consultationId);
      if (room) {
        if (room.userWs === ws) room.userWs = null;
        if (room.consultantWs === ws) room.consultantWs = null;
      }
    }
  });
});

// === Consultations endpoints ===
app.post('/api/consultations', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const { consultantId } = req.body || {};
    if (!consultantId) return res.status(400).json({ error: 'consultantId obrigatório' });
    
    if (db) {
      // Get consultant price
      const consultantResult = await db.query('SELECT price_per_minute FROM consultants WHERE id = $1', [consultantId]);
      if (consultantResult.rowCount === 0) {
        return res.status(404).json({ error: 'Consultor não encontrado' });
      }
      
      const consultationId = `consultation_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const pricePerMinute = consultantResult.rows[0].price_per_minute;
      
      await db.query(
        'INSERT INTO consultations (id, user_id, consultant_id, price_per_minute_snapshot) VALUES ($1, $2, $3, $4)',
        [consultationId, decoded.userId, consultantId, pricePerMinute]
      );
      
      return res.status(201).json({ consultationId, pricePerMinute });
    }
    return res.status(503).json({ error: 'Banco de dados indisponível' });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.get('/api/consultations/:id/messages', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const { id } = req.params;
    if (db) {
      // Verify user has access to this consultation
      const consultationResult = await db.query(
        'SELECT * FROM consultations WHERE id = $1 AND (user_id = $2 OR consultant_id = $2)',
        [id, decoded.userId]
      );
      if (consultationResult.rowCount === 0) {
        return res.status(404).json({ error: 'Consultoria não encontrada' });
      }
      
      const messagesResult = await db.query(
        'SELECT * FROM messages WHERE consultation_id = $1 ORDER BY created_at ASC',
        [id]
      );
      
      return res.json(messagesResult.rows);
    }
    return res.status(503).json({ error: 'Banco de dados indisponível' });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

// === Testimonials endpoints ===
app.get('/api/testimonials', async (req, res) => {
  try {
    if (db) {
      const result = await db.query(`
        SELECT t.*, u.first_name, u.last_name, c.name as consultant_name
        FROM testimonials t
        JOIN users u ON t.user_id = u.id
        JOIN consultants c ON t.consultant_id = c.id
        WHERE t.approved = true
        ORDER BY t.created_at DESC
        LIMIT 20
      `);
      return res.json(result.rows);
    }
    // Fallback to mock data
  res.json([
    {
      id: 1,
      userName: "Carolina M.",
      rating: 5,
      comment: "Consulta incrível! A Maria foi muito precisa e me ajudou muito com suas orientações.",
      consultantName: "Maria Silva",
      date: "2025-01-28",
      verified: true
    },
    {
      id: 2,
      userName: "Roberto S.",
      rating: 5,
      comment: "Excelente profissional. João me trouxe clareza sobre questões importantes da minha vida.",
      consultantName: "João Santos",
      date: "2025-01-27",
      verified: true
    },
    {
      id: 3,
      userName: "Fernanda L.",
      rating: 5,
      comment: "Ana é fantástica! Suas mensagens são sempre reconfortantes e precisas.",
      consultantName: "Ana Costa",
      date: "2025-01-26",
      verified: true
    }
  ]);
  } catch (error) {
    console.error('Erro ao buscar depoimentos:', error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

app.post('/api/testimonials', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const { consultantId, rating, comment } = req.body || {};
    if (!consultantId || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'consultantId e rating (1-5) obrigatórios' });
    }
    
    if (db) {
      const testimonialId = `testimonial_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      await db.query(
        'INSERT INTO testimonials (id, user_id, consultant_id, rating, comment) VALUES ($1, $2, $3, $4, $5)',
        [testimonialId, decoded.userId, consultantId, rating, comment || null]
      );
      
      return res.status(201).json({ success: true, testimonialId });
    }
    return res.status(503).json({ error: 'Banco de dados indisponível' });
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
});

app.get('/api/blog/recent', (req, res) => {
  res.json([
    {
      id: 1,
      title: "Como interpretar os sonhos: Guia completo",
      excerpt: "Descubra os significados ocultos dos seus sonhos e como eles podem orientar sua vida.",
      author: "Equipe Conselhos Esotéricos",
      publishedAt: "2025-01-28",
      readTime: "5 min",
      category: "Esoterismo",
      image: "/images/blog/sonhos.jpg",
      slug: "como-interpretar-sonhos-guia-completo"
    },
    {
      id: 2,
      title: "Os cristais e suas propriedades energéticas",
      excerpt: "Conheça os principais cristais e como utilizá-los para harmonizar suas energias.",
      author: "Maria Silva",
      publishedAt: "2025-01-25",
      readTime: "8 min",
      category: "Cristais",
      image: "/images/blog/cristais.jpg",
      slug: "cristais-propriedades-energeticas"
    },
    {
      id: 3,
      title: "Numerologia: descobrindo seu número da sorte",
      excerpt: "Aprenda a calcular e interpretar os números que influenciam sua vida.",
      author: "João Santos",
      publishedAt: "2025-01-22",
      readTime: "6 min",
      category: "Numerologia",
      image: "/images/blog/numerologia.jpg",
      slug: "numerologia-numero-da-sorte"
    }
  ]);
});

// Frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

// Start
init().then(() => {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Conselhos Esotéricos: http://localhost:${PORT}`);
    console.log(`WebSocket Server: ws://localhost:${PORT}`);
    console.log('SISTEMA LIMPO - SEM MIGRAÇÕES');
  });
});