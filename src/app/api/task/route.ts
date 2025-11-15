import { HttpStatusCode } from 'axios';
import { format } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { ERRORS } from '@/constants/error';
import { taskSchema } from '@/lib/validation/task';
import { taskService } from '@/services/task.service';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: ERRORS.UNAUTHORIZED.message }, { status: ERRORS.UNAUTHORIZED.statusCode });
    }

    const body = await request.json();

    const validatedData = taskSchema.parse({
      ...body,
      userId: session.user.id,
      startDate: body.startDate || format(new Date(), 'yy-MM-dd'),
      isDone: body.isDone ?? false,
    });

    const task = await taskService.create(validatedData);

    return NextResponse.json({ success: true, data: task }, { status: HttpStatusCode.Created });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ success: false, error: ERRORS.VALIDATION_ERROR.message }, { status: ERRORS.VALIDATION_ERROR.statusCode });
    }
    return NextResponse.json({ success: false, error: ERRORS.CREATE_TASK_ERROR.message }, { status: ERRORS.CREATE_TASK_ERROR.statusCode });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: ERRORS.UNAUTHORIZED.message }, { status: ERRORS.UNAUTHORIZED.statusCode });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');

    if (!startDate) {
      return NextResponse.json({ success: false, error: ERRORS.VALIDATION_ERROR.message }, { status: ERRORS.VALIDATION_ERROR.statusCode });
    }

    const tasks = await taskService.findAll({ userId: session.user.id, startDate: startDate });
    return NextResponse.json({ success: true, data: tasks }, { status: HttpStatusCode.Ok });
  } catch (error) {
    console.error('GET /api/task error:', error);
    return NextResponse.json(
      { success: false, error: ERRORS.GET_ALL_TASKS_ERROR.message, details: error instanceof Error ? error.message : String(error) },
      { status: ERRORS.GET_ALL_TASKS_ERROR.statusCode },
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
    const { id, ...taskData } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: ERRORS.VALIDATION_ERROR.message }, { status: ERRORS.VALIDATION_ERROR.statusCode });
    }

    const validatedData = taskSchema.parse({
      ...taskData,
      userId: session.user.id,
      startDate: taskData.startDate || format(new Date(), 'yy-MM-dd'),
      isDone: taskData.isDone ?? false,
    });

    const task = await taskService.update({ id, data: validatedData });

    return NextResponse.json({ success: true, data: task }, { status: HttpStatusCode.Ok });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ success: false, error: ERRORS.VALIDATION_ERROR.message }, { status: ERRORS.VALIDATION_ERROR.statusCode });
    }
    return NextResponse.json({ success: false, error: ERRORS.UPDATE_TASK_ERROR.message }, { status: ERRORS.UPDATE_TASK_ERROR.statusCode });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: ERRORS.UNAUTHORIZED.message }, { status: ERRORS.UNAUTHORIZED.statusCode });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: ERRORS.VALIDATION_ERROR.message }, { status: ERRORS.VALIDATION_ERROR.statusCode });
    }

    await taskService.delete(id);

    return NextResponse.json({ success: true }, { status: HttpStatusCode.Ok });
  } catch {
    return NextResponse.json({ success: false, error: ERRORS.DELETE_TASK_ERROR.message }, { status: ERRORS.DELETE_TASK_ERROR.statusCode });
  }
}
