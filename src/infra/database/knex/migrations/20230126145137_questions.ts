import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('questions', (table: Knex.TableBuilder) => {
        table.uuid('id').primary();
        table.text('value');
        table.text('answer');
        table.timestamp('created_at');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('questions');
}