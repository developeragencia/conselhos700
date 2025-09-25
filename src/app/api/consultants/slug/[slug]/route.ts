import { type NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!);

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    if (!slug) {
      return NextResponse.json(
        { error: "Slug é obrigatório" },
        { status: 400 }
      );
    }

    // Buscar consultor pelo slug
    const consultants = await sql`
      SELECT 
        id, name, slug, title, description, 
        price_per_minute as "pricePerMinute",
        rating, review_count as "reviewCount",
        image_url as "imageUrl", specialty, specialties,
        status, experience
      FROM consultants 
      WHERE slug = ${slug}
    `;
    
    if (consultants.length === 0) {
      return NextResponse.json(
        { error: "Consultor não encontrado" },
        { status: 404 }
      );
    }

    const consultant = consultants[0];
    
    // Converter pricePerMinute para número
    consultant.pricePerMinute = Number.parseFloat(consultant.pricePerMinute);
    consultant.rating = Number.parseFloat(consultant.rating);

    return NextResponse.json(consultant);
  } catch (error) {
    console.error("Erro ao buscar consultor:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}