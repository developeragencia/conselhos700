#!/usr/bin/env node

/**
 * CONSELHOS ESOTÉRICOS - SERVIDOR FINAL
 * Sistema completamente independente sem migrações
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Pool } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'conselhos_secret_2025';

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist/public')));

// Storage híbrido
let db;
const memory = { users: new Map(), sessions: new Map() };

// Inicializar banco SEM migrações
const initDB = async () => {
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
          role TEXT NOT NULL DEFAULT 'cliente',
          phone TEXT,
          cpf TEXT,
          credits DECIMAL(10,2) DEFAULT 10.00,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
      
      console.log('Database conectado');
      return true;
    }
  } catch (e) {
    console.log('Usando memória');
  }
  return false;
};

// Funções de usuário
const createUser = async (data) => {
  const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const hash = await bcrypt.hash(data.password, 10);
  
  const user = {
    id,
    email: data.email.toLowerCase(),
    first_name: data.name.split(' ')[0],
    last_name: data.name.split(' ').slice(1).join(' ') || '',
    password_hash: hash,
    role: data.role,
    phone: data.phone,
    cpf: data.cpf,
    credits: data.role === 'cliente' ? '10.00' : '0.00',
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
      memory.users.set(user.email, user);
    }
  } else {
    memory.users.set(user.email, user);
  }
  
  return user;
};

const findUser = async (email) => {
  if (db) {
    try {
      const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows[0];
    } catch (e) {}
  }
  return memory.users.get(email);
};

// Rotas
app.post('/api/test/register', async (req, res) => {
  try {
    const { email, name, password, role, cpf, phone } = req.body;

    if (!email || !name || !password || !role || !cpf || !phone) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios: email, password, name, role, cpf, phone' 
      });
    }

    if (await findUser(email.toLowerCase())) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const user = await createUser({ email, name, password, role, cpf, phone });
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

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha obrigatórios' });
    }

    const user = await findUser(email.toLowerCase());
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

// Frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

// Start
initDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Conselhos Esotéricos rodando na porta ${PORT}`);
  });
});