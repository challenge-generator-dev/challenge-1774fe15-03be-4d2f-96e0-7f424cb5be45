import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';
import { ProductRepository } from '../repositories/product.repository';
import { ProductCreateDto, ProductUpdateDto } from '../models/product.model';
import { ResponseUtil } from '../utils/response.util';
import { NotFoundException } from '../exceptions/not-found.exception';
import { ConflictException } from '../exceptions/conflict.exception';
import { ValidationException } from '../exceptions/validation.exception';

class ProductController {
  private readonly productService: ProductService;

  constructor() {
    const repository = new ProductRepository();
    this.productService = new ProductService(repository);
  }

  async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto: ProductCreateDto = req.body;
      const product = await this.productService.createProduct(dto);
      
      ResponseUtil.created(res, product, 'Producto creado exitosamente');
    } catch (error) {
      if (error instanceof ConflictException) {
        ResponseUtil.conflict(res, error.message);
        return;
      }
      if (error instanceof ValidationException) {
        ResponseUtil.badRequest(res, error.getFormattedErrorMessage(), error.errors);
        return;
      }
      next(error);
    }
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await this.productService.getAllProducts();
      
      if (!products || products.length === 0) {
        ResponseUtil.success(res, [], 'No hay productos disponibles');
        return;
      }
      
      ResponseUtil.success(res, products);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id);
      
      ResponseUtil.success(res, product);
    } catch (error) {
      if (error instanceof NotFoundException) {
        ResponseUtil.notFound(res, error.message);
        return;
      }
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const dto: ProductUpdateDto = req.body;
      const product = await this.productService.updateProduct(id, dto);
      
      ResponseUtil.success(res, product, 'Producto actualizado exitosamente');
    } catch (error) {
      if (error instanceof NotFoundException) {
        ResponseUtil.notFound(res, error.message);
        return;
      }
      if (error instanceof ConflictException) {
        ResponseUtil.conflict(res, error.message);
        return;
      }
      if (error instanceof ValidationException) {
        ResponseUtil.badRequest(res, error.getFormattedErrorMessage(), error.errors);
        return;
      }
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.productService.deleteProduct(id);
      
      ResponseUtil.deleted(res, 'Producto eliminado exitosamente');
    } catch (error) {
      if (error instanceof NotFoundException) {
        ResponseUtil.notFound(res, error.message);
        return;
      }
      next(error);
    }
  }
}

export { ProductController };