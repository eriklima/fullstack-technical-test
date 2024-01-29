import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Battle } from '../models';
import { getById } from './monster.controller';
import { Field } from '../application/field';

const list = async (req: Request, res: Response): Promise<Response> => {
  const battles = await Battle.query();
  return res.status(StatusCodes.OK).json(battles);
};

const start = async (req: Request, res: Response): Promise<Response> => {
  const monsterAId = req.params.monsterAId;
  const monsterBId = req.params.monsterBId;

  const monsterA = await getById(monsterAId);
  const monsterB = await getById(monsterBId);

  if (!monsterA || !monsterB) {
    return res.status(StatusCodes.NOT_FOUND).json();
  }

  const field = new Field(monsterA, monsterB);
  field.startBattle();
  const winner = field.getWin();

  return res.status(StatusCodes.OK).json(winner);
};

const remove = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.id;

  const battle = await findById(id);

  if (!battle) {
    return res.status(StatusCodes.NOT_FOUND).json();
  }

  await Battle.query().deleteById(id);
  return res.status(StatusCodes.NO_CONTENT).json();
};

const get = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.id;
  const battle = await findById(id);

  if (!battle) {
    return res.status(StatusCodes.NOT_FOUND).json();
  }

  return res.status(StatusCodes.OK).json(battle);
};

async function findById(id: string) {
  return await Battle.query().findById(id);
}

export const BattleController = {
  list,
  start,
  remove,
  get,
};
