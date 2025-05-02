interface Env {
    PORT: number;
    DATABASE_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }

  const env: Env = {
    PORT: parseInt(process.env.PORT || '5000'),
    DATABASE_URL: process.env.DATABASE_URL || '',
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test' || 'development'
  };

  // Validate required environment variables
  if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required in .env');
  }

  export default env;