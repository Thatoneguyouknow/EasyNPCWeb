import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { npcClass } from 'src/app/models';
import { availableAbilities, availableHitDie } from 'src/app/constants';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'new-class-dialog',
  templateUrl: './newClassDialog.component.html',
  styleUrls: ['./newClassDialog.component.scss'],
})
export class NewClassDialogComponent {
  model: npcClass = {} as npcClass;
  availableHitDie = availableHitDie;

  //TODO Add Validators

  constructor(
    public dialogRef: MatDialogRef<NewClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.model.statPriority = availableAbilities;
    this.model.userCreated = true;
    this.model.userId = 1;
    this.model.id = data;
    this.model.hitDie = availableHitDie[0];
  }

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
