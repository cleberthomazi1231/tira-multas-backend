import { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('sales', (table) => {
        table.json('response_data');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('sales', (table) => {
        table.dropColumn('response_data');
    });
}
