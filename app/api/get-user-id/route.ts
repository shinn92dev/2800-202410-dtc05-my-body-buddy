// pages/api/get-user-id.ts

import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
    }

    return NextResponse.json({ userId }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user ID:', (error as Error).message);
    return NextResponse.json({ message: 'Internal Server Error', error: (error as Error).message }, { status: 500 });
  }
}
