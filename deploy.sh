#!/bin/bash

# Script de Deploy para VPS Ubuntu 25.04 (Hostinger)
# Portal Esotérico - Conselhos Esotéricos

echo "🚀 Iniciando deploy do Portal Esotérico..."

# 1. Atualizar sistema
echo "📦 Atualizando sistema..."
sudo apt update && sudo apt upgrade -y

# 2. Instalar dependências
echo "🔧 Instalando dependências..."
sudo apt install -y curl git nginx postgresql-client

# 3. Instalar Node.js 20 LTS
echo "📦 Instalando Node.js 20 LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 4. Instalar PM2 globalmente
echo "⚙️ Instalando PM2..."
sudo npm install -g pm2

# 5. Criar diretório do projeto
echo "📁 Criando diretório do projeto..."
sudo mkdir -p /var/www
cd /var/www

# 6. Clonar repositório (substitua pela URL do seu repositório)
echo "📥 Clonando repositório..."
# git clone https://github.com/seu-usuario/conselhos-esotericos.git ConselhosEsotericos
# cd ConselhosEsotericos

# 7. Instalar dependências
echo "📦 Instalando dependências do projeto..."
npm ci

# 8. Configurar variáveis de ambiente
echo "🔐 Configurando variáveis de ambiente..."
cp .env.example .env
echo "⚠️  IMPORTANTE: Edite o arquivo .env com suas configurações:"
echo "   - DATABASE_URL (Neon ou PostgreSQL)"
echo "   - JWT_SECRET (chave secreta forte)"
echo "   - ALLOWED_ORIGINS (domínios permitidos)"

# 9. Build do projeto
echo "🏗️ Fazendo build do projeto..."
npm run build

# 10. Configurar banco de dados
echo "🗄️ Configurando banco de dados..."
echo "⚠️  Execute o seguinte comando para criar as tabelas:"
echo "   psql \"\$DATABASE_URL\" -f scripts/init-db.sql"

# 11. Configurar PM2
echo "⚙️ Configurando PM2..."
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup

# 12. Configurar Nginx
echo "🌐 Configurando Nginx..."
sudo cp nginx.conselhos-esotericos.conf /etc/nginx/sites-available/conselhos
sudo ln -s /etc/nginx/sites-available/conselhos /etc/nginx/sites-enabled/conselhos
sudo nginx -t && sudo systemctl reload nginx

# 13. Configurar firewall
echo "🔥 Configurando firewall..."
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw --force enable

# 14. Instalar SSL (opcional)
echo "🔒 Para instalar SSL com Let's Encrypt:"
echo "   sudo snap install core; sudo snap refresh core"
echo "   sudo snap install --classic certbot"
echo "   sudo ln -s /snap/bin/certbot /usr/bin/certbot"
echo "   sudo certbot --nginx -d conselhosesotericos.com.br -d www.conselhosesotericos.com.br"

echo "✅ Deploy concluído!"
echo "🌐 Acesse: http://seu-dominio.com"
echo "📊 Monitoramento: pm2 monit"
echo "📝 Logs: pm2 logs"

# Comandos úteis:
echo ""
echo "🔧 Comandos úteis:"
echo "   pm2 restart conselhos-esotericos  # Reiniciar app"
echo "   pm2 logs conselhos-esotericos     # Ver logs"
echo "   pm2 monit                         # Monitoramento"
echo "   sudo systemctl status nginx       # Status Nginx"
echo "   sudo systemctl reload nginx       # Recarregar Nginx"
