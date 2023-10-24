// These interfaces do not need to match the backend
import { HitDie, StatTypes } from "../constants";

export interface npcClass {
    id: number;
    userId: number;
    name: string;
    userCreated: boolean;
    hitDie: HitDie;
    statPriority: StatTypes[];
}