import knex from 'knex';

const db = knex({
    client: 'pg',
    connection: {
        database: 
            `${process.env.TIRA_MULTAS_DB_NAME}${process.env.NODE_ENV ==='test' ? '_test' : ''}`,
        host: process.env.TIRA_MULTAS_DB_HOST,
        port: Number(process.env.TIRA_MULTAS_DB_PORT),
        user:  process.env.TIRA_MULTAS_DB_USER,
        password:  process.env.TIRA_MULTAS_DB_PASS,
    }
});

export default db;