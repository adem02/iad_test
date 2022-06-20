import { createPool, Pool } from "mysql";
import { DATA_SOURCES } from "../config/vars.config";
const dataSource = DATA_SOURCES.mySqlDataSource;



let pool: Pool;

// Initialization of database connection with Pool
export const init = () => {
    try {
        pool = createPool({
            connectionLimit: dataSource.DB_CONNECTION_LIMIT,
            host: dataSource.DB_HOST,
            user: dataSource.DB_USER,
            password: dataSource.DB_PASSWORD,
            database: dataSource.DB_DATABASE
        })

        console.log('MySql Adapter Pool generated successfully')

    } catch (error) {
        console.error('[mysql.connector][init][Error]: ', error);
        throw new Error('failed to initialized pool');
    }
}

// Function that executes sql queries
export const execute = <T>(query: string, params: string[] | Object): Promise<T> => {
    try {
        if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');

        return new Promise<T>((resolve, reject) => {
            pool.query(query, params, (error, results) => {
                if (error) reject(error);
                else resolve(results);
            });
        });

    } catch (error) {
        console.error('[mysql.connector][execute][Error]: ', error);
        throw new Error('failed to execute MySQL query');
    }
} 