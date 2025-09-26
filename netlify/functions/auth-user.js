// Netlify Function para autenticação de usuário
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'conselhos_secret_2025';

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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

  const authHeader = event.headers['authorization'] || event.headers['Authorization'];
  if (!authHeader) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Token não fornecido' })
    };
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ userId: decoded.userId, role: decoded.role })
    };
  } catch (err) {
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: 'Token inválido' })
    };
  }
};
