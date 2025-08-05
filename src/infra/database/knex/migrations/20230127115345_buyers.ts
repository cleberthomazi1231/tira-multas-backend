import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('buyers', (table: Knex.TableBuilder) => {
        table.uuid('id').primary();
        table.string('name', 255);
        table.string('document', 255);
        table.string('telephone', 255);
        table.string('email', 255);
        table.timestamp('created_at');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('buyers');
}
