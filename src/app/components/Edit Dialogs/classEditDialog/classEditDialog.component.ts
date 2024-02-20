import { Component, EventEmitter, Inject, Output } from '@angular/core';
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
  @Output() deleteClass = new EventEmitter<npcClass>();
  model = Object.assign({}, this.data);
  availableHitDie = availableHitDie;

  //TODO Add Validators
  
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

  remove() {
    // First need to validate that the class isn't being used by any characters
    this.deleteClass.emit(this.model);
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
