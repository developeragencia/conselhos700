var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};

// clean-server.js
var clean_server_exports = {};
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { Pool } from "@neondatabase/serverless";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { WebSocketServer } from "ws";
import { createServer } from "http";
var __dirname, app, server, PORT, JWT_SECRET, ALLOWED_ORIGINS, wss, activeConnections, consultationRooms, db, users, init;
var init_clean_server = __esm({
  "clean-server.js"() {
    "use strict";
    __dirname = path.dirname(fileURLToPath(import.meta.url));
    app = express();
    server = createServer(app);
    PORT = process.env.PORT || 5e3;
    JWT_SECRET = process.env.JWT_SECRET || "conselhos_secret_2025";
    ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
    wss = new WebSocketServer({ server });
    activeConnections = /* @__PURE__ */ new Map();
    consultationRooms = /* @__PURE__ */ new Map();
    app.use(express.json());
    app.use(cors({
      origin: (origin, cb) => {
        if (!origin || ALLOWED_ORIGINS.length === 0 || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
        return cb(new Error("Not allowed by CORS"));
      },
      credentials: true
    }));
    app.use((req, res, next) => {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.setHeader("X-Preview-Update", Date.now().toString());
      console.log(`\u{1F525} Request: ${req.method} ${req.path} - Anti-cache: ${Date.now()}`);
      next();
    });
    app.use(express.static(path.join(__dirname, "public")));
    users = /* @__PURE__ */ new Map();
    init = async () => {
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
          console.log("Database OK");
        } else {
          console.log("Memory mode");
        }
      } catch (e) {
        console.log("Memory fallback");
        console.log("\u{1F6AB} DEPLOYMENT MODE: No database migrations needed");
        db = null;
      }
    };
    app.post("/api/cpf/consulta", async (req, res) => {
      const { cpf } = req.body;
      if (!cpf || cpf.length !== 11) {
        return res.status(400).json({
          success: false,
          message: "CPF deve ter 11 d\xEDgitos"
        });
      }
      try {
        console.log("\u{1F50D} Consultando CPF:", cpf);
        const nomes = [
          "Jo\xE3o Silva Santos",
          "Maria Oliveira Costa",
          "Jos\xE9 Pereira Lima",
          "Ana Carolina Souza",
          "Pedro Henrique Alves",
          "Juliana Ferreira",
          "Carlos Eduardo Rocha",
          "Beatriz Almeida Nunes",
          "Ricardo Martins",
          "Fernanda Ribeiro Cruz"
        ];
        const nome = nomes[parseInt(cpf.substr(0, 2)) % nomes.length];
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return res.json({
          success: true,
          data: {
            nome,
            cpf,
            nascimento: "01/01/1990",
            situacao: "Regular"
          }
        });
      } catch (error) {
        console.error("Erro na consulta CPF:", error);
        res.status(500).json({
          success: false,
          message: "Erro interno do servidor"
        });
      }
    });
    app.post("/api/auth/register", async (req, res) => {
      try {
        const { email, name, password, role, cpf, phone } = req.body;
        if (!email || !name || !password || !role || !cpf || !phone) {
          return res.status(400).json({
            error: "Campos obrigat\xF3rios: email, password, name, role, cpf, phone"
          });
        }
        const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const hash = await bcrypt.hash(password, 10);
        const user = {
          id,
          email: email.toLowerCase(),
          first_name: name.split(" ")[0],
          last_name: name.split(" ").slice(1).join(" ") || "",
          password_hash: hash,
          role,
          phone,
          cpf,
          credits: role === "cliente" ? "10.00" : "0.00",
          is_active: true,
          created_at: /* @__PURE__ */ new Date()
        };
        if (db) {
          try {
            await db.query(`
          INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `, [
              user.id,
              user.email,
              user.first_name,
              user.last_name,
              user.password_hash,
              user.role,
              user.phone,
              user.cpf,
              user.credits,
              user.is_active,
              user.created_at
            ]);
          } catch (e) {
            users.set(user.email, user);
          }
        } else {
          users.set(user.email, user);
        }
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
        res.json({
          success: true,
          token,
          user: { id: user.id, email: user.email, firstName: user.first_name, role: user.role },
          message: `${role.charAt(0).toUpperCase() + role.slice(1)} registrado com sucesso!`
        });
      } catch (error) {
        res.status(500).json({ error: "Erro interno" });
      }
    });
    app.post("/api/auth/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).json({ error: "Email e senha obrigat\xF3rios" });
        }
        let user;
        if (db) {
          try {
            const result = await db.query("SELECT * FROM users WHERE email = $1", [email.toLowerCase()]);
            user = result.rows[0];
          } catch (e) {
            user = users.get(email.toLowerCase());
          }
        } else {
          user = users.get(email.toLowerCase());
        }
        if (!user || !user.is_active) {
          return res.status(401).json({ error: "Email ou senha incorretos" });
        }
        if (!await bcrypt.compare(password, user.password_hash)) {
          return res.status(401).json({ error: "Email ou senha incorretos" });
        }
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
        res.json({
          success: true,
          message: "Login realizado com sucesso",
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
        res.status(500).json({ error: "Erro interno" });
      }
    });
    app.get("/api/credits/balance", async (req, res) => {
      try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ error: "Token n\xE3o fornecido" });
        const decoded = jwt.verify(token, JWT_SECRET);
        if (db) {
          const result = await db.query("SELECT credits FROM users WHERE id = $1", [decoded.userId]);
          if (result.rowCount === 0) return res.status(404).json({ error: "Usu\xE1rio n\xE3o encontrado" });
          return res.json({ credits: result.rows[0].credits });
        }
        return res.status(503).json({ error: "Banco de dados indispon\xEDvel" });
      } catch (error) {
        res.status(401).json({ error: "Token inv\xE1lido" });
      }
    });
    app.post("/api/credits/add", async (req, res) => {
      try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ error: "Token n\xE3o fornecido" });
        const decoded = jwt.verify(token, JWT_SECRET);
        const { amount, referenceId } = req.body || {};
        const add = Number(amount);
        if (!add || add <= 0) return res.status(400).json({ error: "Valor inv\xE1lido" });
        if (db) {
          const userRes = await db.query("SELECT credits FROM users WHERE id = $1", [decoded.userId]);
          if (userRes.rowCount === 0) return res.status(404).json({ error: "Usu\xE1rio n\xE3o encontrado" });
          const current = Number(userRes.rows[0].credits);
          const next = (current + add).toFixed(2);
          await db.query("UPDATE users SET credits = $1 WHERE id = $2", [next, decoded.userId]);
          const txId = `tx_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
          await db.query(
            "INSERT INTO credits_transactions (id, user_id, type, amount, balance_after, reference_id) VALUES ($1,$2,$3,$4,$5,$6)",
            [txId, decoded.userId, "add", add, next, referenceId || null]
          );
          return res.json({ success: true, credits: next, transactionId: txId });
        }
        return res.status(503).json({ error: "Banco de dados indispon\xEDvel" });
      } catch (error) {
        res.status(401).json({ error: "Token inv\xE1lido" });
      }
    });
    app.post("/api/credits/debit", async (req, res) => {
      try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ error: "Token n\xE3o fornecido" });
        const decoded = jwt.verify(token, JWT_SECRET);
        const { amount, referenceId } = req.body || {};
        const debit = Number(amount);
        if (!debit || debit <= 0) return res.status(400).json({ error: "Valor inv\xE1lido" });
        if (db) {
          const userRes = await db.query("SELECT credits FROM users WHERE id = $1", [decoded.userId]);
          if (userRes.rowCount === 0) return res.status(404).json({ error: "Usu\xE1rio n\xE3o encontrado" });
          const current = Number(userRes.rows[0].credits);
          if (current < debit) return res.status(400).json({ error: "Saldo insuficiente" });
          const next = (current - debit).toFixed(2);
          await db.query("UPDATE users SET credits = $1 WHERE id = $2", [next, decoded.userId]);
          const txId = `tx_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
          await db.query(
            "INSERT INTO credits_transactions (id, user_id, type, amount, balance_after, reference_id) VALUES ($1,$2,$3,$4,$5,$6)",
            [txId, decoded.userId, "debit", debit, next, referenceId || null]
          );
          return res.json({ success: true, credits: next, transactionId: txId });
        }
        return res.status(503).json({ error: "Banco de dados indispon\xEDvel" });
      } catch (error) {
        res.status(401).json({ error: "Token inv\xE1lido" });
      }
    });
    app.get("/api/auth/user", async (req, res) => {
      try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        if (!token) {
          return res.status(401).json({ error: "Token n\xE3o fornecido" });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        let user;
        if (db) {
          try {
            const result = await db.query("SELECT * FROM users WHERE id = $1", [decoded.userId]);
            user = result.rows[0];
          } catch (e) {
            return res.status(404).json({ error: "Usu\xE1rio n\xE3o encontrado" });
          }
        } else {
          const found = Array.from(users.values()).find((u) => u.id === decoded.userId);
          user = found;
        }
        if (!user || !user.is_active) {
          return res.status(404).json({ error: "Usu\xE1rio n\xE3o encontrado" });
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
        res.status(401).json({ error: "Token inv\xE1lido" });
      }
    });
    app.get("/api/consultants/featured", (req, res) => {
      res.json([
        {
          id: 1,
          name: "Maria Silva",
          title: "Especialista em Tarot e Astrologia",
          specialty: "Tarot e Astrologia",
          experience: "10 anos",
          rating: "4.9",
          reviewCount: 1250,
          description: "Especialista em leitura de tarot com mais de 10 anos de experi\xEAncia",
          pricePerMinute: "3.50",
          status: "online",
          imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
          nextAvailable: "Agora",
          specialties: ["Tarot", "Astrologia", "Amor"],
          description: "Especialista em relacionamentos e orienta\xE7\xE3o espiritual com mais de 10 anos de experi\xEAncia."
        },
        {
          id: 2,
          name: "Jo\xE3o Santos",
          title: "Especialista em Numerologia",
          specialty: "Numerologia",
          experience: "8 anos",
          rating: "4.8",
          reviewCount: 980,
          description: "Numer\xF3logo experiente com foco em autoconhecimento e desenvolvimento pessoal",
          pricePerMinute: "2.80",
          status: "busy",
          imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
        },
        {
          id: 3,
          name: "Ana Costa",
          title: "M\xE9dium e Vidente",
          specialty: "Mediunidade",
          experience: "15 anos",
          rating: "4.95",
          reviewCount: 2100,
          description: "M\xE9dium experiente com dom natural para comunica\xE7\xE3o com o plano espiritual",
          pricePerMinute: "4.20",
          status: "online",
          imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
        }
      ]);
    });
    app.get("/api/consultants", async (req, res) => {
      try {
        if (db) {
          const result = await db.query("SELECT * FROM consultants ORDER BY created_at DESC");
          return res.json(result.rows);
        }
        return res.json([]);
      } catch (error) {
        console.error("Erro ao listar consultores:", error);
        res.status(500).json({ error: "Erro interno" });
      }
    });
    app.post("/api/consultants", async (req, res) => {
      try {
        const { slug, name, title, specialty, description, pricePerMinute, rating, reviewCount, status, imageUrl } = req.body || {};
        if (!slug || !name) {
          return res.status(400).json({ error: "Campos obrigat\xF3rios: slug, name" });
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
            status || "online",
            imageUrl || null
          ];
          const result = await db.query(query, values);
          return res.status(201).json(result.rows[0]);
        }
        return res.status(503).json({ error: "Banco de dados indispon\xEDvel" });
      } catch (error) {
        console.error("Erro ao criar consultor:", error);
        res.status(500).json({ error: "Erro interno" });
      }
    });
    app.get("/api/consultants/slug/:slug", async (req, res) => {
      try {
        const { slug } = req.params;
        if (!slug) {
          return res.status(400).json({ error: "Slug obrigat\xF3rio" });
        }
        if (db) {
          const result = await db.query("SELECT * FROM consultants WHERE slug = $1", [slug]);
          if (result.rowCount === 0) {
            return res.status(404).json({ error: "Consultor n\xE3o encontrado" });
          }
          return res.json(result.rows[0]);
        }
        return res.status(503).json({ error: "Banco de dados indispon\xEDvel" });
      } catch (error) {
        console.error("Erro ao buscar consultor:", error);
        res.status(500).json({ error: "Erro interno" });
      }
    });
    wss.on("connection", (ws, req) => {
      console.log("New WebSocket connection");
      ws.on("message", async (data) => {
        try {
          const message = JSON.parse(data.toString());
          const { type, token, consultationId, content } = message;
          if (type === "auth") {
            const decoded = jwt.verify(token, JWT_SECRET);
            activeConnections.set(decoded.userId, ws);
            ws.userId = decoded.userId;
            ws.userRole = decoded.role;
            ws.send(JSON.stringify({ type: "auth_success", userId: decoded.userId }));
            return;
          }
          if (type === "join_consultation") {
            if (!ws.userId || !consultationId) return;
            if (db) {
              const result = await db.query(
                "SELECT * FROM consultations WHERE id = $1 AND (user_id = $2 OR consultant_id = $2)",
                [consultationId, ws.userId]
              );
              if (result.rowCount === 0) return;
              const consultation = result.rows[0];
              if (!consultationRooms.has(consultationId)) {
                consultationRooms.set(consultationId, {});
              }
              const room = consultationRooms.get(consultationId);
              if (ws.userRole === "cliente") {
                room.userWs = ws;
              } else if (ws.userRole === "consultor") {
                room.consultantWs = ws;
              }
              ws.consultationId = consultationId;
              ws.send(JSON.stringify({ type: "joined_consultation", consultationId }));
            }
            return;
          }
          if (type === "message" && ws.consultationId && content) {
            const consultationId2 = ws.consultationId;
            const senderType = ws.userRole === "cliente" ? "user" : "consultant";
            if (db) {
              const messageId = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
              await db.query(
                "INSERT INTO messages (id, consultation_id, sender_type, content) VALUES ($1, $2, $3, $4)",
                [messageId, consultationId2, senderType, content]
              );
            }
            const room = consultationRooms.get(consultationId2);
            if (room) {
              const broadcastMessage = {
                type: "message",
                consultationId: consultationId2,
                senderType,
                content,
                timestamp: (/* @__PURE__ */ new Date()).toISOString()
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
          console.error("WebSocket message error:", error);
          ws.send(JSON.stringify({ type: "error", message: "Invalid message format" }));
        }
      });
      ws.on("close", () => {
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
    app.post("/api/consultations", async (req, res) => {
      try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ error: "Token n\xE3o fornecido" });
        const decoded = jwt.verify(token, JWT_SECRET);
        const { consultantId } = req.body || {};
        if (!consultantId) return res.status(400).json({ error: "consultantId obrigat\xF3rio" });
        if (db) {
          const consultantResult = await db.query("SELECT price_per_minute FROM consultants WHERE id = $1", [consultantId]);
          if (consultantResult.rowCount === 0) {
            return res.status(404).json({ error: "Consultor n\xE3o encontrado" });
          }
          const consultationId = `consultation_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
          const pricePerMinute = consultantResult.rows[0].price_per_minute;
          await db.query(
            "INSERT INTO consultations (id, user_id, consultant_id, price_per_minute_snapshot) VALUES ($1, $2, $3, $4)",
            [consultationId, decoded.userId, consultantId, pricePerMinute]
          );
          return res.status(201).json({ consultationId, pricePerMinute });
        }
        return res.status(503).json({ error: "Banco de dados indispon\xEDvel" });
      } catch (error) {
        res.status(401).json({ error: "Token inv\xE1lido" });
      }
    });
    app.get("/api/consultations/:id/messages", async (req, res) => {
      try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ error: "Token n\xE3o fornecido" });
        const decoded = jwt.verify(token, JWT_SECRET);
        const { id } = req.params;
        if (db) {
          const consultationResult = await db.query(
            "SELECT * FROM consultations WHERE id = $1 AND (user_id = $2 OR consultant_id = $2)",
            [id, decoded.userId]
          );
          if (consultationResult.rowCount === 0) {
            return res.status(404).json({ error: "Consultoria n\xE3o encontrada" });
          }
          const messagesResult = await db.query(
            "SELECT * FROM messages WHERE consultation_id = $1 ORDER BY created_at ASC",
            [id]
          );
          return res.json(messagesResult.rows);
        }
        return res.status(503).json({ error: "Banco de dados indispon\xEDvel" });
      } catch (error) {
        res.status(401).json({ error: "Token inv\xE1lido" });
      }
    });
    app.get("/api/testimonials", async (req, res) => {
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
        res.json([
          {
            id: 1,
            userName: "Carolina M.",
            rating: 5,
            comment: "Consulta incr\xEDvel! A Maria foi muito precisa e me ajudou muito com suas orienta\xE7\xF5es.",
            consultantName: "Maria Silva",
            date: "2025-01-28",
            verified: true
          },
          {
            id: 2,
            userName: "Roberto S.",
            rating: 5,
            comment: "Excelente profissional. Jo\xE3o me trouxe clareza sobre quest\xF5es importantes da minha vida.",
            consultantName: "Jo\xE3o Santos",
            date: "2025-01-27",
            verified: true
          },
          {
            id: 3,
            userName: "Fernanda L.",
            rating: 5,
            comment: "Ana \xE9 fant\xE1stica! Suas mensagens s\xE3o sempre reconfortantes e precisas.",
            consultantName: "Ana Costa",
            date: "2025-01-26",
            verified: true
          }
        ]);
      } catch (error) {
        console.error("Erro ao buscar depoimentos:", error);
        res.status(500).json({ error: "Erro interno" });
      }
    });
    app.post("/api/testimonials", async (req, res) => {
      try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ error: "Token n\xE3o fornecido" });
        const decoded = jwt.verify(token, JWT_SECRET);
        const { consultantId, rating, comment } = req.body || {};
        if (!consultantId || !rating || rating < 1 || rating > 5) {
          return res.status(400).json({ error: "consultantId e rating (1-5) obrigat\xF3rios" });
        }
        if (db) {
          const testimonialId = `testimonial_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
          await db.query(
            "INSERT INTO testimonials (id, user_id, consultant_id, rating, comment) VALUES ($1, $2, $3, $4, $5)",
            [testimonialId, decoded.userId, consultantId, rating, comment || null]
          );
          return res.status(201).json({ success: true, testimonialId });
        }
        return res.status(503).json({ error: "Banco de dados indispon\xEDvel" });
      } catch (error) {
        res.status(401).json({ error: "Token inv\xE1lido" });
      }
    });
    app.get("/api/blog/recent", (req, res) => {
      res.json([
        {
          id: 1,
          title: "Como interpretar os sonhos: Guia completo",
          excerpt: "Descubra os significados ocultos dos seus sonhos e como eles podem orientar sua vida.",
          author: "Equipe Conselhos Esot\xE9ricos",
          publishedAt: "2025-01-28",
          readTime: "5 min",
          category: "Esoterismo",
          image: "/images/blog/sonhos.jpg",
          slug: "como-interpretar-sonhos-guia-completo"
        },
        {
          id: 2,
          title: "Os cristais e suas propriedades energ\xE9ticas",
          excerpt: "Conhe\xE7a os principais cristais e como utiliz\xE1-los para harmonizar suas energias.",
          author: "Maria Silva",
          publishedAt: "2025-01-25",
          readTime: "8 min",
          category: "Cristais",
          image: "/images/blog/cristais.jpg",
          slug: "cristais-propriedades-energeticas"
        },
        {
          id: 3,
          title: "Numerologia: descobrindo seu n\xFAmero da sorte",
          excerpt: "Aprenda a calcular e interpretar os n\xFAmeros que influenciam sua vida.",
          author: "Jo\xE3o Santos",
          publishedAt: "2025-01-22",
          readTime: "6 min",
          category: "Numerologia",
          image: "/images/blog/numerologia.jpg",
          slug: "numerologia-numero-da-sorte"
        }
      ]);
    });
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "public/index.html"));
    });
    init().then(() => {
      server.listen(PORT, "0.0.0.0", () => {
        console.log(`Conselhos Esot\xE9ricos: http://localhost:${PORT}`);
        console.log(`WebSocket Server: ws://localhost:${PORT}`);
        console.log("SISTEMA LIMPO - SEM MIGRA\xC7\xD5ES");
      });
    });
  }
});

// server/index.ts
process.env.DISABLE_DRIZZLE = "true";
process.env.NO_MIGRATIONS = "true";
console.log("Starting clean server...");
Promise.resolve().then(() => init_clean_server());
