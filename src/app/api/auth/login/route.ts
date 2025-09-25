import { type NextRequest, NextResponse } from "next/server";
import postgres from "postgres";
import bcrypt from "bcryptjs";

const sql = postgres(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validar campos obrigatórios
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Buscar usuário
    const usersResult = await sql`
      SELECT id, name, email, phone, birth_date as "birthDate", password, credits, role, is_active as "isActive", created_at as "createdAt"
      FROM users 
      WHERE email = ${email}
    `;

    if (usersResult.length === 0) {
      return NextResponse.json(
        { error: "Email ou senha incorretos" },
        { status: 401 }
      );
    }
    
    const user = usersResult[0];

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Email ou senha incorretos" },
        { status: 401 }
      );
    }

    // Verificar se usuário está ativo
    if (!user.isActive) {
      return NextResponse.json(
        { error: "Conta desativada" },
        { status: 401 }
      );
    }

    // Remover senha da resposta
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: "Login realizado com sucesso", user: userWithoutPassword },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}