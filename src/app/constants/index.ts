export const enum Stats {
    STRENGTH,
    DEXTERITY,
    CONSTITUTION,
    INTELLIGENCE,
    WISDOM,
    CHARISMA
};

export const statNames: Map<number, string> = new Map([
    [Stats.STRENGTH, "Strength"],
    [Stats.DEXTERITY, "Dexterity"],
    [Stats.CONSTITUTION, "Constitution"],
    [Stats.INTELLIGENCE, "Intelligence"],
    [Stats.WISDOM, "Wisdom"],
    [Stats.CHARISMA, "Charisma"]
]);

export const abbreviatedStatNames = new Map([
    [Stats.STRENGTH, "Str"],
    [Stats.DEXTERITY, "Dex"],
    [Stats.CONSTITUTION, "Con"],
    [Stats.INTELLIGENCE, "Int"],
    [Stats.WISDOM, "Wis"],
    [Stats.CHARISMA, "Cha"]
]);

export const availableHitDieVals = [4, 6, 8, 10, 12, 20];

export const hitDieNames = new Map([
    [4, "d4"],
    [6, "d6"],
    [8, "d8"],
    [10, "d10"],
    [12, "d12"],
    [20, "d20"]
])