import { HttpStatusCode } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { ERRORS } from '@/constants/error';
import { userUpdateSchema } from '@/lib/validation/user';
import { userService } from '@/services/user.service';

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ success: false, error: ERRORS.UNAUTHORIZED.message }, { status: ERRORS.UNAUTHORIZED.statusCode });
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
    return NextResponse.json(
      { success: false, error: ERRORS.INTERNAL_SERVER_ERROR.message },
      { status: ERRORS.INTERNAL_SERVER_ERROR.statusCode },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: ERRORS.UNAUTHORIZED.message }, { status: ERRORS.UNAUTHORIZED.statusCode });
    }

    const body = await request.json();

    // 이메일은 수정 불가이므로 제외하고 검증
    const validatedData = userUpdateSchema.parse(body);

    const user = await userService.updateUser(session.user.id, validatedData);

    return NextResponse.json({ success: true, data: user }, { status: HttpStatusCode.Ok });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ success: false, error: ERRORS.VALIDATION_ERROR.message }, { status: ERRORS.VALIDATION_ERROR.statusCode });
    }
    return NextResponse.json({ success: false, error: ERRORS.UPDATE_USER_ERROR.message }, { status: ERRORS.UPDATE_USER_ERROR.statusCode });
  }
}
