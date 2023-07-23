import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) new NextResponse('Unauthorized', { status: 401 });
    if (!name) new NextResponse('name is required', { status: 400 });

    if (userId) {
      const store = await prismadb.store.create({
        data: {
          name,
          userId
        }
      });

      return NextResponse.json(store);
    }
  } catch (err) {
    console.log('[STORES_POST]', err);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
