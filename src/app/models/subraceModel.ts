import { StatTypes } from "../constants";

export interface npcSubrace {
    id: number;
    name: string;
    nameScheme: number | null;
    asiRaw: number[] | null;
    asivRaw: number[] | null;
    abilityScoreIncrease: Array<[StatTypes, number]> | null;
}