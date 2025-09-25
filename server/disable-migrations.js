// Script para desabilitar completamente migrações
// Remove qualquer detecção de mudanças no banco de dados

console.log('🚫 MIGRAÇÕES DESABILITADAS - Usando clean-server.js apenas');

// Sobrescrever qualquer configuração do Drizzle
if (typeof global !== 'undefined') {
  global.DISABLE_DRIZZLE = true;
  global.NO_MIGRATIONS = true;
}

// Exportar configuração vazia para Drizzle
export default {
  schema: {},
  out: "./migrations-disabled",
  driver: "turso",
  dbCredentials: {
    url: "disabled://no-migrations"
  }
};