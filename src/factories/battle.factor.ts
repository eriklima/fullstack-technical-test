import { faker } from '@faker-js/faker';
import { Factory } from 'rosie';
import { Battle } from '../models';

export default Factory.define(Battle.tableName).attrs({
  monsterA: faker.datatype.number({ min: 10, max: 100 }),
  monsterB: faker.datatype.number({ min: 10, max: 100 }),
  winner: faker.datatype.number({ min: 10, max: 100 }),
});
