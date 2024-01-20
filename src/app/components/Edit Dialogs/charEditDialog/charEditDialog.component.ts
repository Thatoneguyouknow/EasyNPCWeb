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
    classData: npcClass[] = [];
    raceData: npcRace[] = [];

  constructor(
    public dialogRef: MatDialogRef<CharEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {charToEdit: npc, raceData: npcRace[], classData: npcClass[]}
  ) {
    this.classData = this.data.classData;
    this.raceData = this.data.raceData;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
