import { HttpException } from './http.exception';

export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
  constraints?: Record<string, string>;
}

export class ValidationException extends HttpException {
  public readonly errors: ValidationError[];
  public readonly validationType: 'body' | 'query' | 'params' | 'custom';

  constructor(
    message: string = 'Validation failed',
    errors: ValidationError[] = [],
    validationType: 'body' | 'query' | 'params' | 'custom' = 'body',
    statusCode: number = 422
  ) {
    super(message, statusCode, true);
    this.errors = errors;
    this.validationType = validationType;
    this.name = 'ValidationException';
  }

  public static fromClassValidator(errors: Record<string, string[]>): ValidationException {
    const validationErrors: ValidationError[] = [];
    
    for (const [field, messages] of Object.entries(errors)) {
      validationErrors.push({
        field,
        message: messages.join(', '),
        constraints: messages.reduce((acc, msg, idx) => {
          acc[`constraint${idx + 1}`] = msg;
          return acc;
        }, {} as Record<string, string>)
      });
    }

    return new ValidationException(
      'Invalid request data',
      validationErrors,
      'body',
      422
    );
  }

  public static fromArray(fieldErrors: Array<{ field: string; message: string; value?: unknown }>): ValidationException {
    const validationErrors: ValidationError[] = fieldErrors.map(err => ({
      field: err.field,
      message: err.message,
      value: err.value
    }));

    return new ValidationException(
      'Validation errors detected',
      validationErrors,
      'custom',
      422
    );
  }

  public getErrorsByField(field: string): ValidationError[] {
    return this.errors.filter(error => error.field === field);
  }

  public hasFieldError(field: string): boolean {
    return this.errors.some(error => error.field === field);
  }

  public getFirstErrorForField(field: string): ValidationError | undefined {
    return this.errors.find(error => error.field === field);
  }

  public getAllFields(): string[] {
    return [...new Set(this.errors.map(error => error.field))];
  }

  public toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      errors: this.errors,
      validationType: this.validationType
    };
  }

  public getDetailedErrors(): { field: string; messages: string[] }[] {
    return this.errors.map(error => ({
      field: error.field,
      messages: error.constraints 
        ? Object.values(error.constraints) 
        : [error.message]
    }));
  }

  public getFormattedErrorMessage(): string {
    return this.errors
      .map(error => `${error.field}: ${error.message}`)
      .join('; ');
  }
}