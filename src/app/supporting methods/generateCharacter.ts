import { RandomPicker } from 'wrand/lib/randomPicker';
import { npc, npcClass, npcRace, npcSubrace, raceNameScheme } from '../models';
import { generateName } from './nameGeneration';
import { positivePersonalityTraits } from '../constants/positivePersonality';
import { neutralPersonalityTraits } from '../constants/neutralPersonality';
import { negativePersonalityTraits } from '../constants/negativePersonality';
import { Dice } from 'dice-typescript';
import { StatTypes, Stats, characterStat } from '../constants';

export function generateCharacter(
  availableRaces: npcRace[],
  availableClasses: npcClass[],
  availableSubraces: npcSubrace[],
  nameSchemes: raceNameScheme[],
  nextID: number
): npc {
  // Race and associated attributes
  const selectedRace: npcRace = generateRace(availableRaces);
  let selectedSubrace = undefined;
  if (selectedRace.subraces.length >= 1) {
    let subraces: npcSubrace[] = availableSubraces.filter((subrace) =>
      selectedRace.subraces.includes(subrace.id)
    );
    selectedSubrace = generateSubrace(subraces);
  }

  // Class and associated attributes
  const selectedClass: npcClass = generateClass(availableClasses);
  const selectedLevel: number = generateLevel();
  const rolledStats: characterStat[] = generateStats(
    selectedClass,
    selectedRace,
    selectedSubrace
  );
  const hitPoints: number =
    selectedClass.hitDie.value + rolledStats[Stats.CONSTITUTION].statModifier;

  // Description
  const name: string = generateName(selectedRace, nameSchemes, selectedSubrace);
  const alignment = generateAlignment(selectedRace, selectedSubrace);
  const personalityTraits = generatePersonality();
  const age = generateNumFromRange(selectedRace.ageRange);
  const height = generateHeight(selectedRace.heightRange);
  const weight = generateNumFromRange(selectedRace.weightRange);

  const character: npc = {
    charId: nextID,
    charName: name,
    charRace: selectedRace.raceId,
    charSubrace: selectedSubrace?.id,
    charClass: selectedClass.id,
    level: selectedLevel,
    stats: rolledStats,
    hitPoints: hitPoints,
    alignment: alignment,
    personalityTraits: personalityTraits,
    age: age,
    height: height,
    weight: weight,
  };
  return character;
}

function generateRace(availableRaces: npcRace[]) {
  let index = Math.floor(Math.random() * availableRaces.length);
  return availableRaces[index];
}

function generateSubrace(subraces: npcSubrace[]) {
  let index = Math.floor(Math.random() * subraces.length);
  return subraces[index];
}

function generateClass(availableClasses: npcClass[]) {
  let index = Math.floor(Math.random() * availableClasses.length);
  return availableClasses[index];
}

function generateAlignment(
  selectedRace: npcRace,
  selectedSubrace?: npcSubrace
): number {
  // weight based on selected race and subrace alignment skew
  // Highest weight should be on skew, lower weights to directly adjacent alignments, lowest weights to all others
  // Weight should basically be the number of adjacent steps from skewed alignment
  // EG: If alignment is Lawful Good(0), then Neutral Good(1) and Lawful Neutral(3) are 1 step away
  // Chaotic Good(2), True Neutral(4), and Lawful Evil(6) are 2 steps. Chaotic Neutral(5), and Neutral Evil(7) are 3 steps
  // Chaotic Evil(8) is 4 steps
  // EG: If alignment is Chaotic Neutral(5), then:
  // Chaotic Good(2), True Neutral(4), and Chaotic Evil(8) are 1 step
  // Neutral Good(1), Lawful Neutral(3), and Neutral Evil(7) are 2 steps
  // Lawful Good(0), and Lawful Evil(6) are 3 steps
  // Use addition base 9 matrix with columns [0, 1, 2] and rows [0, 3, 6] to model alignment chart
  // [0, 1, 2]
  // [3, 4, 5]
  // [6, 7, 8]
  // Available moves at any given time: row +- 1 & col + 0 (1 step), col +- 1 & row + 0 (1 step)
  // row +- 1 & col +- 1 (2 steps), row +- 2 & col + 0 (2 steps). col +- 2 & row + 0 (2 steps)
  // row +- 2 & col +- 1 (3 steps), col +- 2 & row +- 1 (3 steps)
  // row +- 2 & col +- 2 (4 steps)
  // weights to use:
  // 0 steps: 70%, 1 step: 15%, 2 steps: 10%, 3 steps: 4%, 4 steps: 1%
  let alignmentItems = [];
  let alignmentMatrix: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];
  const alignmentSkew: number = selectedRace.alignmentSkew;
  let skewPosition = [Math.trunc(alignmentSkew / 3), alignmentSkew % 3];
  for (let row = 0; row < alignmentMatrix.length; row++) {
    for (let col = 0; col < alignmentMatrix[row].length; col++) {
      // Math.abs()
      let compare: number =
        Math.abs(skewPosition[0] - row) + Math.abs(skewPosition[1] - col);
      switch (compare) {
        case 0:
          alignmentItems.push({ original: alignmentSkew, weight: 70 });
          break;
        case 1:
          alignmentItems.push({
            original: alignmentMatrix[row][col],
            weight: 15,
          });
          break;
        case 2:
          alignmentItems.push({
            original: alignmentMatrix[row][col],
            weight: 10,
          });
          break;
        case 3:
          alignmentItems.push({
            original: alignmentMatrix[row][col],
            weight: 4,
          });
          break;
        case 4:
          alignmentItems.push({
            original: alignmentMatrix[row][col],
            weight: 1,
          });
          break;
      }
    }
  }
  const picker = new RandomPicker(alignmentItems);
  return picker.pick();
}

