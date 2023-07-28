
import { createConnection, Connection } from 'typeorm';
import { logger } from '../../logger';
import seedDatabase from '../seed/databaseSeeder';

export async function initializeDB(): Promise<Connection> {
  try {
    const connection = await createConnection();
    console.log('Connected to the database');
    logger.info('Database successfully initialized');

    await seedDatabase(connection);

    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    logger.error('Error initializing the database:', error);
    throw error; // Rethrow the error to handle it at a higher level if necessary
  }
}
