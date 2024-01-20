import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { npc, npcRace, npcClass } from 'src/app/models';

@Component({
  selector: 'char-edit-dialog',
  templateUrl: './charEditDialog.component.html',
  styleUrls: ['./charEditDialog.component.scss'],
})
export class CharEditDialogComponent {
    model = Object.assign({}, this.data.charToEdit);

  constructor(
    public dialogRef: MatDialogRef<CharEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {charToEdit: npc, raceData: npcRace[], classData: npcClass[]}
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
