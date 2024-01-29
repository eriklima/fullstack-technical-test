import { Monster } from '../models';

export class Field {
  constructor(private monsterA: Monster, private monsterB: Monster) {}

  startBattle() {
    if (this.monsterA.speed == this.monsterB.speed) {
      if (this.monsterA.attack > this.monsterB.attack) {
        this.fight(this.monsterA, this.monsterB);
      } else {
        this.fight(this.monsterB, this.monsterA);
      }
    } else if (this.monsterA.speed > this.monsterB.speed) {
      this.fight(this.monsterA, this.monsterB);
    } else {
      this.fight(this.monsterB, this.monsterA);
    }
  }

  fight(first: Monster, second: Monster) {
    while (this.turn(first, second)) {
      const aux = first;
      first = second;
      second = aux;
    }
  }

  turn(first: Monster, second: Monster): boolean {
    let demage = 0;

    if (first.attack <= second.defense) {
      demage = 1;
    } else {
      demage = first.attack - second.defense;
    }

    second.hp -= demage;

    return second.hp > 0;
  }

  getWin(): Monster | undefined {
    if (this.monsterA.hp > 0 && this.monsterB.hp > 0) {
      return undefined;
    }

    if (this.monsterA.hp > 0) {
      return this.monsterA;
    } else {
      return this.monsterB;
    }
  }
}
