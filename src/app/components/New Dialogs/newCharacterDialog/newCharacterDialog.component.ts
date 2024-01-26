import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { availableAbilities } from 'src/app/constants';
import { npcClass, npcRace, npc } from 'src/app/models';

@Component({
  selector: 'new-char-dialog',
  templateUrl: './newCharacterDialog.component.html',
  styleUrls: ['./newCharacterDialog.component.scss'],
})
export class NewCharDialogComponent {
  model: npc = {} as npc;
  classData: npcClass[] = [];
  raceData: npcRace[] = [];
  newTrait: string = '';
  defaultStats = [
    { stat: availableAbilities[0], statValue: 10, statModifier: 0 },
    { stat: availableAbilities[1], statValue: 10, statModifier: 0 },
    { stat: availableAbilities[2], statValue: 10, statModifier: 0 },
    { stat: availableAbilities[3], statValue: 10, statModifier: 0 },
    { stat: availableAbilities[4], statValue: 10, statModifier: 0 },
    { stat: availableAbilities[5], statValue: 10, statModifier: 0 },
  ];

  constructor(
    public dialogRef: MatDialogRef<NewCharDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { nextID: number; raceData: npcRace[]; classData: npcClass[] }
  ) {
    this.classData = this.data.classData;
    this.raceData = this.data.raceData;
    this.model.stats = this.defaultStats;
    this.model.personalityTraits = [];
  }

  addTrait(trait: string) {
    this.model.personalityTraits.push(trait);
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

  closeDialog() {
    this.dialogRef.close();
  }
}
