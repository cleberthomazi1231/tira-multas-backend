import { Knex } from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
        table.uuid('id').primary();
        table.string('name', 255);
        table.string('email', 255);
        table.string('password', 255);
        table.string('telephone', 255);
        table.string('permissions', 255);
        table.timestamp('created_at');
    });
}
 
export async function down(knex: Knex){
    return knex.schema.dropTable('users');
}