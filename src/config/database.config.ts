import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'dpg-d37pue8gjchc73cfo70g-a',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'taskuser',
  password: process.env.DB_PASSWORD || 'm4jh8LJl3SLRDAqZEJ0GfRZggSiAF38H',
  database: process.env.DB_DATABASE || 'taskdb_zkuy',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};
