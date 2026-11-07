# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **src/app.module.ts** — Sin el modulo raiz, Nest no tiene arbol de dependencias que resolver y el bootstrap falla.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/repositories/product.repository.ts` — `Product.find`: Se invoca `find` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/repositories/product.repository.ts` — `Product.push`: Se invoca `push` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/repositories/product.repository.ts` — `Product.findIndex`: Se invoca `findIndex` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/repositories/product.repository.ts` — `Product.splice`: Se invoca `splice` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/exceptions/validation.exception.ts` — `ValidationError.push`: Se invoca `push` sobre `ValidationError`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
Construir endpoints REST con validacion y manejo de errores (corrida e2e 20261106194239047), Expone endpoints REST con validacion de entrada y manejo centralizado de errores

### Misión / candidato
Exponer el catalogo de productos

### Reto
- Tema: Construccion de APIs REST con Express
- Seniority: advanced-l2
- Tipo: practical
- Título: Desarrollo de API REST para Catálogo de Productos
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Creación de Endpoints Básicos — objetivo: Implementar los endpoints mínimos para crear, leer, actualizar y eliminar productos. — entregable (NO resolver): Endpoints REST funcionales para CRUD de productos con validación básica y manejo de errores.
- Fase 2: Validación y Manejo de Errores Avanzados — objetivo: Mejorar la validación de entradas y manejar casos de borde del dominio. — entregable (NO resolver): Endpoints REST mejorados con validaciones avanzadas y manejo adecuado de errores de borde.
- Fase 3: Optimización y Refactorización — objetivo: Optimizar el rendimiento de la API y refactorizar el código para mejorar su mantenibilidad. — entregable (NO resolver): API REST optimizada y refactorizada con mejoras en rendimiento y mantenibilidad.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "product-catalog-api",
  "version": "1.0.0",
  "description": "API REST para catálogo de productos",
  "main": "src/main.ts",
  "scripts": {
    "build": "tsc",
    "start": "ts-node src/main.ts",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint . --ext .ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "4.21.0",
    "class-validator": "0.14.1",
    "reflect-metadata": "0.2.2",
    "dotenv": "16.4.5"
  },
  "devDependencies": {
    "@types/express": "4.17.21",
    "@types/node": "22.5.4",
    "typescript": "^5.7.3",
    "ts-node": "10.9.2",
    "jest": "29.7.0",
    "@types/jest": "29.5.14",
    "ts-jest": "29.2.5",
    "eslint": "8.57.0",
    "@typescript-eslint/parser": "7.18.0",
    "@typescript-eslint/eslint-plugin": "7.18.0"
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*", "tests/**/*"],
  "exclude": ["node_modules"]
}

// === ARCHIVO: src/main.ts ===
import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import { errorMiddleware } from './middlewares/error.middleware';
import productRoutes from './routes/product.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/products', productRoutes);
app.use(errorMiddleware);

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Manejo de cierre del servidor
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  server.close(() => process.exit(1));
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

// Exportar para testing
export default app;

// === ARCHIVO: src/models/product.model.ts ===
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

// === ARCHIVO: src/repositories/product.repository.ts ===
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

