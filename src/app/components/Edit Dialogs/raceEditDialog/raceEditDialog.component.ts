import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { npcRace } from 'src/app/models';

@Component({
  selector: 'race-edit-dialog',
  templateUrl: './raceEditDialog.component.html',
  styleUrls: ['./raceEditDialog.component.scss'],
})
export class RaceEditDialogComponent {
  model = Object.assign({}, this.data);

  //TODO Add Validators
  
  constructor(
    public dialogRef: MatDialogRef<RaceEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: npcRace
  ) {}

  // TODO:
  // User should be able to edit name, height range, age range, weight range, asi stats and values

  closeDialog() {
    this.dialogRef.close();
  }
}
