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