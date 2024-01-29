import { Knex } from 'knex';
import { Monster } from '../../src/models';

export const up = (knex: Knex): Promise<void> =>
  knex.schema.createTable(Monster.tableName, (table: Knex.TableBuilder) => {
    table.increments();
    table.timestamps();
    table.string('imageUrl').notNullable().checkLength('>', 1);
    table.string('name').notNullable().checkLength('>', 1);
    table.integer('attack').notNullable().checkLength('>', 0);
    table.integer('defense').notNullable().checkLength('>', 0);
    table.integer('hp').notNullable().checkLength('>', 0);
    table.integer('speed').notNullable().checkLength('>', 0);
  });

export const down = (knex: Knex): Promise<void> =>
  knex.schema.dropTable(Monster.tableName);
