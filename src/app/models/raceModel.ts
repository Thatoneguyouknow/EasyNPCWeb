export interface npcRace {
    raceId: number;
    raceName: string;
    asiPrimary: [number, number];
    asiSecondary: [number, number];
    asiTertiary?: [number, number];
    ageRange: [number, number];
    nameType: number;
}