import { Response } from 'express';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  status: number;
  timestamp: string;
  metadata?: ResponseMetadata;
}

export interface ResponseMetadata {
  total?: number;
  page?: number;
  limit?: number;
  path?: string;
  method?: string;
}

export interface ErrorResponse {
  success: boolean;
  error: string;
  message: string;
  status: number;
  timestamp: string;
  details?: Record<string, unknown>;
  stack?: string;
}

export class ResponseUtil {
  static success<T>(
    res: Response,
    data: T,
    message: string = 'Operación exitosa',
    statusCode: number = 200
  ): Response {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message,
      status: statusCode,
      timestamp: new Date().toISOString()
    };
    return res.status(statusCode).json(response);
  }

  static created<T>(
    res: Response,
    data: T,
    message: string = 'Recurso creado exitosamente'
  ): Response {
    return this.success(res, data, message, 201);
  }

  static updated<T>(
    res: Response,
    data: T,
    message: string = 'Recurso actualizado exitosamente'
  ): Response {
    return this.success(res, data, message, 200);
  }

  static deleted(
    res: Response,
    message: string = 'Recurso eliminado exitosamente'
  ): Response {
    return this.success(res, { success: true }, message, 200);
  }

  static paginated<T>(
    res: Response,
    data: T[],
    total: number,
    page: number,
    limit: number,
    message: string = 'Datos obtenidos exitosamente'
  ): Response {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message,
      status: 200,
      timestamp: new Date().toISOString(),
      metadata: {
        total,
        page,
        limit,
        path: res.req?.path,
        method: res.req?.method
      }
    };
    return res.status(200).json(response);
  }

  static error(
    res: Response,
    message: string,
    statusCode: number = 500,
    details?: Record<string, unknown>
  ): Response {
    const response: ErrorResponse = {
      success: false,
      error: this.getErrorType(statusCode),
      message,
      status: statusCode,
      timestamp: new Date().toISOString(),
      details
    };
    return res.status(statusCode).json(response);
  }

  static badRequest(
    res: Response,
    message: string = 'Solicitud inválida',
    details?: Record<string, unknown>
  ): Response {
    return this.error(res, message, 400, details);
  }

  static unauthorized(
    res: Response,
    message: string = 'No autorizado'
  ): Response {
    return this.error(res, message, 401);
  }

  static forbidden(
    res: Response,
    message: string = 'Acceso prohibido'
  ): Response {
    return this.error(res, message, 403);
  }

  static notFound(
    res: Response,
    message: string = 'Recurso no encontrado'
  ): Response {
    return this.error(res, message, 404);
  }

  static conflict(
    res: Response,
    message: string,
    details?: Record<string, unknown>
  ): Response {
    return this.error(res, message, 409, details);
  }

  static internalServerError(
    res: Response,
    message: string = 'Error interno del servidor',
    includeStack: boolean = false
  ): Response {
    const details = includeStack && res.app?.get('env') === 'development'
      ? { stack: new Error().stack }
      : undefined;
    return this.error(res, message, 500, details);
  }

  private static getErrorType(statusCode: number): string {
    const errorTypes: Record<number, string> = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      409: 'Conflict',
      422: 'Unprocessable Entity',
      500: 'Internal Server Error',
      502: 'Bad Gateway',
      503: 'Service Unavailable'
    };
    return errorTypes[statusCode] || 'Unknown Error';
  }

  static noContent(res: Response): Response {
    return res.status(204).send();
  }

  static accepted(res: Response, message: string = 'Solicitud aceptada'): Response {
    return this.success(res, null, message, 202);
  }
}