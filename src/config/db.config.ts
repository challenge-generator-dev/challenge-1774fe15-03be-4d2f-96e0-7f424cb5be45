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