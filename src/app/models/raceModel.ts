export interface npcRace {
    raceId: number;
    raceName: string;
    alignmentSkew: number;
    heightRange: [number, number];
    weightRange: [number, number];
    ageRange: [number, number];
    ASI: number[];
    ASIV: number[];
    abilityScoreIncrease: Array<[number, number]>;
}