// Função Netlify para registro de usuário
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Simulação de armazenamento em memória
const memory = { users: new Map() };

const createUser = async (data) => {
  const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const hash = await bcrypt.hash(data.password, 10);

  const user = {
    id,
    email: data.email.toLowerCase(),
    first_name: data.name.split(' ')[0],
    last_name: data.name.split(' ').slice(1).join(' ') || '',
    password_hash: hash,
    role: data.role,
    phone: data.phone,
    cpf: data.cpf,
    credits: data.role === 'cliente' ? '10.00' : '0.00',
    is_active: true,
    created_at: new Date()
  };

  memory.users.set(user.email, user);
  return user;
};

const findUser = async (email) => {
  return memory.users.get(email);
};

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
    const { email, name, password, role, cpf, phone } = body;

    if (!email || !name || !password || !role || !cpf || !phone) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Campos obrigatórios: email, password, name, role, cpf, phone' })
      };
    }

    if (await findUser(email.toLowerCase())) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email já cadastrado' })
      };
    }

    const user = await createUser({ email, name, password, role, cpf, phone });
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        token,
        user: { id: user.id, email: user.email, firstName: user.first_name, role: user.role },
        message: `${role.charAt(0).toUpperCase() + role.slice(1)} registrado com sucesso!`
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erro interno' })
    };
  }
};
