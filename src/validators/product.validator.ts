import { ProductCreateDto } from '../models/product.model';
import { ProductUpdateDto } from '../models/product.model';
import { ProductRepository } from '../repositories/product.repository';
import { ValidationException } from '../exceptions/validation.exception';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class ProductValidator {
  private readonly repository: ProductRepository;

  constructor(repository: ProductRepository) {
    if (!repository) {
      throw new Error('ProductRepository es requerido para ProductValidator');
    }
    this.repository = repository;
  }

  async validateCreate(dto: ProductCreateDto): Promise<ValidationResult> {
    const errors: string[] = [];

    if (!dto.name || dto.name.trim().length === 0) {
      errors.push('El nombre del producto es requerido');
    } else if (dto.name.trim().length < 3) {
      errors.push('El nombre del producto debe tener al menos 3 caracteres');
    } else if (dto.name.trim().length > 100) {
      errors.push('El nombre del producto no puede exceder 100 caracteres');
    }

    if (dto.description && dto.description.length > 500) {
      errors.push('La descripción no puede exceder 500 caracteres');
    }

    if (dto.price === undefined || dto.price === null) {
      errors.push('El precio es requerido');
    } else if (typeof dto.price !== 'number') {
      errors.push('El precio debe ser un número');
    } else if (dto.price < 0) {
      errors.push('El precio no puede ser negativo');
    } else if (dto.price > 999999.99) {
      errors.push('El precio excede el límite permitido');
    } else if (!this.isValidPrice(dto.price)) {
      errors.push('El precio puede tener máximo 2 decimales');
    }

    if (dto.stock === undefined || dto.stock === null) {
      errors.push('El stock es requerido');
    } else if (typeof dto.stock !== 'number') {
      errors.push('El stock debe ser un número');
    } else if (!Number.isInteger(dto.stock)) {
      errors.push('El stock debe ser un número entero');
    } else if (dto.stock < 0) {
      errors.push('El stock no puede ser negativo');
    } else if (dto.stock > 999999) {
      errors.push('El stock excede el límite permitido');
    }

    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    const duplicateCheck = await this.checkDuplicateName(dto.name, undefined);
    if (duplicateCheck.hasDuplicate) {
      errors.push(duplicateCheck.message || 'Ya existe un producto con este nombre');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  async validateUpdate(id: string, dto: ProductUpdateDto): Promise<ValidationResult> {
    const errors: string[] = [];

    if (!id || id.trim().length === 0) {
      errors.push('El ID del producto es requerido');
    }

    const existingProduct = await this.repository.findById(id);
    if (!existingProduct) {
      errors.push('El producto no existe');
    }

    if (dto.name !== undefined) {
      if (dto.name.trim().length === 0) {
        errors.push('El nombre no puede estar vacío');
      } else if (dto.name.trim().length < 3) {
        errors.push('El nombre debe tener al menos 3 caracteres');
      } else if (dto.name.trim().length > 100) {
        errors.push('El nombre no puede exceder 100 caracteres');
      } else {
        const duplicateCheck = await this.checkDuplicateName(dto.name, id);
        if (duplicateCheck.hasDuplicate) {
          errors.push(duplicateCheck.message || 'Ya existe otro producto con este nombre');
        }
      }
    }

    if (dto.description !== undefined && dto.description.length > 500) {
      errors.push('La descripción no puede exceder 500 caracteres');
    }

    if (dto.price !== undefined) {
      if (typeof dto.price !== 'number') {
        errors.push('El precio debe ser un número');
      } else if (dto.price < 0) {
        errors.push('El precio no puede ser negativo');
      } else if (dto.price > 999999.99) {
        errors.push('El precio excede el límite permitido');
      } else if (!this.isValidPrice(dto.price)) {
        errors.push('El precio puede tener máximo 2 decimales');
      }
    }

    if (dto.stock !== undefined) {
      if (typeof dto.stock !== 'number') {
        errors.push('El stock debe ser un número');
      } else if (!Number.isInteger(dto.stock)) {
        errors.push('El stock debe ser un número entero');
      } else if (dto.stock < 0) {
        errors.push('El stock no puede ser negativo');
      } else if (dto.stock > 999999) {
        errors.push('El stock excede el límite permitido');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private async checkDuplicateName(
    name: string,
    excludeId?: string
  ): Promise<{ hasDuplicate: boolean; message?: string }> {
    const normalizedName = name.trim().toLowerCase();
    const allProducts = await this.repository.findAll();
    
    const duplicate = allProducts.find(product =>
      product.name.toLowerCase() === normalizedName &&
      product.id !== excludeId
    );

    if (duplicate) {
      return {
        hasDuplicate: true,
        message: `Ya existe un producto con el nombre "${name}"`,
      };
    }

    return { hasDuplicate: false };
  }

  private isValidPrice(price: number): boolean {
    const priceStr = price.toString();
    const decimalPart = priceStr.split('.')[1];
    if (!decimalPart) return true;
    return decimalPart.length <= 2;
  }

  validateId(id: string): ValidationResult {
    const errors: string[] = [];

    if (!id || id.trim().length === 0) {
      errors.push('El ID es requerido');
    } else if (!this.isValidUuid(id)) {
      errors.push('El formato del ID es inválido');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private isValidUuid(id: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }
}