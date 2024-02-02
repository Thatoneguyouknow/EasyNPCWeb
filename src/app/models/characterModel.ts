import { characterStat } from "../constants";
import { npcClass, npcRace, npcSubrace } from '../models';


export interface npc {
    charId: number;
    charName: string;
    charRace: number;
    charSubrace?: number;
    charClass: number;
    level: number;
    stats: characterStat[];
    hitPoints: number; // Determined by rolling hit die, adding con modifier
    alignment: number;
    personalityTraits: string[];
    age: number;
    height: number[];
    weight: number;
}

// Part 1: race
//Race, Subrace, ASI

// Part 2: class
// Class, class features, proficiencies, armor, weapons, skills, saving throws, tools
// hit dice

// Part 3: Ability Scores
// Rolls, ability modifiers, asi, hit points

// Part 4: Description
// alignments, ideals, bonds, flaws, background, personality, physical look (Age, Height, Weight, Eyes, Skin, Hair, Gender?)

// Part 5: Equipment
// Starting Equipment, Money, AC, Weapons

/*
All traits that appear in a character
Name
Class
Level
Background
Alignment
Race
Alignment
Stats: Str, Dex, Con, Int, Wis, Cha
Inspiration
Prof Bonus
Saving Throws
Skills
Passive Wis (Perception)
Armor Class
Initiative
Speed
HP Max
Current HP
Temp HP
Hit Dice
Death Saves
Personality Traits
Ideals
Bonds
Flaws
Attacks
Spells
Equipment
Money
Weapons
Features/Traits
Languages
Age
Height
Weight
Eyes
Skin
Hair
Gender?
*/