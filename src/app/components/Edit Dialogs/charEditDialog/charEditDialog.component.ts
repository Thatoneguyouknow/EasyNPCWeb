import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
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
  newTrait: string = '';
  selectedClass: npcClass;
  selectedRace: npcRace;

  constructor(
    public dialogRef: MatDialogRef<CharEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { charToEdit: npc; raceData: npcRace[]; classData: npcClass[] }
  ) {
    this.classData = this.data.classData;
    this.raceData = this.data.raceData;
    this.selectedClass = this.classData.find((val) => val.id === this.model.charClass) || this.classData[0];
    this.selectedRace = this.raceData.find((val) => val.raceId === this.model.charRace) || this.raceData[0];
  }

  addTrait(trait: string) {
    this.model.personalityTraits = [...this.model.personalityTraits, trait];
    this.newTrait = '';
  }

  deleteTraits(selectedTraits: MatListOption[]) {
    selectedTraits.forEach((trait) => {
      let index = this.model.personalityTraits.indexOf(trait.value);
      if (index !== -1) {
        this.model.personalityTraits.splice(index, 1);
      }
    });
  }

  classChanged(changedTo: npcClass) {
    this.model.charClass = changedTo.id;
  }

  raceChanged(changedTo: npcRace) {
    this.model.charRace = changedTo.raceId;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
