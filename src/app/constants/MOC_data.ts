import { npc, npcClass, npcRace } from "../models";
import  * as Stat from ".";

export const CLASS_MOC_DATA: npcClass[] = [
  {
    id: 1,
    userId: 100,
    name: 'Ligma',
    userCreated: false,
    hitDie: Stat.availableHitDie.filter((hitdie) => hitdie.value == 4)[0],
    statPriority: Stat.availableAbilities,
  },
];

const RACE_MOC_DATA: npcRace[] = [
  {
    raceId: 1,
    raceName: 'Sugma',
    alignmentSkew: 0,
    heightRange: [4, 5],
    weightRange: [100, 350],
    ageRange: [10, 100],
    // ASI: [Stat.availableAbilities[0]],
    asiRaw: [0, 1, 2],
    asivRaw: [1, 1, 1],
    abilityScoreIncrease: [
      [Stat.availableAbilities[0], 1],
      [Stat.availableAbilities[0], 1],
      [Stat.availableAbilities[0], 1],
    ],
    subraces: [1],
    nameType: 1,
  },
];

const CHAR_MOC_DATA: npc[] = [
  {
    charId: 1,
    charName: 'Jeffery',
    charRace: 0,
    charClass: 0,
    alignment: 8,
    personalityTraits: ['stupid'],
    level: 1,
    stats: [
      { stat: Stat.availableAbilities[0], statValue: 15, statModifier: 3 },
      { stat: Stat.availableAbilities[1], statValue: 14, statModifier: 3 },
      { stat: Stat.availableAbilities[2], statValue: 13, statModifier: 3 },
      { stat: Stat.availableAbilities[3], statValue: 12, statModifier: 3 },
      { stat: Stat.availableAbilities[4], statValue: 11, statModifier: 3 },
      { stat: Stat.availableAbilities[5], statValue: 10, statModifier: 3 },
    ],
    hitPoints: 12,
    age: 50,
    height: [5, 11],
    weight: 120,
  },
];