import { Product } from '../models/product.model';
import { NotFoundException } from '../exceptions/not-found.exception';
import { ConflictException } from '../exceptions/conflict.exception';

// Simulación de base de datos en memoria para el ejercicio
const productsDB: Product[] = [];

export class ProductRepository {
    async create(productData: Omit<Product, 'id'>): Promise<Product> {
        const existingProduct = productsDB.find(p => p.name === productData.name);
        if (existingProduct) {
            throw new ConflictException('Ya existe un producto con este nombre');
        }
        
        const newProduct: Product = {
            id: this.generateId(),
            ...productData
        };
        productsDB.push(newProduct);
        return newProduct;
    }
    
    async findAll(): Promise<Product[]> {
        return [...productsDB];
    }
    
    async findById(id: string): Promise<Product> {
        const product = productsDB.find(p => p.id === id);
        if (!product) {
            throw new NotFoundException('Producto no encontrado');
        }
        return product;
    }
    
    async update(id: string, updateData: Partial<Omit<Product, 'id'>>): Promise<Product> {
        const productIndex = productsDB.findIndex(p => p.id === id);
        if (productIndex === -1) {
            throw new NotFoundException('Producto no encontrado');
        }
        
        if (updateData.name) {
            const existingProduct = productsDB.find(p => p.name === updateData.name && p.id !== id);
            if (existingProduct) {
                throw new ConflictException('Ya existe otro producto con este nombre');
            }
        }
        
        const updatedProduct = { ...productsDB[productIndex], ...updateData };
        productsDB[productIndex] = updatedProduct;
        return updatedProduct;
    }
    
    async delete(id: string): Promise<void> {
        const productIndex = productsDB.findIndex(p => p.id === id);
        if (productIndex === -1) {
            throw new NotFoundException('Producto no encontrado');
        }
        productsDB.splice(productIndex, 1);
    }
    
    private generateId(): string {
        return Math.random().toString(36).substring(2, 9);
    }
}