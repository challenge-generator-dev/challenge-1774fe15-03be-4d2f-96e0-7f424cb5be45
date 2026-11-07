import { ProductService } from '../src/services/product.service';
import { ProductRepository } from '../src/repositories/product.repository';
import { ProductCreateDto, ProductUpdateDto, ProductResponseDto } from '../src/models/product.model';
import { NotFoundException } from '../src/exceptions/not-found.exception';
import { ConflictException } from '../src/exceptions/conflict.exception';
import { ValidationException } from '../src/exceptions/validation.exception';

describe('ProductService', () => {
  let service: ProductService;
  let mockRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    mockRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      generateId: jest.fn(),
    } as unknown as jest.Mocked<ProductRepository>;

    service = new ProductService(mockRepository);
  });

  const mockProduct: ProductResponseDto = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    stock: 10,
  };

  describe('createProduct', () => {
    it('debe crear un producto con datos válidos', async () => {
      const createDto: ProductCreateDto = { name: 'Test', description: 'Desc', price: 50, stock: 5 };
      mockRepository.create.mockResolvedValue({ id: '1', ...createDto });

      const result = await service.createProduct(createDto);

      expect(result.name).toBe(createDto.name);
      expect(result.price).toBe(createDto.price);
      expect(mockRepository.create).toHaveBeenCalled();
    });

    it('debe lanzar ValidationException para precio negativo', async () => {
      const createDto: ProductCreateDto = { name: 'Test', description: 'Desc', price: -10, stock: 5 };

      await expect(service.createProduct(createDto)).rejects.toThrow(ValidationException);
    });

    it('debe lanzar ValidationException para stock negativo', async () => {
      const createDto: ProductCreateDto = { name: 'Test', description: 'Desc', price: 50, stock: -5 };

      await expect(service.createProduct(createDto)).rejects.toThrow(ValidationException);
    });

    it('debe lanzar ValidationException para nombre vacío', async () => {
      const createDto: ProductCreateDto = { name: '', description: 'Desc', price: 50, stock: 5 };

      await expect(service.createProduct(createDto)).rejects.toThrow(ValidationException);
    });

    it('debe lanzar ConflictException para nombre duplicado', async () => {
      const createDto: ProductCreateDto = { name: 'Existing', description: 'Desc', price: 50, stock: 5 };
      mockRepository.findAll.mockResolvedValue([{ ...mockProduct, name: 'Existing' }]);

      await expect(service.createProduct(createDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('getAllProducts', () => {
    it('debe retornar todos los productos', async () => {
      const products: ProductResponseDto[] = [mockProduct];
      mockRepository.findAll.mockResolvedValue(products);

      const result = await service.getAllProducts();

      expect(result).toEqual(products);
      expect(mockRepository.findAll).toHaveBeenCalled();
    });

    it('debe retornar array vacío si no hay productos', async () => {
      mockRepository.findAll.mockResolvedValue([]);

      const result = await service.getAllProducts();

      expect(result).toEqual([]);
    });
  });

  describe('getProductById', () => {
    it('debe retornar un producto por ID', async () => {
      mockRepository.findById.mockResolvedValue(mockProduct);

      const result = await service.getProductById('1');

      expect(result).toEqual(mockProduct);
      expect(mockRepository.findById).toHaveBeenCalledWith('1');
    });

    it('debe lanzar NotFoundException cuando no existe', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.getProductById('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateProduct', () => {
    it('debe actualizar un producto existente', async () => {
      const updateDto: ProductUpdateDto = { name: 'Updated', price: 200 };
      const updated = { ...mockProduct, ...updateDto };
      mockRepository.findById.mockResolvedValue(mockProduct);
      mockRepository.update.mockResolvedValue(updated);

      const result = await service.updateProduct('1', updateDto);

      expect(result.name).toBe('Updated');
      expect(result.price).toBe(200);
    });

    it('debe lanzar NotFoundException para producto inexistente', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.updateProduct('999', { name: 'Test' })).rejects.toThrow(NotFoundException);
    });

    it('debe lanzar ValidationException para precio negativo en actualización', async () => {
      mockRepository.findById.mockResolvedValue(mockProduct);

      await expect(service.updateProduct('1', { price: -50 })).rejects.toThrow(ValidationException);
    });
  });

  describe('deleteProduct', () => {
    it('debe eliminar un producto existente', async () => {
      mockRepository.findById.mockResolvedValue(mockProduct);
      mockRepository.delete.mockResolvedValue();

      await service.deleteProduct('1');

      expect(mockRepository.delete).toHaveBeenCalledWith('1');
    });

    it('debe lanzar NotFoundException para producto inexistente', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.deleteProduct('999')).rejects.toThrow(NotFoundException);
    });
  });
});