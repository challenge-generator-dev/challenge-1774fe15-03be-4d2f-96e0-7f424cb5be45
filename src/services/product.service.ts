import { Product } from '../models/product.model';
import { ProductRepository } from '../repositories/product.repository';
import { ProductResponseDto } from '../models/product.model';
import { ProductCreateDto } from '../models/product.model';
import { ProductUpdateDto } from '../models/product.model';
import { NotFoundException } from '../exceptions/not-found.exception';
import { ConflictException } from '../exceptions/conflict.exception';

export class ProductService {
  private readonly repository: ProductRepository;
  private readonly existingProductNames: Set<string>;

  constructor(repository: ProductRepository) {
    if (!repository) {
      throw new Error('ProductRepository es requerido');
    }
    this.repository = repository;
    this.existingProductNames = new Set<string>();
  }

  async createProduct(dto: ProductCreateDto): Promise<ProductResponseDto> {
    const normalizedName = dto.name.trim().toLowerCase();
    
    if (this.existingProductNames.has(normalizedName)) {
      throw new ConflictException(
        `Ya existe un producto con el nombre "${dto.name}"`
      );
    }

    if (dto.price < 0) {
      throw new ConflictException('El precio no puede ser negativo');
    }

    if (dto.stock < 0) {
      throw new ConflictException('El stock no puede ser negativo');
    }

    const productData: Omit<Product, 'id'> = {
      name: dto.name.trim(),
      description: dto.description?.trim() || '',
      price: Math.round(dto.price * 100) / 100,
      stock: Math.floor(dto.stock),
    };

    const createdProduct = await this.repository.create(productData);
    this.existingProductNames.add(createdProduct.name.toLowerCase());
    
    return this.toResponseDto(createdProduct);
  }

  async getAllProducts(): Promise<ProductResponseDto[]> {
    const products = await this.repository.findAll();
    return products.map(product => this.toResponseDto(product));
  }

  async getProductById(id: string): Promise<ProductResponseDto> {
    if (!id || id.trim().length === 0) {
      throw new NotFoundException('El ID del producto es requerido');
    }

    const product = await this.repository.findById(id);
    
    if (!product) {
      throw new NotFoundException(`Producto con ID "${id}" no encontrado`);
    }

    return this.toResponseDto(product);
  }

  async updateProduct(id: string, dto: ProductUpdateDto): Promise<ProductResponseDto> {
    const existingProduct = await this.repository.findById(id);
    
    if (!existingProduct) {
      throw new NotFoundException(`Producto con ID "${id}" no encontrado`);
    }

    if (dto.name !== undefined) {
      const normalizedName = dto.name.trim().toLowerCase();
      const otherProductWithName = await this.repository.findAll().then(
        products => products.find(p => 
          p.name.toLowerCase() === normalizedName && p.id !== id
        )
      );
      
      if (otherProductWithName) {
        throw new ConflictException(
          `Ya existe otro producto con el nombre "${dto.name}"`
        );
      }
    }

    if (dto.price !== undefined && dto.price < 0) {
      throw new ConflictException('El precio no puede ser negativo');
    }

    if (dto.stock !== undefined && dto.stock < 0) {
      throw new ConflictException('El stock no puede ser negativo');
    }

    const updateData: Partial<Omit<Product, 'id'>> = {};
    
    if (dto.name !== undefined) {
      updateData.name = dto.name.trim();
    }
    if (dto.description !== undefined) {
      updateData.description = dto.description.trim();
    }
    if (dto.price !== undefined) {
      updateData.price = Math.round(dto.price * 100) / 100;
    }
    if (dto.stock !== undefined) {
      updateData.stock = Math.floor(dto.stock);
    }

    const updatedProduct = await this.repository.update(id, updateData);
    return this.toResponseDto(updatedProduct);
  }

  async deleteProduct(id: string): Promise<{ success: boolean }> {
    const existingProduct = await this.repository.findById(id);
    
    if (!existingProduct) {
      throw new NotFoundException(`Producto con ID "${id}" no encontrado`);
    }

    await this.repository.delete(id);
    this.existingProductNames.delete(existingProduct.name.toLowerCase());
    
    return { success: true };
  }

  private toResponseDto(product: Product): ProductResponseDto {
    return new ProductResponseDto(
      product.id,
      product.name,
      product.price,
      product.stock,
      product.description
    );
  }

  async initializeNamesCache(): Promise<void> {
    const products = await this.repository.findAll();
    products.forEach(product => {
      this.existingProductNames.add(product.name.toLowerCase());
    });
  }
}