import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { npcClass } from 'src/app/models';
import { availableHitDie } from 'src/app/constants';

@Component({
  selector: 'class-edit-dialog',
  templateUrl: './classEditDialog.component.html',
  styleUrls: ['./classEditDialog.component.scss'],
})
export class ClassEditDialogComponent {
  nameControl = new FormControl('');
  model = Object.assign({}, this.data);
  availableHitDie = availableHitDie;

  constructor(
    public dialogRef: MatDialogRef<ClassEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: npcClass,
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
