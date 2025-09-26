// Netlify Function para consultores em destaque
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
      { id: 1, name: "Maria Fernanda", specialty: "Tarot", price_per_minute: "3.50" },
      { id: 2, name: "João Carlos", specialty: "Astrologia", price_per_minute: "4.00" }
    ])
  };
};
