import { Component, Input } from '@angular/core';
import { npcRace } from 'src/app/models';

@Component({
  selector: 'race-card',
  templateUrl: './raceCard.component.html',
  styleUrls: [],
})
export class RaceCardComponent {
  @Input() races: ReadonlyArray<npcRace> = [];
  raceTableColumns: string[] = ['name', 'asi', 'userCreated'];

  newRace() {}

  viewRace(toView: npcRace) {}
}
