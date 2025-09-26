// Netlify Function para artigos recentes do blog
exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método não permitido' })
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify([
      { id: 1, title: "Como o Tarot pode transformar sua vida", author: "Equipe Esotérica", date: "2025-09-20" },
      { id: 2, title: "Astrologia: Previsões para 2026", author: "Ana Paula Silva", date: "2025-09-18" },
      { id: 3, title: "Mediunidade: Mitos e Verdades", author: "João Carlos", date: "2025-09-15" }
    ])
  };
};
