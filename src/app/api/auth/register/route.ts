import { type NextRequest, NextResponse } from "next/server";
import postgres from "postgres";
import bcrypt from "bcryptjs";

const sql = postgres(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, birthDate, password } = await request.json();

    // Validar campos obrigatórios
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nome, email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Verificar se o usuário já existe
    const existingUsers = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: "Email já está em uso" },
        { status: 400 }
      );
    }

    // Criptografar senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário
    const newUsers = await sql`
      INSERT INTO users (name, email, phone, birth_date, password, credits, role)
      VALUES (${name}, ${email}, ${phone || null}, ${birthDate || null}, ${hashedPassword}, 50, 'user')
      RETURNING id, name, email, phone, birth_date as "birthDate", credits, role, created_at as "createdAt"
    `;
    
    const newUser = newUsers[0];

    // Remover senha da resposta
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      { message: "Usuário criado com sucesso", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}