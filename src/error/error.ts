// 에러 타입 정의
export type ErrorKey =
  | 'VALIDATION_ERROR'
  | 'CREATE_TASK_ERROR'
  | 'UPDATE_TASK_ERROR'
  | 'DELETE_TASK_ERROR'
  | 'GET_TASK_ERROR'
  | 'GET_ALL_TASKS_ERROR'
  | 'GET_TASK_BY_ID_ERROR'
  | 'GET_TASK_BY_USER_ID_ERROR'
  | 'GET_TASK_BY_GOAL_ID_ERROR'
  | 'CREATE_GOAL_ERROR'
  | 'GET_ALL_GOALS_ERROR'
  | 'UPDATE_USER_ERROR'
  | 'UNAUTHORIZED'
  | 'NOT_FOUND'
  | 'INTERNAL_SERVER_ERROR';

// 에러 정보 인터페이스
export interface ErrorInfo {
  message: string;
  code: string;
  statusCode: number;
}

// 에러 정보 객체
export const ERRORS: Record<ErrorKey, ErrorInfo> = {
  VALIDATION_ERROR: {
    message: '데이터 검증에 실패했습니다.',
    code: 'ERR_40000',
    statusCode: 400,
  },
  UNAUTHORIZED: {
    message: '인증이 필요합니다.',
    code: 'ERR_40100',
    statusCode: 401,
  },
  CREATE_TASK_ERROR: {
    message: '할 일 생성에 실패했습니다.',
    code: 'ERR_50000',
    statusCode: 500,
  },
  UPDATE_TASK_ERROR: {
    message: '할 일 수정에 실패했습니다.',
    code: 'ERR_50001',
    statusCode: 500,
  },
  DELETE_TASK_ERROR: {
    message: '할 일 삭제에 실패했습니다.',
    code: 'ERR_50002',
    statusCode: 500,
  },
  GET_TASK_ERROR: {
    message: '할 일 조회에 실패했습니다.',
    code: 'ERR_50003',
    statusCode: 500,
  },
  GET_ALL_TASKS_ERROR: {
    message: '모든 할 일 조회에 실패했습니다.',
    code: 'ERR_50004',
    statusCode: 500,
  },
  GET_TASK_BY_ID_ERROR: {
    message: '할 일 ID로 조회에 실패했습니다.',
    code: 'ERR_50005',
    statusCode: 500,
  },
  GET_TASK_BY_USER_ID_ERROR: {
    message: '사용자 ID로 조회에 실패했습니다.',
    code: 'ERR_50006',
    statusCode: 500,
  },
  GET_TASK_BY_GOAL_ID_ERROR: {
    message: '목표 ID로 조회에 실패했습니다.',
    code: 'ERR_50007',
    statusCode: 500,
  },
  CREATE_GOAL_ERROR: {
    message: '목표 생성에 실패했습니다.',
    code: 'ERR_50008',
    statusCode: 500,
  },
  GET_ALL_GOALS_ERROR: {
    message: '모든 목표 조회에 실패했습니다.',
    code: 'ERR_50009',
    statusCode: 500,
  },
  UPDATE_USER_ERROR: {
    message: '사용자 정보 수정에 실패했습니다.',
    code: 'ERR_50010',
    statusCode: 500,
  },
  NOT_FOUND: {
    message: '요청한 리소스를 찾을 수 없습니다.',
    code: 'ERR_40400',
    statusCode: 404,
  },
  INTERNAL_SERVER_ERROR: {
    message: '서버 내부 오류가 발생했습니다.',
    code: 'ERR_50099',
    statusCode: 500,
  },
} as const;

export const getError = (key: ErrorKey): ErrorInfo => ERRORS[key];

export const getErrorMessage = (key: ErrorKey): string => ERRORS[key].message;

export const getErrorCode = (key: ErrorKey): string => ERRORS[key].code;

export const getErrorStatusCode = (key: ErrorKey): number => ERRORS[key].statusCode;

// API 응답 타입
export interface ApiErrorResponse {
  success: false;
  error: ErrorInfo;
}

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

// 커스텀 에러 클래스 (클라이언트에서 사용)
export class ApiError extends Error {
  public readonly code: string;
  public readonly statusCode: number;

  constructor(errorInfo: ErrorInfo) {
    super(errorInfo.message);
    this.name = 'ApiError';
    this.code = errorInfo.code;
    this.statusCode = errorInfo.statusCode;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static fromErrorInfo(errorInfo: ErrorInfo): ApiError {
    return new ApiError(errorInfo);
  }
}
