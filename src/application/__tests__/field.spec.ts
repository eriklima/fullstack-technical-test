import factories from '../../factories';
import { Field } from '../field';

describe('Field', () => {
  test('should return undefined winner if before start battle', () => {
    const sampleSize = 2;
    const monsters = factories.monster.buildList(sampleSize);

    const field = new Field(monsters[0], monsters[1]);

    expect(field.getWin()).toBeUndefined();
  });
});
