import { HttpStatusCode } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { ERRORS, type ApiErrorResponse } from '@/error/error';
import { goalSchema } from '@/lib/validation/goal';
import { goalService } from '@/services/goal.service';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: ERRORS.UNAUTHORIZED,
      };
      return NextResponse.json(errorResponse, { status: ERRORS.UNAUTHORIZED.statusCode });
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
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: ERRORS.VALIDATION_ERROR,
      };
      return NextResponse.json(errorResponse, { status: ERRORS.VALIDATION_ERROR.statusCode });
    }
    const errorResponse: ApiErrorResponse = {
      success: false,
      error: ERRORS.CREATE_GOAL_ERROR,
    };
    return NextResponse.json(errorResponse, { status: ERRORS.CREATE_GOAL_ERROR.statusCode });
  }
}

export async function GET(_request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: ERRORS.UNAUTHORIZED,
      };
      return NextResponse.json(errorResponse, { status: ERRORS.UNAUTHORIZED.statusCode });
    }

    const goals = await goalService.findAll(session.user.id);
    return NextResponse.json({ success: true, data: goals }, { status: HttpStatusCode.Ok });
  } catch (error) {
    console.error('GET /api/goal error:', error);
    const errorResponse: ApiErrorResponse = {
      success: false,
      error: ERRORS.GET_ALL_GOALS_ERROR,
    };
    return NextResponse.json(errorResponse, { status: ERRORS.GET_ALL_GOALS_ERROR.statusCode });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: ERRORS.UNAUTHORIZED,
      };
      return NextResponse.json(errorResponse, { status: ERRORS.UNAUTHORIZED.statusCode });
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: ERRORS.VALIDATION_ERROR,
      };
      return NextResponse.json(errorResponse, { status: ERRORS.VALIDATION_ERROR.statusCode });
    }

    const validatedData = goalSchema.parse({
      ...updateData,
      userId: session.user.id,
    });

    const goal = await goalService.update(id, validatedData);

    return NextResponse.json({ success: true, data: goal }, { status: HttpStatusCode.Ok });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: ERRORS.VALIDATION_ERROR,
      };
      return NextResponse.json(errorResponse, { status: ERRORS.VALIDATION_ERROR.statusCode });
    }
    const errorResponse: ApiErrorResponse = {
      success: false,
      error: ERRORS.CREATE_GOAL_ERROR,
    };
    return NextResponse.json(errorResponse, { status: ERRORS.CREATE_GOAL_ERROR.statusCode });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: ERRORS.UNAUTHORIZED,
      };
      return NextResponse.json(errorResponse, { status: ERRORS.UNAUTHORIZED.statusCode });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: ERRORS.VALIDATION_ERROR,
      };
      return NextResponse.json(errorResponse, { status: ERRORS.VALIDATION_ERROR.statusCode });
    }

    await goalService.delete(id);

    return NextResponse.json({ success: true }, { status: HttpStatusCode.Ok });
  } catch {
    const errorResponse: ApiErrorResponse = {
      success: false,
      error: ERRORS.DELETE_GOAL_ERROR,
    };
    return NextResponse.json(errorResponse, { status: ERRORS.DELETE_GOAL_ERROR.statusCode });
  }
}
