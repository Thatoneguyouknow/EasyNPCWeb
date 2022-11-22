import { npcClass } from "./classModel";
import { npcRace } from "./raceModel";

export interface npc {
    charId: number;
    charName: string;
    charRace: npcRace;
    charClass: npcClass;
}