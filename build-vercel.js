#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🏗️ Iniciando build para Vercel...');

// Executar vite build
console.log('📦 Executando vite build...');
execSync('vite build', { stdio: 'inherit' });

// Copiar arquivos para raiz
console.log('📋 Copiando arquivos para raiz...');
const sourceDir = path.join(__dirname, 'dist', 'public');
const targetDir = __dirname;

if (fs.existsSync(sourceDir)) {
  // Função para copiar recursivamente
  function copyRecursive(src, dest) {
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      const files = fs.readdirSync(src);
      files.forEach(file => {
        copyRecursive(path.join(src, file), path.join(dest, file));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  // Limpar arquivos antigos na raiz (exceto alguns importantes)
  const keepFiles = ['package.json', 'vercel.json', '.vercelignore', '.gitignore', 'README.md'];
  const rootFiles = fs.readdirSync(targetDir);
  rootFiles.forEach(file => {
    if (!keepFiles.includes(file) && !file.startsWith('.')) {
      const filePath = path.join(targetDir, file);
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(filePath);
      }
    }
  });

  // Copiar novos arquivos
  copyRecursive(sourceDir, targetDir);
  console.log('✅ Arquivos copiados com sucesso!');
} else {
  console.error('❌ Diretório dist/public não encontrado');
  process.exit(1);
}

console.log('🎉 Build concluído!');