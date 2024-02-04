import { Component, EventEmitter, Input, Output } from '@angular/core';
import { npcRace } from 'src/app/models';

@Component({
  selector: 'race-card',
  templateUrl: './raceCard.component.html',
  styleUrls: [],
})
export class RaceCardComponent {
  @Input() races: ReadonlyArray<npcRace> = [];
  @Output() viewRace = new EventEmitter<npcRace>();
  @Output() newRace = new EventEmitter();
  raceTableColumns: string[] = ['name', 'asi', 'userCreated'];
}
