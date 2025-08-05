import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('buyers', (table) => {
        table.string('last_name', 255);
        table.string('password', 255);
        table.string('zipcode', 255);
        table.string('uf', 255);
        table.string('city', 255);
        table.string('neighborhood', 255);
        table.string('street', 255);
        table.string('number', 255);
        table.string('complement', 255);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('buyers', (table) => {
        table.dropColumn('last_name');
        table.dropColumn('password');
        table.dropColumn('zipcode');
        table.dropColumn('uf');
        table.dropColumn('city');
        table.dropColumn('neighborhood');
        table.dropColumn('street');
        table.dropColumn('number');
        table.dropColumn('complement');
    });
}