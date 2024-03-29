import {
  Component,
  EventEmitter,
  Inject,
  Output,
  QueryList,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { npcRace } from 'src/app/models';
import { StatTypes, availableAbilities } from 'src/app/constants';
import {
  MatList,
  MatListOption,
  MatSelectionList,
} from '@angular/material/list';

@Component({
  selector: 'race-edit-dialog',
  templateUrl: './raceEditDialog.component.html',
  styleUrls: ['./raceEditDialog.component.scss'],
})
export class RaceEditDialogComponent {
  @Output() deleteRace = new EventEmitter<npcRace>();
  model = Object.assign({}, this.data);
  abilities = availableAbilities;
  test = '';

  //TODO Add Validators

  constructor(
    public dialogRef: MatDialogRef<RaceEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: npcRace
  ) {}

  changeAsi($event: [StatTypes, number], oldParam: [StatTypes, number]) {
    let index = this.model.abilityScoreIncrease.indexOf(oldParam);
    if (index >= 0) {
      this.model.abilityScoreIncrease = [
        ...this.model.abilityScoreIncrease.slice(0, index),
        $event,
        ...this.model.abilityScoreIncrease.slice(index + 1),
      ];
    }
    console.log(this.model.abilityScoreIncrease);
  }

  noCheck($event: Event) {
    $event.preventDefault();
    $event.stopImmediatePropagation();
  }

  addASI() {
    this.model.abilityScoreIncrease = [
      ...this.model.abilityScoreIncrease,
      [availableAbilities[0], 0],
    ];
  }

  deleteASIs(selectedASIs: MatListOption[]) {
    selectedASIs.forEach((asi) => {
      let index = this.model.abilityScoreIncrease.indexOf(asi.value);
      console.log(asi.value);
      console.log(this.model.abilityScoreIncrease);
      console.log(index);
      if (index !== -1) {
        this.model.abilityScoreIncrease.splice(index, 1);
      }
    });
  }

  remove() {
    this.deleteRace.emit(this.model);
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
