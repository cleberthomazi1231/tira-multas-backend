import type { Knex } from 'knex';

import 'dotenv/config';

const config: { [key: string]: Knex.Config } = {
    test: {
        client: process.env.DB_DRIVE,
        connection: {
            database:`${process.env.DB_NAME}_test`,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASS
        },
        migrations: {
            directory: './src/infra/database/knex/migrations'
        }
    },
    development: {
        client: process.env.DB_DRIVE,
        connection: {
            database:process.env.DB_NAME,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASS
        },
        migrations: {
            directory: './src/infra/database/knex/migrations'
        }
    },
    production: {
        client: process.env.DB_DRIVE,
        connection: {
            database:process.env.DB_NAME,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASS
        },
        migrations: {
            directory: './build/infra/database/knex/migrations'
        }
    }
};

module.exports = config;