function generatePersonality(): string[] {
  // One positive, one neutral, one negative
  let personality: string[] = [];
  personality.push(
    positivePersonalityTraits[
      Math.floor(Math.random() * positivePersonalityTraits.length)
    ]
  );
  personality.push(
    neutralPersonalityTraits[
      Math.floor(Math.random() * neutralPersonalityTraits.length)
    ]
  );
  personality.push(
    negativePersonalityTraits[
      Math.floor(Math.random() * negativePersonalityTraits.length)
    ]
  );
  return personality;
}

function generateLevel() {
  // this will be complex, for alpha just create level 1 characters
  return 1;
}

function generateStats(
  selectedClass: npcClass,
  selectedRace: npcRace,
  selectedSubrace?: npcSubrace
) {
  // Improvement idea: Let DM's decide if they want stats rolled the dnd 5e way, or just a d20 like a madman
  // Roll 6 stats, place them according to class stat priority
  // Add from race modifiers, ensure that in edit page when race changes old asis are subtracted, and new are added
  // similarly when classes are changed they should refactor stats based on priority
  // Improvement idea: add a toggleable setting for both races and classes to remove the above functionality

  // Roll 4 6-sided die, record total of theh highest 3
  // Repeat
  const dice = new Dice();
  let resultsSet: number[] = [];
  let lowestIndex: number;
  let stats: number[] = [];
  for (let counter = 6; counter > 0; counter--) {
    for (let roll = 4; roll > 0; roll--) {
      resultsSet.push(dice.roll('1d6').total);
    }
    lowestIndex = resultsSet.indexOf(Math.min(...resultsSet));
    resultsSet.splice(lowestIndex, 1);
    stats.push(resultsSet.flat().reduce((a, b) => a + b));
    resultsSet = [];
  }

  // Put stats in order based on class stat priority
  // for each in stat priority:
  // find highest stat
  // Add highest stat to temp array
  // Remove highest stat from stat array
  let charStatsArray: characterStat[] = [];
  let largestIndex: number;
  for (let index = 0; index < selectedClass.statPriority.length; index++) {
    largestIndex = stats.indexOf(Math.max(...stats));
    let stat: characterStat = {
      stat: selectedClass.statPriority[index],
      statValue: stats[largestIndex],
      statModifier: Math.floor((stats[largestIndex] - 10) / 2),
    };
    charStatsArray.push(stat);
    stats.splice(largestIndex, 1);
  }

  charStatsArray.sort((first, second) => first.stat.value - second.stat.value);

  // Add ASI vals
  for (
    let index = 0;
    index < selectedRace.abilityScoreIncrease.length;
    index++
  ) {
    let asi: [StatTypes, number] = selectedRace.abilityScoreIncrease[index];
    charStatsArray[asi[0].value].statValue =
      charStatsArray[asi[0].value].statValue + asi[1];

    charStatsArray[asi[0].value].statModifier = Math.floor(
      (charStatsArray[asi[0].value].statValue - 10) / 2
    );
  }

  if (selectedSubrace && selectedSubrace.abilityScoreIncrease) {
    for (
      let index = 0;
      index < selectedSubrace.abilityScoreIncrease.length;
      index++
    ) {
      let asi: [StatTypes, number] =
        selectedSubrace.abilityScoreIncrease[index];
      charStatsArray[asi[0].value].statValue =
        charStatsArray[asi[0].value].statValue + asi[1];

      charStatsArray[asi[0].value].statModifier = Math.floor(
        (charStatsArray[asi[0].value].statValue - 10) / 2
      );
    }
  }

  return charStatsArray;
}

function generateNumFromRange(range: number[]): number {
  // assume range is {low, high}
  let difference: number = range[1] - range[0];
  let generated: number = Math.floor(Math.random() * difference) + range[0];
  return generated;
}

function generateHeight(feetRange: number[]): number[] {
  // assume range is {low, high}
  let difference: number = feetRange[1] - feetRange[0];
  let feet: number = Math.floor(Math.random() * difference) + feetRange[0];
  let inches: number = Math.floor(Math.random() * 12);
  return [feet, inches];
}

/*
Race  Base Height Hieght Mod  Base W  W Mod
Human 4'8" +2d10 110 lb. x (2d4) lb.
Dwarf, hill 3'8” +2d4 115 lb. x (2d6) lb.
Dwarf, mountain 4' +2d4 130 lb. x (2d6) lb.
Elf, high 4’6" +2d10 90 lb. x (1d4) lb.
Elf, wood 4'6" +2d10 100 lb. x (1d4) lb.
Elf, drow 4'5" +2d6 75 lb. x (1d6) lb.
Halfling 2'7" +2d4 35 lb. x 1 lb.
Dragonborn 5'6" +2d8 175 lb. x (2d6) lb.
Gnome 2' 11" +2d4 35 lb. x 1 lb.
Half-elf 4'9" +2d8 110 lb. x (2d4) lb.
Half-orc 4'10" +2d10 140 lb. x (2d6) lb.
Tiefling 4'9" +2d8 110 lb. x (2d4) lb.
*/
