import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { npcRace } from 'src/app/models';

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
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
