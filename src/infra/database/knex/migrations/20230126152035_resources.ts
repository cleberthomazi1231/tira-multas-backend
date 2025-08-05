import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('resources', (table: Knex.TableBuilder) => {
        table.uuid('id').primary();
        table.string('name', 255);
        table.json('categories');
        table.json('fields');
        table.text('document');
        table.decimal('value', 10, 2);
        table.timestamp('created_at');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('resources');
}