// === ARCHIVO: src/app.ts ===
import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes';
import { errorMiddleware } from './middlewares/error.middleware';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'Product Catalog API is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/products', productRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.path} not found`,
    data: null
  });
});

app.use(errorMiddleware);

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err);
  server.close(() => process.exit(1));
});

process.on('unhandledRejection', (err: unknown) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

export default app;

// === ARCHIVO: src/routes/product.routes.ts ===
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

// === ARCHIVO: src/controllers/product.controller.ts ===
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

// === ARCHIVO: src/services/product.service.ts ===
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

// === ARCHIVO: src/validators/product.validator.ts ===
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

// === ARCHIVO: src/middlewares/error.middleware.ts ===
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { HttpException } from '../exceptions/http.exception';
import { ValidationException } from '../exceptions/validation.exception';
import { NotFoundException } from '../exceptions/not-found.exception';
import { ConflictException } from '../exceptions/conflict.exception';

interface ErrorResponse {
  success: boolean;
  status: number;
  message: string;
  errors?: string[];
  timestamp: string;
  path?: string;
}

export const errorMiddleware: RequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`[ERROR] ${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.error(`[ERROR] Message: ${err.message}`);
  console.error(`[ERROR] Stack: ${err.stack}`);

  let statusCode: number = 500;
  let message: string = 'Error interno del servidor';
  let errors: string[] | undefined;

  if (err instanceof HttpException) {
    statusCode = err.statusCode;
    message = err.message;
    
    if (err instanceof ValidationException && err.errors) {
      errors = err.errors;
    }
  } else if (err instanceof NotFoundException) {
    statusCode = 404;
    message = err.message;
  } else if (err instanceof ConflictException) {
    statusCode = 409;
    message = err.message;
  } else if (err instanceof SyntaxError) {
    statusCode = 400;
    message = 'Error de sintaxis en la solicitud';
  } else if (err instanceof TypeError) {
    statusCode = 500;
    message = 'Error de tipo en la aplicación';
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Error de validación de datos';
  }

  const response: ErrorResponse = {
    success: false,
    status: statusCode,
    message,
    timestamp: new Date().toISOString(),
    path: req.path,
  };

  if (errors) {
    response.errors = errors;
  }

  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    response.message = 'Error interno del servidor';
    delete response.path;
  }

  res.status(statusCode).json(response);
};

export const notFoundMiddleware: RequestHandler = (
  req: Request,
  res: Response
): void => {
  const response: ErrorResponse = {
    success: false,
    status: 404,
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString(),
    path: req.path,
  };
  
  res.status(404).json(response);
};

