import { HttpStatusCode } from 'axios';
import { format } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { ERRORS, type ApiErrorResponse } from '@/error/error';
import { taskSchema } from '@/lib/validation/task';
import { taskService } from '@/services/task.service';

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
    const { tasks } = body;

    if (!Array.isArray(tasks) || tasks.length === 0) {
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: ERRORS.VALIDATION_ERROR,
      };
      return NextResponse.json(errorResponse, { status: ERRORS.VALIDATION_ERROR.statusCode });
    }

    // 모든 task 데이터 검증 및 변환
    const validatedTasks = tasks.map((task) =>
      taskSchema.parse({
        ...task,
        userId: session?.user?.id || '',
        startDate: task.startDate || format(new Date(), 'yy-MM-dd'),
        isDone: task.isDone ?? false,
      }),
    );

    const createdTasks = await taskService.createMany(validatedTasks);

    return NextResponse.json({ success: true, data: createdTasks }, { status: HttpStatusCode.Created });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      const errorResponse: ApiErrorResponse = {
        success: false,
        error: ERRORS.VALIDATION_ERROR,
      };
      return NextResponse.json(errorResponse, { status: ERRORS.VALIDATION_ERROR.statusCode });
    }
    console.error('Batch create tasks error:', error);
    const errorResponse: ApiErrorResponse = {
      success: false,
      error: ERRORS.CREATE_TASK_ERROR,
    };
    return NextResponse.json(errorResponse, { status: ERRORS.CREATE_TASK_ERROR.statusCode });
  }
}
