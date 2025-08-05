import type { Knex } from 'knex';

import 'dotenv/config';

const config: { [key: string]: Knex.Config } = {
    test: {
        client: process.env.TIRA_MULTAS_DB_DRIVE,
        connection: {
            database:`${process.env.TIRA_MULTAS_DB_NAME}_test`,
            host: process.env.TIRA_MULTAS_DB_HOST,
            port: Number(process.env.TIRA_MULTAS_DB_PORT),
            user: process.env.TIRA_MULTAS_DB_USER,
            password: process.env.TIRA_MULTAS_DB_PASS
        },
        migrations: {
            directory: './src/infra/database/knex/migrations'
        }
    },
    development: {
        client: process.env.TIRA_MULTAS_DB_DRIVE,
        connection: {
            database:process.env.TIRA_MULTAS_DB_NAME,
            host: process.env.TIRA_MULTAS_DB_HOST,
            port: Number(process.env.TIRA_MULTAS_DB_PORT),
            user: process.env.TIRA_MULTAS_DB_USER,
            password: process.env.TIRA_MULTAS_DB_PASS
        },
        migrations: {
            directory: './src/infra/database/knex/migrations'
        }
    },
    production: {
        client: process.env.TIRA_MULTAS_DB_DRIVE,
        connection: {
            database:process.env.TIRA_MULTAS_DB_NAME,
            host: process.env.TIRA_MULTAS_DB_HOST,
            port: Number(process.env.TIRA_MULTAS_DB_PORT),
            user: process.env.TIRA_MULTAS_DB_USER,
            password: process.env.TIRA_MULTAS_DB_PASS
        },
        migrations: {
            directory: './build/infra/database/knex/migrations'
        }
    }
};

module.exports = config;
