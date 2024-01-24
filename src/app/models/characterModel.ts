import { characterStat } from "../constants";
import { npcClass } from "./classModel";
import { npcRace } from "./raceModel";

export interface npc {
    charId: number;
    charName: string;
    charRace: npcRace;
    charClass: npcClass;
    // charSubrace: npcSubrace;
    alignment: number;
    personalityTraits: string[];
    level: number;
    stats: characterStat[];
    hitPoints: number;
    armorClass: number;
    speed: number;
    // background
    // skills
    // weapons
    // attacks
    // spellcasting
}