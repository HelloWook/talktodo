import { HttpStatusCode } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { ERRORS } from '@/constants/error';
import { goalSchema } from '@/lib/validation/goal';
import { goalService } from '@/services/goal.service';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: ERRORS.UNAUTHORIZED.message }, { status: ERRORS.UNAUTHORIZED.statusCode });
    }

    const body = await request.json();

    const validatedData = goalSchema.parse({
      ...body,
      userId: session.user.id,
    });

    const goal = await goalService.create(validatedData);

    return NextResponse.json({ success: true, data: goal }, { status: HttpStatusCode.Created });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ success: false, error: ERRORS.VALIDATION_ERROR.message }, { status: ERRORS.VALIDATION_ERROR.statusCode });
    }
    return NextResponse.json({ success: false, error: ERRORS.CREATE_GOAL_ERROR.message }, { status: ERRORS.CREATE_GOAL_ERROR.statusCode });
  }
}

export async function GET(_request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: ERRORS.UNAUTHORIZED.message }, { status: ERRORS.UNAUTHORIZED.statusCode });
    }

    const goals = await goalService.findAll(session.user.id);
    return NextResponse.json({ success: true, data: goals }, { status: HttpStatusCode.Ok });
  } catch (error) {
    console.error('GET /api/goal error:', error);
    return NextResponse.json(
      { success: false, error: ERRORS.GET_ALL_GOALS_ERROR.message },
      { status: ERRORS.GET_ALL_GOALS_ERROR.statusCode },
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
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Goal ID is required' }, { status: HttpStatusCode.BadRequest });
    }

    const validatedData = goalSchema.parse({
      ...updateData,
      userId: session.user.id,
    });

    const goal = await goalService.update(id, validatedData);

    return NextResponse.json({ success: true, data: goal }, { status: HttpStatusCode.Ok });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ success: false, error: ERRORS.VALIDATION_ERROR.message }, { status: ERRORS.VALIDATION_ERROR.statusCode });
    }
    return NextResponse.json({ success: false, error: ERRORS.CREATE_GOAL_ERROR.message }, { status: ERRORS.CREATE_GOAL_ERROR.statusCode });
  }
}
