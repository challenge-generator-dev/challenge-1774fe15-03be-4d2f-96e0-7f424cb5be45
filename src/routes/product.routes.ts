import { Router, Request, Response, NextFunction } from 'express';
import { ProductController } from '../controllers/product.controller';
import { ProductValidator } from '../validators/product.validator';
import { ProductRepository } from '../repositories/product.repository';
import { ProductCreateDto, ProductUpdateDto } from '../models/product.model';
import { ValidationException } from '../exceptions/validation.exception';

const router = Router();
const productRepository = new ProductRepository();
const productValidator = new ProductValidator(productRepository);
const productController = new ProductController();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = req.body as ProductCreateDto;
    const validation = await productValidator.validateCreate(dto);
    
    if (!validation.isValid) {
      throw new ValidationException(
        validation.errors.map(e => ({ field: e.field, message: e.message })),
        'body'
      );
    }
    
    await productController.createProduct(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await productController.getAllProducts(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idValidation = productValidator.validateId(req.params.id);
    if (!idValidation.isValid) {
      throw new ValidationException(
        [{ field: 'id', message: idValidation.errors[0].message }],
        'params'
      );
    }
    
    await productController.getProductById(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idValidation = productValidator.validateId(req.params.id);
    if (!idValidation.isValid) {
      throw new ValidationException(
        [{ field: 'id', message: idValidation.errors[0].message }],
        'params'
      );
    }
    
    const dto = req.body as ProductUpdateDto;
    const validation = await productValidator.validateUpdate(req.params.id, dto);
    
    if (!validation.isValid) {
      throw new ValidationException(
        validation.errors.map(e => ({ field: e.field, message: e.message })),
        'body'
      );
    }
    
    await productController.updateProduct(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idValidation = productValidator.validateId(req.params.id);
    if (!idValidation.isValid) {
      throw new ValidationException(
        [{ field: 'id', message: idValidation.errors[0].message }],
        'params'
      );
    }
    
    await productController.deleteProduct(req, res, next);
  } catch (error) {
    next(error);
  }
});

export default router;
export { router as productRouter };