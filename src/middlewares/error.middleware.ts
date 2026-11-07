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