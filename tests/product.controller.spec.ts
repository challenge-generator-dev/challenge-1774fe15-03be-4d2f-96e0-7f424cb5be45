import { Request, Response, NextFunction } from 'express';
import { ProductController } from '../src/controllers/product.controller';
import { ProductService } from '../src/services/product.service';
import { ProductResponseDto } from '../src/models/product.model';
import { NotFoundException } from '../src/exceptions/not-found.exception';
import { ConflictException } from '../src/exceptions/conflict.exception';
import { ValidationException } from '../src/exceptions/validation.exception';

describe('ProductController', () => {
  let controller: ProductController;
  let mockService: jest.Mocked<ProductService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    mockService = {
      createProduct: jest.fn(),
      getAllProducts: jest.fn(),
      getProductById: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
    } as unknown as jest.Mocked<ProductService>;

    controller = new ProductController(mockService);

    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    mockResponse = {
      status: statusMock,
      json: jsonMock,
    };

    mockNext = jest.fn();
  });

  describe('createProduct', () => {
    it('debe crear un producto exitosamente', async () => {
      const productDto = { name: 'Test Product', description: 'Description', price: 100, stock: 10 };
      const createdProduct: ProductResponseDto = { id: '1', ...productDto };
      mockService.createProduct.mockResolvedValue(createdProduct);
      mockRequest = { body: productDto };

      await controller.createProduct(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockService.createProduct).toHaveBeenCalledWith(productDto);
      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(createdProduct);
    });

    it('debe manejar ValidationException', async () => {
      const error = new ValidationException('Invalid data');
      mockService.createProduct.mockRejectedValue(error);
      mockRequest = { body: { name: '', price: -10 } };

      await controller.createProduct(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });

    it('debe manejar ConflictException para productos duplicados', async () => {
      const error = new ConflictException('Product already exists');
      mockService.createProduct.mockRejectedValue(error);
      mockRequest = { body: { name: 'Existing', price: 50, stock: 5 } };

      await controller.createProduct(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('getAllProducts', () => {
    it('debe retornar todos los productos', async () => {
      const products: ProductResponseDto[] = [
        { id: '1', name: 'Product 1', description: 'Desc 1', price: 100, stock: 10 },
        { id: '2', name: 'Product 2', description: 'Desc 2', price: 200, stock: 20 },
      ];
      mockService.getAllProducts.mockResolvedValue(products);

      await controller.getAllProducts(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockService.getAllProducts).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(products);
    });
  });

  describe('getProductById', () => {
    it('debe retornar un producto por ID', async () => {
      const product: ProductResponseDto = { id: '1', name: 'Product', description: 'Desc', price: 100, stock: 10 };
      mockService.getProductById.mockResolvedValue(product);
      mockRequest = { params: { id: '1' } };

      await controller.getProductById(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockService.getProductById).toHaveBeenCalledWith('1');
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(product);
    });

    it('debe manejar NotFoundException cuando el producto no existe', async () => {
      const error = new NotFoundException('Product not found');
      mockService.getProductById.mockRejectedValue(error);
      mockRequest = { params: { id: '999' } };

      await controller.getProductById(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });

  describe('updateProduct', () => {
    it('debe actualizar un producto exitosamente', async () => {
      const updateDto = { name: 'Updated Product', price: 150 };
      const updatedProduct: ProductResponseDto = { id: '1', ...updateDto, description: 'Desc', stock: 10 };
      mockService.updateProduct.mockResolvedValue(updatedProduct);
      mockRequest = { params: { id: '1' }, body: updateDto };

      await controller.updateProduct(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockService.updateProduct).toHaveBeenCalledWith('1', updateDto);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(updatedProduct);
    });
  });

  describe('deleteProduct', () => {
    it('debe eliminar un producto exitosamente', async () => {
      mockService.deleteProduct.mockResolvedValue();
      mockRequest = { params: { id: '1' } };

      await controller.deleteProduct(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockService.deleteProduct).toHaveBeenCalledWith('1');
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ success: true });
    });
  });
});