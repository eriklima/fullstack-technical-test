import { Knex } from 'knex';
import { Battle } from '../../src/models';

export const up = (knex: Knex): Promise<void> =>
  knex.schema.createTable(Battle.tableName, (table: Knex.TableBuilder) => {
    table.increments();
    table.timestamps();
    table.integer('winner').checkLength('>', 0);
    table.integer('monsterA').checkLength('>', 0);
    table.integer('monsterB').checkLength('>', 0);
  });

export const down = (knex: Knex): Promise<void> =>
  knex.schema.dropTable(Battle.tableName);
