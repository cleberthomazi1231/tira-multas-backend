import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('sales', (table: Knex.TableBuilder) => {
        table.uuid('id').primary();
        table.string('status', 255);
        table.decimal('tax_value', 6, 2);
        table.decimal('discount', 6, 2);
        table.decimal('total_value', 6, 2);
        table.text('document');
        table.uuid('buyer_id')
            .references('id')
            .inTable('buyers')
            .onUpdate('cascade');
        table.uuid('dealer_id')
            .references('id')
            .inTable('dealers')
            .onUpdate('cascade');
        table.uuid('resource_id')
            .references('id')
            .inTable('resources')
            .onUpdate('cascade');
        table.timestamp('created_at');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('sales');
}
