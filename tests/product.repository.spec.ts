import { ProductRepository } from '../src/repositories/product.repository';
import { Product } from '../src/models/product.model';

describe('ProductRepository', () => {
  let repository: ProductRepository;

  beforeEach(() => {
    repository = new ProductRepository();
  });

  const sampleProduct: Omit<Product, 'id'> = {
    name: 'Sample Product',
    description: 'Sample Description',
    price: 100,
    stock: 10,
  };

  describe('create', () => {
    it('debe crear un producto y retornarlo con ID', async () => {
      const result = await repository.create(sampleProduct);

      expect(result.id).toBeDefined();
      expect(result.name).toBe(sampleProduct.name);
      expect(result.price).toBe(sampleProduct.price);
      expect(result.stock).toBe(sampleProduct.stock);
    });

    it('debe generar IDs únicos para cada producto', async () => {
      const product1 = await repository.create(sampleProduct);
      const product2 = await repository.create({ ...sampleProduct, name: 'Different' });

      expect(product1.id).not.toBe(product2.id);
    });
  });

  describe('findAll', () => {
    it('debe retornar array vacío inicialmente', async () => {
      const result = await repository.findAll();

      expect(result).toEqual([]);
    });

    it('debe retornar todos los productos creados', async () => {
      await repository.create(sampleProduct);
      await repository.create({ ...sampleProduct, name: 'Product 2' });

      const result = await repository.findAll();

      expect(result).toHaveLength(2);
    });
  });

  describe('findById', () => {
    it('debe retornar null para ID inexistente', async () => {
      const result = await repository.findById('inexistent-id');

      expect(result).toBeNull();
    });

    it('debe retornar el producto correcto por ID', async () => {
      const created = await repository.create(sampleProduct);

      const result = await repository.findById(created.id);

      expect(result).not.toBeNull();
      expect(result?.name).toBe(sampleProduct.name);
    });
  });

  describe('update', () => {
    it('debe actualizar los campos del producto', async () => {
      const created = await repository.create(sampleProduct);

      const updated = await repository.update(created.id, { name: 'Updated Name', price: 200 });

      expect(updated.name).toBe('Updated Name');
      expect(updated.price).toBe(200);
      expect(updated.id).toBe(created.id);
    });

    it('debe mantener campos no actualizados', async () => {
      const created = await repository.create(sampleProduct);

      const updated = await repository.update(created.id, { name: 'New Name' });

      expect(updated.description).toBe(sampleProduct.description);
      expect(updated.stock).toBe(sampleProduct.stock);
    });

    it('debe retornar null para ID inexistente', async () => {
      const result = await repository.update('inexistent-id', { name: 'Test' });

      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('debe eliminar un producto existente', async () => {
      const created = await repository.create(sampleProduct);

      await repository.delete(created.id);

      const result = await repository.findById(created.id);
      expect(result).toBeNull();
    });

    it('no debe afectar otros productos al eliminar', async () => {
      const product1 = await repository.create(sampleProduct);
      const product2 = await repository.create({ ...sampleProduct, name: 'Product 2' });

      await repository.delete(product1.id);

      const remaining = await repository.findAll();
      expect(remaining).toHaveLength(1);
      expect(remaining[0].id).toBe(product2.id);
    });
  });

  describe('generateId', () => {
    it('debe generar IDs con formato válido', async () => {
      const id = (repository as any).generateId();

      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(0);
    });

    it('debe generar IDs únicos', async () => {
      const ids = new Set<string>();
      for (let i = 0; i < 100; i++) {
        ids.add((repository as any).generateId());
      }

      expect(ids.size).toBe(100);
    });
  });
});