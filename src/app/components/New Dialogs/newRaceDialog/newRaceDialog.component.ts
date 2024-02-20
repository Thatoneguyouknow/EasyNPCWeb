import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { npcRace } from 'src/app/models';
import { StatTypes, availableAbilities } from 'src/app/constants';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'new-race-dialog',
  templateUrl: './newRaceDialog.component.html',
  styleUrls: ['./newRaceDialog.component.scss'],
})
export class NewRaceDialogComponent {
  model: npcRace = {} as npcRace;

  constructor(
    public dialogRef: MatDialogRef<NewRaceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    // this.model.userCreated = true;
    // this.model.userId = 1;
    this.model.raceId = data;
    this.model.ageRange = [0, 0];
    this.model.heightRange = [0, 0];
    this.model.weightRange = [0, 0];
    this.model.abilityScoreIncrease = [];
  }

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

  closeDialog() {
    this.dialogRef.close();
  }
}
