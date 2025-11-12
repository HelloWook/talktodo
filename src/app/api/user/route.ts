import { NextResponse } from 'next/server';

import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: session.user.id,
        email: session.user.email,
        nickname: session.user.name,
        image: session.user.image,
      },
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
