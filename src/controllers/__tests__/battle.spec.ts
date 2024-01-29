import app from '../../app';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import factories from '../../factories';
import { Battle, Monster } from '../../models';

const server = app.listen();

beforeAll(() => jest.useFakeTimers());
afterAll(() => server.close());

describe('BattleController', () => {
  describe('List', () => {
    test('should list all battles', async () => {
      const response = await request(server).get('/battle');
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Get', () => {
    test('should get a battle by id successfuly', async () => {
      const battle = factories.battle.build();
      const { id } = await Battle.query().insert(battle);

      const response = await request(server).get(`/battle/${id}`);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.id).toBe(id);
    });

    test('should fail getting a battle by an inexistent id', async () => {
      const response = await request(server).get(`/battle/9999`);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });

  describe('Battle', () => {
    test('should fail when trying a battle of monsters with an undefined monster', async () => {
      const sampleSize = 1;
      const monstersA = factories.monster.buildList(sampleSize);
      const monstersB = factories.monster.buildList(sampleSize);

      const monsters = monstersA.concat(monstersB);

      const ids = await Promise.all(
        monsters.map(async (data) => (await Monster.query().insert(data)).id)
      );

      const response = await request(server).post(`/battle/9999/${ids[1]}`);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });

    test('should fail when trying a battle of monsters with an inexistent monster', async () => {
      const response = await request(server).post(`/battle/9999/9998`);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });

    test('should insert a battle of monsters successfully with monster 1 winning', async () => {
      const sampleSize = 1;
      const monstersA = factories.monster.buildList(sampleSize);
      const monstersB = factories.monster.buildList(sampleSize);

      monstersB[0].speed -= 5;
      monstersB[0].attack -= 5;
      monstersB[0].defense -= 20;

      const monsters = monstersA.concat(monstersB);

      const ids = await Promise.all(
        monsters.map(async (data) => (await Monster.query().insert(data)).id)
      );

      const response = await request(server).post(
        `/battle/${ids[0]}/${ids[1]}`
      );

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.id).toBe(ids[0]);
    });

    test('should insert a battle of monsters successfully with monster 1 winning with attack less than defense', async () => {
      const sampleSize = 1;
      const monstersA = factories.monster.buildList(sampleSize);
      const monstersB = factories.monster.buildList(sampleSize);

      monstersA[0].defense = monstersB[0].attack + 2;

      monstersB[0].speed -= 5;
      monstersB[0].attack -= 5;
      monstersB[0].defense = monstersA[0].attack - 1;

      const monsters = monstersA.concat(monstersB);

      const ids = await Promise.all(
        monsters.map(async (data) => (await Monster.query().insert(data)).id)
      );

      const response = await request(server).post(
        `/battle/${ids[0]}/${ids[1]}`
      );

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.id).toBe(ids[0]);
    });

    test('should insert a battle of monsters successfully with monster 2 winning', async () => {
      const sampleSize = 1;
      const monstersA = factories.monster.buildList(sampleSize);
      const monstersB = factories.monster.buildList(sampleSize);

      monstersB[0].speed += 5;
      monstersB[0].attack += 5;
      monstersB[0].defense += 20;

      const monsters = monstersA.concat(monstersB);

      const ids = await Promise.all(
        monsters.map(async (data) => (await Monster.query().insert(data)).id)
      );

      const response = await request(server).post(
        `/battle/${ids[0]}/${ids[1]}`
      );

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.id).toBe(ids[1]);
    });

    test("should insert a battle of monsters successfully with monster's speed is equal and monster 1 has more attack", async () => {
      const sampleSize = 1;
      const monstersA = factories.monster.buildList(sampleSize);
      const monstersB = factories.monster.buildList(sampleSize);

      monstersA[0].attack += 5;
      monstersA[0].defense += 20;

      const monsters = monstersA.concat(monstersB);

      const ids = await Promise.all(
        monsters.map(async (data) => (await Monster.query().insert(data)).id)
      );

      const response = await request(server).post(
        `/battle/${ids[0]}/${ids[1]}`
      );

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.id).toBe(ids[0]);
    });

    test("should insert a battle of monsters successfully with monster's speed is equal and monster 2 has more attack", async () => {
      const sampleSize = 1;
      const monstersA = factories.monster.buildList(sampleSize);
      const monstersB = factories.monster.buildList(sampleSize);

      monstersB[0].attack += 5;

      const monsters = monstersA.concat(monstersB);

      const ids = await Promise.all(
        monsters.map(async (data) => (await Monster.query().insert(data)).id)
      );

      const response = await request(server).post(
        `/battle/${ids[0]}/${ids[1]}`
      );

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body.id).toBe(ids[1]);
    });
  });

  describe('Delete Battle', () => {
    test('should delete a battle successfully', async () => {
      const battle = factories.battle.build();
      const { id } = await Battle.query().insert(battle);

      const getResponse = await request(server).get(`/battle/${id}`);
      expect(getResponse.status).toBe(StatusCodes.OK);
      expect(getResponse.body.id).toBe(id);

      const deleteResponse = await request(server).delete(`/battle/${id}`);
      expect(deleteResponse.status).toBe(StatusCodes.NO_CONTENT);
    });

    test("should return 404 if the battle doesn't exists", async () => {
      const response = await request(server).delete(`/battle/9999`);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  });
});