export const requestLoggerMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 15);
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.path} ` +
      `${res.statusCode} - ${duration}ms - ID: ${requestId}`;
    
    if (res.statusCode >= 500) {
      console.error(logMessage);
    } else if (res.statusCode >= 400) {
      console.warn(logMessage);
    } else {
      console.log(logMessage);
    }
  });
  
  (req as any).requestId = requestId;
  (req as any).startTime = startTime;
  
  next();
};

export const corsMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : ['http://localhost:3000', 'http://localhost:4200'];
  
  const origin = req.headers.origin;
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Request-ID');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  
  next();
};

export const rateLimitMiddleware = (): RequestHandler => {
  const requestCounts = new Map<string, { count: number; resetTime: number }>();
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW || '60000', 10);
  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX || '100', 10);
  
  return (req: Request, res: Response, next: NextFunction): void => {
    const clientId = req.ip || 'unknown';
    const now = Date.now();
    
    let clientData = requestCounts.get(clientId);
    
    if (!clientData || now > clientData.resetTime) {
      clientData = {
        count: 1,
        resetTime: now + windowMs,
      };
      requestCounts.set(clientId, clientData);
      next();
      return;
    }
    
    clientData.count++;
    
    if (clientData.count > maxRequests) {
      const response: ErrorResponse = {
        success: false,
        status: 429,
        message: 'Demasiadas solicitudes, por favor intente más tarde',
        timestamp: new Date().toISOString(),
        path: req.path,
      };
      res.setHeader('Retry-After', Math.ceil((clientData.resetTime - now) / 1000).toString());
      res.status(429).json(response);
      return;
    }
    
    next();
  };
};

// === ARCHIVO: src/exceptions/http.exception.ts ===
export class HttpException extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly timestamp: string;
  public readonly path?: string;

  constructor(
    message: string,
    statusCode: number,
    isOperational: boolean = true,
    path?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();
    this.path = path;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  public toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp,
      path: this.path,
      isOperational: this.isOperational
    };
  }

  public getHttpStatusText(): string {
    const statusTexts: Record<number, string> = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      409: 'Conflict',
      422: 'Unprocessable Entity',
      500: 'Internal Server Error',
      502: 'Bad Gateway',
      503: 'Service Unavailable'
    };
    return statusTexts[this.statusCode] || 'Unknown Status';
  }

  public static isHttpException(error: unknown): error is HttpException {
    return error instanceof HttpException;
  }

  public static getStatusCodeRange(category: 'client' | 'server'): [number, number] {
    if (category === 'client') {
      return [400, 499];
    }
    return [500, 599];
  }

  public isClientError(): boolean {
    return this.statusCode >= 400 && this.statusCode < 500;
  }

  public isServerError(): boolean {
    return this.statusCode >= 500 && this.statusCode < 600;
  }

  public getErrorResponse(): { success: boolean; error: Record<string, unknown> } {
    return {
      success: false,
      error: this.toJSON()
    };
  }
}

// === ARCHIVO: src/exceptions/validation.exception.ts ===
import { HttpException } from './http.exception';

export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
  constraints?: Record<string, string>;
}

export class ValidationException extends HttpException {
  public readonly errors: ValidationError[];
  public readonly validationType: 'body' | 'query' | 'params' | 'custom';

  constructor(
    message: string = 'Validation failed',
    errors: ValidationError[] = [],
    validationType: 'body' | 'query' | 'params' | 'custom' = 'body',
    statusCode: number = 422
  ) {
    super(message, statusCode, true);
    this.errors = errors;
    this.validationType = validationType;
    this.name = 'ValidationException';
  }

  public static fromClassValidator(errors: Record<string, string[]>): ValidationException {
    const validationErrors: ValidationError[] = [];
    
    for (const [field, messages] of Object.entries(errors)) {
      validationErrors.push({
        field,
        message: messages.join(', '),
        constraints: messages.reduce((acc, msg, idx) => {
          acc[`constraint${idx + 1}`] = msg;
          return acc;
        }, {} as Record<string, string>)
      });
    }

    return new ValidationException(
      'Invalid request data',
      validationErrors,
      'body',
      422
    );
  }

  public static fromArray(fieldErrors: Array<{ field: string; message: string; value?: unknown }>): ValidationException {
    const validationErrors: ValidationError[] = fieldErrors.map(err => ({
      field: err.field,
      message: err.message,
      value: err.value
    }));

    return new ValidationException(
      'Validation errors detected',
      validationErrors,
      'custom',
      422
    );
  }

  public getErrorsByField(field: string): ValidationError[] {
    return this.errors.filter(error => error.field === field);
  }

  public hasFieldError(field: string): boolean {
    return this.errors.some(error => error.field === field);
  }

  public getFirstErrorForField(field: string): ValidationError | undefined {
    return this.errors.find(error => error.field === field);
  }

  public getAllFields(): string[] {
    return [...new Set(this.errors.map(error => error.field))];
  }

  public toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      errors: this.errors,
      validationType: this.validationType
    };
  }

  public getDetailedErrors(): { field: string; messages: string[] }[] {
    return this.errors.map(error => ({
      field: error.field,
      messages: error.constraints 
        ? Object.values(error.constraints) 
        : [error.message]
    }));
  }

  public getFormattedErrorMessage(): string {
    return this.errors
      .map(error => `${error.field}: ${error.message}`)
      .join('; ');
  }
}

// === ARCHIVO: src/exceptions/not-found.exception.ts ===
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

// === ARCHIVO: src/exceptions/conflict.exception.ts ===
import { HttpException } from './http.exception';

export class ConflictException extends HttpException {
  private readonly resourceType: string;
  private readonly conflictingValue: string;
  private readonly resourceId?: string;

  constructor(
    message: string,
    resourceType: string,
    conflictingValue: string,
    resourceId?: string
  ) {
    super(message, 409);
    this.resourceType = resourceType;
    this.conflictingValue = conflictingValue;
    this.resourceId = resourceId;
    this.name = 'ConflictException';
    Error.captureStackTrace(this, this.constructor);
  }

  getResourceType(): string {
    return this.resourceType;
  }

  getConflictingValue(): string {
    return this.conflictingValue;
  }

  getResourceId(): string | undefined {
    return this.resourceId;
  }

  toJSON(): object {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.getStatus(),
      error: 'Conflict',
      details: {
        resourceType: this.resourceType,
        conflictingValue: this.conflictingValue,
        resourceId: this.resourceId,
        timestamp: new Date().toISOString(),
        suggestion: this.getSuggestion()
      }
    };
  }

  private getSuggestion(): string {
    return `El ${this.resourceType} '${this.conflictingValue}' ya existe. ` +
      (this.resourceId ? `ID existente: ${this.resourceId}. ` : '') +
      'Por favor utiliza un valor diferente o actualiza el recurso existente.';
  }

  static forDuplicateName(resourceName: string, existingId?: string): ConflictException {
    return new ConflictException(
      `Ya existe un producto con el nombre '${resourceName}'`,
      'Product',
      resourceName,
      existingId
    );
  }

  static forDuplicateResource(resourceType: string, identifier: string, existingId?: string): ConflictException {
    return new ConflictException(
      `Ya existe un ${resourceType} con el identificador '${identifier}'`,
      resourceType,
      identifier,
      existingId
    );
  }
}

// === ARCHIVO: src/utils/response.util.ts ===
import { Response } from 'express';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  status: number;
  timestamp: string;
  metadata?: ResponseMetadata;
}

export interface ResponseMetadata {
  total?: number;
  page?: number;
  limit?: number;
  path?: string;
  method?: string;
}

export interface ErrorResponse {
  success: boolean;
  error: string;
  message: string;
  status: number;
  timestamp: string;
  details?: Record<string, unknown>;
  stack?: string;
}

export class ResponseUtil {
  static success<T>(
    res: Response,
    data: T,
    message: string = 'Operación exitosa',
    statusCode: number = 200
  ): Response {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message,
      status: statusCode,
      timestamp: new Date().toISOString()
    };
    return res.status(statusCode).json(response);
  }

  static created<T>(
    res: Response,
    data: T,
    message: string = 'Recurso creado exitosamente'
  ): Response {
    return this.success(res, data, message, 201);
  }

  static updated<T>(
    res: Response,
    data: T,
    message: string = 'Recurso actualizado exitosamente'
  ): Response {
    return this.success(res, data, message, 200);
  }

  static deleted(
    res: Response,
    message: string = 'Recurso eliminado exitosamente'
  ): Response {
    return this.success(res, { success: true }, message, 200);
  }

  static paginated<T>(
    res: Response,
    data: T[],
    total: number,
    page: number,
    limit: number,
    message: string = 'Datos obtenidos exitosamente'
  ): Response {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message,
      status: 200,
      timestamp: new Date().toISOString(),
      metadata: {
        total,
        page,
        limit,
        path: res.req?.path,
        method: res.req?.method
      }
    };
    return res.status(200).json(response);
  }

  static error(
    res: Response,
    message: string,
    statusCode: number = 500,
    details?: Record<string, unknown>
  ): Response {
    const response: ErrorResponse = {
      success: false,
      error: this.getErrorType(statusCode),
      message,
      status: statusCode,
      timestamp: new Date().toISOString(),
      details
    };
    return res.status(statusCode).json(response);
  }

  static badRequest(
    res: Response,
    message: string = 'Solicitud inválida',
    details?: Record<string, unknown>
  ): Response {
    return this.error(res, message, 400, details);
  }

  static unauthorized(
    res: Response,
    message: string = 'No autorizado'
  ): Response {
    return this.error(res, message, 401);
  }

  static forbidden(
    res: Response,
    message: string = 'Acceso prohibido'
  ): Response {
    return this.error(res, message, 403);
  }

  static notFound(
    res: Response,
    message: string = 'Recurso no encontrado'
  ): Response {
    return this.error(res, message, 404);
  }

  static conflict(
    res: Response,
    message: string,
    details?: Record<string, unknown>
  ): Response {
    return this.error(res, message, 409, details);
  }

  static internalServerError(
    res: Response,
    message: string = 'Error interno del servidor',
    includeStack: boolean = false
  ): Response {
    const details = includeStack && res.app?.get('env') === 'development'
      ? { stack: new Error().stack }
      : undefined;
    return this.error(res, message, 500, details);
  }

  private static getErrorType(statusCode: number): string {
    const errorTypes: Record<number, string> = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      409: 'Conflict',
      422: 'Unprocessable Entity',
      500: 'Internal Server Error',
      502: 'Bad Gateway',
      503: 'Service Unavailable'
    };
    return errorTypes[statusCode] || 'Unknown Error';
  }

  static noContent(res: Response): Response {
    return res.status(204).send();
  }

  static accepted(res: Response, message: string = 'Solicitud aceptada'): Response {
    return this.success(res, null, message, 202);
  }
}

// === ARCHIVO: src/config/db.config.ts ===
import { config } from 'dotenv';

config();

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  pool: PoolConfig;
  ssl: SSLConfig;
  retry: RetryConfig;
}

export interface PoolConfig {
  min: number;
  max: number;
  acquireTimeoutMillis: number;
  idleTimeoutMillis: number;
  reapIntervalMillis: number;
}

export interface SSLConfig {
  enabled: boolean;
  rejectUnauthorized: boolean;
  ca?: string;
  cert?: string;
  key?: string;
}

export interface RetryConfig {
  maxAttempts: number;
  initialDelayMs: number;
  maxDelayMs: number;
  backoffMultiplier: number;
}

export interface ConnectionStatus {
  isConnected: boolean;
  lastChecked: Date;
  activeConnections: number;
  idleConnections: number;
  waitingClients: number;
}

class DatabaseConfigManager {
  private static instance: DatabaseConfigManager;
  private config: DatabaseConfig;
  private connectionStatus: ConnectionStatus;
  private connectionPool: Map<string, PooledConnection>;

  private constructor() {
    this.config = this.loadConfiguration();
    this.connectionStatus = {
      isConnected: false,
      lastChecked: new Date(),
      activeConnections: 0,
      idleConnections: 0,
      waitingClients: 0
    };
    this.connectionPool = new Map();
  }

  static getInstance(): DatabaseConfigManager {
    if (!DatabaseConfigManager.instance) {
      DatabaseConfigManager.instance = new DatabaseConfigManager();
    }
    return DatabaseConfigManager.instance;
  }

  private loadConfiguration(): DatabaseConfig {
    const env = process.env.NODE_ENV || 'development';
    const isProduction = env === 'production';

    return {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      database: process.env.DB_NAME || 'product_catalog',
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      pool: {
        min: parseInt(process.env.DB_POOL_MIN || '2', 10),
        max: parseInt(process.env.DB_POOL_MAX || '10', 10),
        acquireTimeoutMillis: parseInt(process.env.DB_ACQUIRE_TIMEOUT || '30000', 10),
        idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '60000', 10),
        reapIntervalMillis: parseInt(process.env.DB_REAP_INTERVAL || '30000', 10)
      },
      ssl: {
        enabled: isProduction || process.env.DB_SSL === 'true',
        rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false',
        ca: process.env.DB_SSL_CA,
        cert: process.env.DB_SSL_CERT,
        key: process.env.DB_SSL_KEY
      },
      retry: {
        maxAttempts: parseInt(process.env.DB_RETRY_MAX || '5', 10),
        initialDelayMs: parseInt(process.env.DB_RETRY_INITIAL_DELAY || '1000', 10),
        maxDelayMs: parseInt(process.env.DB_RETRY_MAX_DELAY || '30000', 10),
        backoffMultiplier: parseInt(process.env.DB_RETRY_BACKOFF || '2', 10)
      }
    };
  }

  getConfig(): DatabaseConfig {
    return { ...this.config };
  }

  getConnectionString(): string {
    const { host, port, database, username, password, ssl } = this.config;
    const sslPart = ssl.enabled ? '?sslmode=require' : '';
    return `postgresql://${username}:${password}@${host}:${port}/${database}${sslPart}`;
  }

  async connect(): Promise<boolean> {
    try {
      console.log(`Conectando a la base de datos: ${this.config.host}:${this.config.port}/${this.config.database}`);
      
      await this.simulateConnection();
      
      this.connectionStatus.isConnected = true;
      this.connectionStatus.lastChecked = new Date();
      this.connectionStatus.idleConnections = this.config.pool.min;
      
      console.log('Conexión a la base de datos establecida correctamente');
      return true;
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
      this.connectionStatus.isConnected = false;
      return false;
    }
  }

  async disconnect(): Promise<void> {
    try {
      this.connectionPool.clear();
      this.connectionStatus.isConnected = false;
      this.connectionStatus.activeConnections = 0;
      this.connectionStatus.idleConnections = 0;
      console.log('Desconexión de la base de datos completada');
    } catch (error) {
      console.error('Error al desconectar de la base de datos:', error);
      throw error;
    }
  }

  getConnectionStatus(): ConnectionStatus {
    return { ...this.connectionStatus };
  }

  getPoolStats(): { min: number; max: number; active: number; idle: number } {
    return {
      min: this.config.pool.min,
      max: this.config.pool.max,
      active: this.connectionStatus.activeConnections,
      idle: this.connectionStatus.idleConnections
    };
  }

  private async simulateConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error('Simulated connection failure'));
        }
      }, 100);
    });
  }

  async executeWithRetry<T>(
    operation: () => Promise<T>,
    operationName: string = 'database operation'
  ): Promise<T> {
    const { retry } = this.config;
    let lastError: Error | null = null;
    let delay = retry.initialDelayMs;

    for (let attempt = 1; attempt <= retry.maxAttempts; attempt++) {
      try {
        console.log(`Ejecutando ${operationName} - Intento ${attempt}/${retry.maxAttempts}`);
        return await operation();
      } catch (error) {
        lastError = error as Error;
        console.error(`Error en ${operationName} - Intento ${attempt}:`, lastError.message);
        
        if (attempt < retry.maxAttempts) {
          console.log(`Reintentando en ${delay}ms...`);
          await this.sleep(delay);
          delay = Math.min(delay * retry.backoffMultiplier, retry.maxDelayMs);
        }
      }
    }

    throw new Error(
      `Falló ${operationName} después de ${retry.maxAttempts} intentos: ${lastError?.message}`
    );
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  validateConfiguration(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const { host, port, database, username, pool } = this.config;

    if (!host || host.trim() === '') {
      errors.push('DB_HOST no configurado');
    }

    if (port < 1 || port > 65535) {
      errors.push('DB_PORT inválido: debe estar entre 1 y 65535');
    }

    if (!database || database.trim() === '') {
      errors.push('DB_NAME no configurado');
    }

    if (!username || username.trim() === '') {
      errors.push('DB_USER no configurado');
    }

    if (pool.min < 0) {
      errors.push('DB_POOL_MIN no puede ser negativo');
    }

    if (pool.max < pool.min) {
      errors.push('DB_POOL_MAX debe ser mayor o igual a DB_POOL_MIN');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

interface PooledConnection {
  id: string;
  createdAt: Date;
  lastUsedAt: Date;
  inUse: boolean;
}

export const dbConfig = DatabaseConfigManager.getInstance();
export const databaseConfig = dbConfig.getConfig();
export const connectionString = dbConfig.getConnectionString();

// === ARCHIVO: tests/product.controller.spec.ts ===
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

// === ARCHIVO: tests/product.service.spec.ts ===
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

// === ARCHIVO: tests/product.repository.spec.ts ===
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
```
