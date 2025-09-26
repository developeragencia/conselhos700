#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Criar diretório api se não existir
const apiDir = path.join(__dirname, 'api');
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

// Copiar arquivo compilado para api
const sourceFile = path.join(__dirname, 'dist', 'index.js');
const targetFile = path.join(apiDir, 'index.js');

if (fs.existsSync(sourceFile)) {
  fs.copyFileSync(sourceFile, targetFile);
  console.log('✅ Arquivo copiado para api/index.js');
} else {
  console.error('❌ Arquivo dist/index.js não encontrado');
  process.exit(1);
}
