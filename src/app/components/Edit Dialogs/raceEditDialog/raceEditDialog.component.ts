import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { npcRace } from 'src/app/models';
import { availableAbilities } from 'src/app/constants';

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

  changeAsi($event: Event) {
    console.log($event);
  }

  remove() {
    this.deleteRace.emit(this.model);
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
