import { HttpException } from './http.exception';

export interface NotFoundDetails {
  resource: string;
  identifier?: string;
  identifierType?: 'id' | 'uuid' | 'slug' | 'email' | 'custom';
  suggestion?: string;
  availableResources?: string[];
}

export class NotFoundException extends HttpException {
  public readonly resource: string;
  public readonly identifier?: string;
  public readonly identifierType?: string;
  public readonly suggestion?: string;
  public readonly availableResources?: string[];

  constructor(
    resource: string,
    identifier?: string,
    identifierType: 'id' | 'uuid' | 'slug' | 'email' | 'custom' = 'id',
    message?: string,
    suggestion?: string,
    availableResources?: string[]
  ) {
    const defaultMessage = message || `${resource} not found${identifier ? ` with identifier: ${identifier}` : ''}`;
    super(defaultMessage, 404, true);
    
    this.resource = resource;
    this.identifier = identifier;
    this.identifierType = identifierType;
    this.suggestion = suggestion;
    this.availableResources = availableResources;
    this.name = 'NotFoundException';
  }

  public static forProduct(id: string): NotFoundException {
    return new NotFoundException(
      'Product',
      id,
      'id',
      `Product with id "${id}" does not exist`,
      'Verify the product ID and try again'
    );
  }

  public static forResourceBySlug(resource: string, slug: string): NotFoundException {
    return new NotFoundException(
      resource,
      slug,
      'slug',
      `${resource} with slug "${slug}" not found`,
      'Check the slug and try again'
    );
  }

  public static forResourceByEmail(resource: string, email: string): NotFoundException {
    return new NotFoundException(
      resource,
      email,
      'email',
      `${resource} with email "${email}" not found`,
      'Verify the email address and try again'
    );
  }

  public static withSuggestion(
    resource: string,
    identifier: string,
    suggestion: string
  ): NotFoundException {
    return new NotFoundException(
      resource,
      identifier,
      'custom',
      undefined,
      suggestion
    );
  }

  public static withAvailableOptions(
    resource: string,
    identifier: string,
    availableOptions: string[]
  ): NotFoundException {
    const suggestion = availableOptions.length > 0 
      ? `Available ${resource.toLowerCase()}s: ${availableOptions.slice(0, 5).join(', ')}${availableOptions.length > 5 ? '...' : ''}`
      : undefined;

    return new NotFoundException(
      resource,
      identifier,
      'id',
      undefined,
      suggestion,
      availableOptions
    );
  }

  public getDetails(): NotFoundDetails {
    return {
      resource: this.resource,
      identifier: this.identifier,
      identifierType: this.identifierType as 'id' | 'uuid' | 'slug' | 'email' | 'custom',
      suggestion: this.suggestion,
      availableResources: this.availableResources
    };
  }

  public hasSuggestions(): boolean {
    return !!this.suggestion || (this.availableResources && this.availableResources.length > 0);
  }

  public toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      resource: this.resource,
      identifier: this.identifier,
      identifierType: this.identifierType,
      suggestion: this.suggestion,
      availableResources: this.availableResources
    };
  }
}