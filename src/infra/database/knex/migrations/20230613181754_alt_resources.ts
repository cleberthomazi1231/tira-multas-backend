import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('resources', (table) => {
        table.string('type', 255);
        table.text('description');
        table.string('article', 255);
        table.string('code', 255);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('resources', (table) => {
        table.dropColumn('code');
        table.dropColumn('article');
        table.dropColumn('description');
        table.dropColumn('type');
    });
}