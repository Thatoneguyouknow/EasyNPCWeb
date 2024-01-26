import { npcClass, npcRace, npcSubrace } from '../models';

export function generateCharacter(
  availableRaces: npcRace[],
  availableClasses: npcClass[],
  availableSubraces: npcSubrace[]
) {
  // Orders
  // Race -> Subrace? -> Name -> Alignment
  // Class -> Stats
  // Alignment is associated with subrace for DROW, Dragonborn?
  const selectedClass = generateClass(availableClasses);
  console.log(selectedClass.name);
  const selectedRace = generateRace(availableRaces);
  console.log(selectedRace);
  const alignment = generateAlignment(selectedRace);
  if (selectedRace.subraces.length >= 1) {
    let subraces: npcSubrace[] = availableSubraces.filter((subrace) =>
      selectedRace.subraces.includes(subrace.id)
    );
    const selectedSubrace = generateSubrace(subraces);
    console.log(selectedSubrace);
    
  }
  // const name = generateName(selectedSubrace);
  // const alignment = generateAlignment(selectedRace, selectedSubrace);
  return null;
}

function generateName(selectedRace: npcRace, selectedSubrace?: npcSubrace) {
  // Names have specific generation based on race/subrace
  return 'JEFF';
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
  return 0;
}

function generatePersonality() {
  // Take base personality traits from old C++ project
}

function generateLevel() {
  // this will be complex, for alpha just create level 1 characters
  return 1;
}

function generateStats() {
  // Improvement idea: Let DM's decide if they want stats rolled the dnd 5e way, or just a d20 like a madman
  // Roll 6 stats, place them according to class stat priority
  // Add from race modifiers, ensure that in edit page when race changes old asis are subtracted, and new are added
  // similarly when classes are changed they should refactor stats based on priority
  // Improvement idea: add a toggleable setting for both races and classes to remove the above functionality
}

function generateHitPoints() {}

function generateArmorClass() {}

function generateSpeed() {}
