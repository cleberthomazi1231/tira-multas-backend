import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('resources', (table) => {
        table.string('photo', 255);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('resources', (table) => {
        table.dropColumn('photo');
    });
}