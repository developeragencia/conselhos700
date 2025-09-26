// Netlify Function para consulta de CPF (mock)
exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método não permitido' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { cpf } = body;
    // Mock de dados para CPF
    if (cpf === '051.478.054-19') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          nome: 'Alex Silva',
          nascimento: '1990-05-21',
          sexo: 'M',
          status: 'Regular',
          mensagem: 'Dados encontrados com sucesso.'
        })
      };
    } else {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'CPF não encontrado.' })
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erro interno na consulta de CPF.' })
    };
  }
};
