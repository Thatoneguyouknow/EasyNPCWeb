export interface npcClass {
    classId: number;
    className: string;
    userCreated: boolean;
    hitDie: number;
    statPriority: Map<number, number>;
}