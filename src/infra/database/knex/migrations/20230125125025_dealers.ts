import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('dealers', (table: Knex.TableBuilder) => {
        table.uuid('id').primary();
        table.string('name', 255);
        table.string('document', 255);
        table.string('office_name', 255);
        table.string('telephone', 255);
        table.string('email', 255);
        table.string('login', 255);
        table.string('password', 255);
        table.string('plan', 255);
        table.uuid('address_id')
            .references('id')
            .inTable('address')
            .onUpdate('cascade')
            .onDelete('cascade');
        table.timestamp('created_at');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('dealers');
}

