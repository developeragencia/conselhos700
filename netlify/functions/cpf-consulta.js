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
    // Validação simples de CPF (formato e dígitos)
    const isValidCPF = (cpf) => {
      cpf = cpf.replace(/\D/g, '');
      if (cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) return false;
      let sum = 0, rest;
      for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i-1, i)) * (11 - i);
      rest = (sum * 10) % 11;
      if ((rest === 10) || (rest === 11)) rest = 0;
      if (rest !== parseInt(cpf.substring(9, 10))) return false;
      sum = 0;
      for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i-1, i)) * (12 - i);
      rest = (sum * 10) % 11;
      if ((rest === 10) || (rest === 11)) rest = 0;
      if (rest !== parseInt(cpf.substring(10, 11))) return false;
      return true;
    };

    if (isValidCPF(cpf)) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          status: 'Regular',
          mensagem: 'CPF validado com sucesso.'
        })
      };
    } else {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'CPF inválido.' })
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
