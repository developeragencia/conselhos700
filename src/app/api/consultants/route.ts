import { type NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../server/db';
import { consultants } from '../../../../shared/schema';

export async function GET() {
  try {
    const result = await db.select().from(consultants);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching consultants:', error);
    return NextResponse.json(
      { error: 'Failed to fetch consultants' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const [newConsultant] = await db
      .insert(consultants)
      .values(body)
      .returning();
    
    return NextResponse.json(newConsultant, { status: 201 });
  } catch (error) {
    console.error('Error creating consultant:', error);
    return NextResponse.json(
      { error: 'Failed to create consultant' },
      { status: 500 }
    );
  }
}