export class HttpException extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly timestamp: string;
  public readonly path?: string;

  constructor(
    message: string,
    statusCode: number,
    isOperational: boolean = true,
    path?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();
    this.path = path;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  public toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp,
      path: this.path,
      isOperational: this.isOperational
    };
  }

  public getHttpStatusText(): string {
    const statusTexts: Record<number, string> = {
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
    return statusTexts[this.statusCode] || 'Unknown Status';
  }

  public static isHttpException(error: unknown): error is HttpException {
    return error instanceof HttpException;
  }

  public static getStatusCodeRange(category: 'client' | 'server'): [number, number] {
    if (category === 'client') {
      return [400, 499];
    }
    return [500, 599];
  }

  public isClientError(): boolean {
    return this.statusCode >= 400 && this.statusCode < 500;
  }

  public isServerError(): boolean {
    return this.statusCode >= 500 && this.statusCode < 600;
  }

  public getErrorResponse(): { success: boolean; error: Record<string, unknown> } {
    return {
      success: false,
      error: this.toJSON()
    };
  }
}