import { Component, Input } from '@angular/core';
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
  characterTableColumns: string[] = ['name', 'race', 'class'];

  getRaceName(id: number) {
    const racesById = Object.fromEntries(
      this.races.map((race) => [race.raceId, race])
    );
    return racesById[id].raceName;
  }

  getClassName(id: number) {
    const classesById = Object.fromEntries(
      this.classes.map((charClass) => [charClass.id, charClass])
    );
    return classesById[id].name;
  }

  newCharacter() {}

  viewCharacter(toView: npc) {}

  generateNewCharacter() {}
}
