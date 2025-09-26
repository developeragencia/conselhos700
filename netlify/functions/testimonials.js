// Netlify Function para depoimentos
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
      { id: 1, content: "Consulta incrível! Maria foi muito precisa.", authorName: "Sandra Oliveira", authorLocation: "São Paulo - SP", rating: 5 },
      { id: 2, content: "João fez um mapa astral perfeito. Recomendo!", authorName: "Pedro Lima", authorLocation: "Rio de Janeiro - RJ", rating: 5 },
      { id: 3, content: "Ana tem um dom especial. A consulta foi transformadora!", authorName: "Carla Santos", authorLocation: "Belo Horizonte - MG", rating: 5 }
    ])
  };
};
