export const enum Stats {
    STRENGTH,
    DEXTERITY,
    CONSTITUTION,
    INTELLIGENCE,
    WISDOM,
    CHARISMA
};

export interface StatTypes {
    value: Stats;
    name: string;
    abbreviated: string;
}

export const Abilities: StatTypes[] = [
    {value: Stats.STRENGTH, name: "Strength", abbreviated: "Str"},
    {value: Stats.DEXTERITY, name: "Dexterity", abbreviated: "Dex"},
    {value: Stats.CONSTITUTION, name: "Constitution", abbreviated: "Con"},
    {value: Stats.INTELLIGENCE, name: "Intelligence", abbreviated: "Int"},
    {value: Stats.WISDOM, name: "Wisdom", abbreviated: "Wis"},
    {value: Stats.CHARISMA, name: "Charisma", abbreviated: "Cha"},
]


export const statNames: Map<number, string> = new Map([
    [Stats.STRENGTH, "Strength"],
    [Stats.DEXTERITY, "Dexterity"],
    [Stats.CONSTITUTION, "Constitution"],
    [Stats.INTELLIGENCE, "Intelligence"],
    [Stats.WISDOM, "Wisdom"],
    [Stats.CHARISMA, "Charisma"]
]);

export const abbreviatedStatNames: Map<number, string> = new Map([
    [Stats.STRENGTH, "Str"],
    [Stats.DEXTERITY, "Dex"],
    [Stats.CONSTITUTION, "Con"],
    [Stats.INTELLIGENCE, "Int"],
    [Stats.WISDOM, "Wis"],
    [Stats.CHARISMA, "Cha"]
]);

export interface HitDie {
    value: number;
    display: string;
}

export const availableHitDie: HitDie[] = [
    {value: 2, display: 'd2'},
    {value: 4, display: 'd4'},
    {value: 6, display: 'd6'},
    {value: 8, display: 'd8'},
    {value: 10, display: 'd10'},
    {value: 12, display: 'd12'},
    {value: 20, display: 'd20'},
]