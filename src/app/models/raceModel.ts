import { StatTypes } from "../constants";

export interface npcRace {
    raceId: number;
    raceName: string;
    alignmentSkew: number;
    heightRange: [number, number];
    weightRange: [number, number];
    ageRange: [number, number];
    asiRaw: number[];
    asivRaw: number[];
    abilityScoreIncrease: Array<[StatTypes, number]>;
    // Todo: associated subraces 
    // subraces: number[]
}