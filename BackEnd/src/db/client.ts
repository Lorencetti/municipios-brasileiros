import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' });

export const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

client.connect()
  .then(() => console.log('PostgreSQL connected!'))
  .catch(err => console.error('Error connecting to DB:', err));
