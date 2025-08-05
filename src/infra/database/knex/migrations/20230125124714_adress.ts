import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('address', (table: Knex.TableBuilder) => {
        table.uuid('id').primary();
        table.string('zipcode', 255);
        table.string('state', 255);
        table.string('city', 255);
        table.string('neighborhood', 255);
        table.string('street', 255);
        table.string('number', 255);
        table.string('complement', 255);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('address');
}

