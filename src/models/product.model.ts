import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class ProductCreateDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @Min(0, { message: 'El precio no puede ser negativo' })
    price: number;

    @IsNumber({}, { message: 'El stock debe ser un número' })
    @Min(0, { message: 'El stock no puede ser negativo' })
    stock: number;
}

export class ProductUpdateDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber({}, { message: 'El precio debe ser un número' })
    @Min(0, { message: 'El precio no puede ser negativo' })
    @IsOptional()
    price?: number;

    @IsNumber({}, { message: 'El stock debe ser un número' })
    @Min(0, { message: 'El stock no puede ser negativo' })
    @IsOptional()
    stock?: number;
}

export class ProductResponseDto {
    id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;

    constructor(id: string, name: string, price: number, stock: number, description?: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
    }
}

export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
}