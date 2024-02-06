import { Component, EventEmitter, Input, Output } from '@angular/core';
import { npc, npcClass, npcRace } from 'src/app/models';

@Component({
  selector: 'character-card',
  templateUrl: './characterCard.component.html',
  styleUrls: [],
})
export class CharacterCardComponent {
  @Input() characters: ReadonlyArray<npc> = [];
  @Input() classes: ReadonlyArray<npcClass> = [];
  @Input() races: ReadonlyArray<npcRace> = [];
  @Output() viewCharacter = new EventEmitter<npc>();
  @Output() newCharacter = new EventEmitter();
  @Output() generateCharacter = new EventEmitter();
  characterTableColumns: string[] = ['name', 'race', 'class'];

  getRaceName(id: number) {
    const racesById = Object.fromEntries(
      this.races.map((race) => [race.raceId, race])
    );
    try {
      let name: string = racesById[id].raceName;
      return name;
    } catch (error) {
      
    }
    return "";
  }

  getClassName(id: number) {
    const classesById = Object.fromEntries(
      this.classes.map((charClass) => [charClass.id, charClass])
    );
    try {
      let name: string = classesById[id].name;
      return name;
    } catch (error) {
      
    }
    return "";
  }
}
