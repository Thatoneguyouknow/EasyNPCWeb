import { npcRace, npcSubrace } from '../models';

export function generateName(
  selectedRace: npcRace,
  selectedSubrace?: npcSubrace
): string {
  // If there is a subrace, use associated name scheme

  // Dwarf: First of clan Last [Sub]
  // Elf: First Last (Add functionality for children later)
  // Halfling: First (Nick?) Last
  // Human: First Last [Sub]
  // Dragonborn: First, clan Last (child names)
  // Gnome: First (Nick | First x 1-4) Last
  // Half Elf: 50/50 Elf or Human name
  // Half-Orc: Name
  // Tiefling: Infernal Name | Virtue Name
  if (selectedSubrace && selectedSubrace.nameScheme) {
    console.log('Subrace Exists and has a name Scheme');
  }
  return 'JEff';
}
