import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { npcClass } from 'src/app/models';
import { availableHitDie } from 'src/app/constants';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'class-edit-dialog',
  templateUrl: './classEditDialog.component.html',
  styleUrls: ['./classEditDialog.component.scss'],
})
export class ClassEditDialogComponent {
  model = Object.assign({}, this.data);
  availableHitDie = availableHitDie;

  constructor(
    public dialogRef: MatDialogRef<ClassEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: npcClass
  ) {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.model.statPriority,
      event.previousIndex,
      event.currentIndex
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
