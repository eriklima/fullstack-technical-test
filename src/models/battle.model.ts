import { Id, Model, RelationMappings } from 'objection';
import Base from './base';
import { Monster } from './monster.model';

export class Battle extends Base {
  id!: Id;
  monsterA!: Monster;
  monsterB!: Monster;
  winner!: Monster;

  static tableName = 'battle';

  static get relationMappings(): RelationMappings {
    return {
      monsterARelation: {
        relation: Model.HasOneRelation,
        modelClass: Monster,
        join: {
          from: this.tableName + '.monsterA',
          to: Monster.tableName + '.id',
        },
      },
      monsterBRelation: {
        relation: Model.HasOneRelation,
        modelClass: Monster,
        join: {
          from: this.tableName + '.monsterB',
          to: Monster.tableName + '.id',
        },
      },
      winnerRelation: {
        relation: Model.HasOneRelation,
        modelClass: Monster,
        join: {
          from: this.tableName + '.winner',
          to: Monster.tableName + '.id',
        },
      },
    };
  }
}
