import { HttpException } from './http.exception';

export class ConflictException extends HttpException {
  private readonly resourceType: string;
  private readonly conflictingValue: string;
  private readonly resourceId?: string;

  constructor(
    message: string,
    resourceType: string,
    conflictingValue: string,
    resourceId?: string
  ) {
    super(message, 409);
    this.resourceType = resourceType;
    this.conflictingValue = conflictingValue;
    this.resourceId = resourceId;
    this.name = 'ConflictException';
    Error.captureStackTrace(this, this.constructor);
  }

  getResourceType(): string {
    return this.resourceType;
  }

  getConflictingValue(): string {
    return this.conflictingValue;
  }

  getResourceId(): string | undefined {
    return this.resourceId;
  }

  toJSON(): object {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.getStatus(),
      error: 'Conflict',
      details: {
        resourceType: this.resourceType,
        conflictingValue: this.conflictingValue,
        resourceId: this.resourceId,
        timestamp: new Date().toISOString(),
        suggestion: this.getSuggestion()
      }
    };
  }

  private getSuggestion(): string {
    return `El ${this.resourceType} '${this.conflictingValue}' ya existe. ` +
      (this.resourceId ? `ID existente: ${this.resourceId}. ` : '') +
      'Por favor utiliza un valor diferente o actualiza el recurso existente.';
  }

  static forDuplicateName(resourceName: string, existingId?: string): ConflictException {
    return new ConflictException(
      `Ya existe un producto con el nombre '${resourceName}'`,
      'Product',
      resourceName,
      existingId
    );
  }

  static forDuplicateResource(resourceType: string, identifier: string, existingId?: string): ConflictException {
    return new ConflictException(
      `Ya existe un ${resourceType} con el identificador '${identifier}'`,
      resourceType,
      identifier,
      existingId
    );
  }
}