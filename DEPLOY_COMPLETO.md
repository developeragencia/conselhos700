# Portal Esotérico - Conselhos Esotéricos

## 🚀 Deploy Completo para VPS Ubuntu 25.04 (Hostinger)

### ✅ Funcionalidades Implementadas

#### Backend (Express + WebSocket)
- ✅ Autenticação JWT (registro/login)
- ✅ Sistema de créditos (saldo, adicionar, debitar)
- ✅ CRUD de consultores
- ✅ Chat em tempo real via WebSocket
- ✅ Sistema de consultas e mensagens
- ✅ Depoimentos/testimonials
- ✅ CORS configurável
- ✅ Banco PostgreSQL/Neon

#### Frontend (Next.js + React)
- ✅ Landing page com consultores dinâmicos
- ✅ Página de consultores com filtros funcionais
- ✅ Perfil individual do consultor
- ✅ Chat em tempo real
- ✅ Sistema de registro/login
- ✅ Dashboard do usuário
- ✅ Página de créditos (simulação Stripe)
- ✅ Responsivo e PWA-ready

#### Banco de Dados
- ✅ Tabelas: users, consultants, consultations, messages, credits_transactions, testimonials
- ✅ Scripts SQL de inicialização
- ✅ Relacionamentos e constraints

### 🛠️ Tecnologias Utilizadas

- **Backend**: Express.js, WebSocket, JWT, bcrypt
- **Frontend**: Next.js 14, React 18, Tailwind CSS, shadcn/ui
- **Banco**: PostgreSQL (Neon)
- **Deploy**: PM2, Nginx, Ubuntu 25.04
- **Pagamentos**: Stripe SDK (simulação)

### 📋 Pré-requisitos para Deploy

1. **VPS Ubuntu 25.04** (Hostinger)
2. **Domínio** configurado (ex: conselhosesotericos.com.br)
3. **Banco PostgreSQL** (Neon ou Hostinger)
4. **Chaves Stripe** (para pagamentos reais)

### 🚀 Passos para Deploy

#### 1. Preparar VPS
```bash
# Conectar via SSH
ssh root@seu-vps-ip

# Executar script de deploy
chmod +x deploy.sh
./deploy.sh
```

#### 2. Configurar Variáveis de Ambiente
```bash
# Editar arquivo .env
nano .env
```

```env
# Server
PORT=5000
NODE_ENV=production

# Database (Neon ou PostgreSQL)
DATABASE_URL=postgres://user:password@host:port/database?sslmode=require

# JWT secret (gere uma chave forte)
JWT_SECRET=sua_chave_secreta_super_forte_aqui

# CORS / Allowed origins
ALLOWED_ORIGINS=https://conselhosesotericos.com.br,https://www.conselhosesotericos.com.br

# Stripe (opcional)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

#### 3. Configurar Banco de Dados
```bash
# Criar tabelas
psql "$DATABASE_URL" -f scripts/init-db.sql

# Criar consultor de teste
curl -X POST http://localhost:5000/api/consultants \
  -H "Content-Type: application/json" \
  -d '{
    "slug":"maria-silva",
    "name":"Maria Silva",
    "title":"Taróloga",
    "specialty":"Tarot",
    "description":"Especialista em relacionamentos",
    "pricePerMinute":3.5,
    "status":"online",
    "imageUrl":"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face"
  }'
```

#### 4. Configurar Nginx
```bash
# Verificar configuração
sudo nginx -t

# Recarregar
sudo systemctl reload nginx
```

#### 5. Configurar SSL (Let's Encrypt)
```bash
# Instalar Certbot
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

# Obter certificado
sudo certbot --nginx -d conselhosesotericos.com.br -d www.conselhosesotericos.com.br
```

### 🔧 Comandos de Manutenção

```bash
# Reiniciar aplicação
pm2 restart conselhos-esotericos

# Ver logs
pm2 logs conselhos-esotericos

# Monitoramento
pm2 monit

# Status Nginx
sudo systemctl status nginx

# Recarregar Nginx
sudo systemctl reload nginx

# Backup do banco
pg_dump "$DATABASE_URL" > backup-$(date +%Y%m%d).sql
```

### 📊 Monitoramento

- **PM2**: `pm2 monit`
- **Nginx**: `sudo systemctl status nginx`
- **Logs**: `pm2 logs conselhos-esotericos`
- **Banco**: Monitorar via Neon/Hostinger dashboard

### 🔒 Segurança

- ✅ Firewall configurado (UFW)
- ✅ SSL/TLS com Let's Encrypt
- ✅ Senhas hashadas (bcrypt)
- ✅ JWT com expiração
- ✅ CORS configurável
- ✅ Headers de segurança

### 📱 Funcionalidades Mobile

- ✅ PWA-ready (manifest.json)
- ✅ Responsivo (Tailwind CSS)
- ✅ Touch-friendly
- ✅ WhatsApp integration

### 🎯 Próximos Passos (Opcionais)

1. **Stripe Real**: Implementar webhooks e checkout real
2. **Notificações**: Push notifications para consultas
3. **Admin Panel**: Painel administrativo para consultores
4. **Analytics**: Google Analytics ou similar
5. **CDN**: CloudFlare para assets estáticos
6. **Backup**: Backup automático do banco
7. **Monitoring**: Sentry para error tracking

### 🆘 Troubleshooting

#### App não inicia
```bash
pm2 logs conselhos-esotericos
# Verificar logs de erro
```

#### Banco não conecta
```bash
# Testar conexão
psql "$DATABASE_URL" -c "SELECT 1;"
```

#### Nginx erro 502
```bash
# Verificar se app está rodando
pm2 status
# Verificar porta 5000
netstat -tlnp | grep 5000
```

#### WebSocket não funciona
```bash
# Verificar se porta está aberta
sudo ufw status
# Verificar logs do WebSocket
pm2 logs conselhos-esotericos | grep WebSocket
```

### 📞 Suporte

- **WhatsApp**: +55 11 95165-3210
- **Email**: contato@conselhosesotericos.com.br
- **Desenvolvedor**: Alex Developer

---

**🎉 Portal Esotérico está pronto para produção!**

Acesse: https://conselhosesotericos.com.br
