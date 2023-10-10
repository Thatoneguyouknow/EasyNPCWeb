// These interfaces do not need to match the backend

export interface npcClass {
    id: number;
    userId: number;
    name: string;
    userCreated: boolean;
    hitDie: number;
    statPriority: number[];
}