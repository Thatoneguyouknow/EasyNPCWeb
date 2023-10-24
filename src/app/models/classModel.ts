// These interfaces do not need to match the backend
import { HitDie } from "../constants";

export interface npcClass {
    id: number;
    userId: number;
    name: string;
    userCreated: boolean;
    hitDie: HitDie | undefined;
    statPriority: number[];
}