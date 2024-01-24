import {
  AfterViewInit,
  Component,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as Stat from 'src/app/constants';
import { npcClass, npcRace, npc } from 'src/app/models';
import { npcService } from 'src/app/api/npc.service';
import { CharEditDialogComponent } from '../Edit Dialogs/charEditDialog/charEditDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ClassEditDialogComponent } from '../Edit Dialogs/classEditDialog/classEditDialog.component';
import { Observable, of, Subscription } from 'rxjs';
import { UntypedFormBuilder } from '@angular/forms';
import { NewClassDialogComponent } from '../New Dialogs/newClassDialog/newClassDialog.component';
import { findLargestNumber } from 'src/app/supporting methods/mathOperations';
import { RaceEditDialogComponent } from '../Edit Dialogs/raceEditDialog/raceEditDialog.component';
import { NewRaceDialogComponent } from '../New Dialogs/newRaceDialog/newRaceDialog.component';
import { NewCharDialogComponent } from '../New Dialogs/newCharacterDialog/newCharacterDialog.component';
import { ObserversModule } from '@angular/cdk/observers';

const CLASS_MOC_DATA: npcClass[] = [
  {
    id: 1,
    userId: 100,
    name: 'Ligma',
    userCreated: false,
    hitDie: Stat.availableHitDie.filter((hitdie) => hitdie.value == 4)[0],
    statPriority: Stat.availableAbilities,
  },
];

const RACE_MOC_DATA: npcRace[] = [
  {
    raceId: 1,
    raceName: 'Sugma',
    alignmentSkew: 0,
    heightRange: [4, 5],
    weightRange: [100, 350],
    ageRange: [10, 100],
    // ASI: [Stat.availableAbilities[0]],
    asiRaw: [0, 1, 2],
    asivRaw: [1, 1, 1],
    abilityScoreIncrease: [
      [Stat.availableAbilities[0], 1],
      [Stat.availableAbilities[0], 1],
      [Stat.availableAbilities[0], 1],
    ],
  },
];

const CHAR_MOC_DATA: npc[] = [
  {
    charId: 1,
    charName: 'Jeffery',
    charRace: RACE_MOC_DATA[0],
    charClass: CLASS_MOC_DATA[0],
    alignment: 8,
    personalityTraits: ['stupid'],
    level: 1,
    stats: [
      { stat: Stat.availableAbilities[0], statValue: 15, statModifier: 3 },
      { stat: Stat.availableAbilities[1], statValue: 14, statModifier: 3 },
      { stat: Stat.availableAbilities[2], statValue: 13, statModifier: 3 },
      { stat: Stat.availableAbilities[3], statValue: 12, statModifier: 3 },
      { stat: Stat.availableAbilities[4], statValue: 11, statModifier: 3 },
      { stat: Stat.availableAbilities[5], statValue: 10, statModifier: 3 },
    ],
    hitPoints: 12,
    armorClass: 6,
    speed: 100,
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './homeScreen.component.html',
  styleUrls: ['./homeScreen.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class homeScreenComponent implements AfterViewInit {
  title = 'EasyNPCHome';
  classSubscriptions: Subscription = Subscription.EMPTY;
  raceSubscriptions: Subscription = Subscription.EMPTY;
  characterSubscriptions: Subscription = Subscription.EMPTY;
  characterTableColumns: string[] = ['name', 'race', 'class'];
  classTableColumns: string[] = ['name', 'hitDie', 'userCreated'];
  raceTableColumns: string[] = ['name', 'asi', 'userCreated'];
  characterDataSource = new MatTableDataSource<npc>();
  characterData$: Observable<npc[]>;
  characterData: npc[] = [];
  classDataSource = new MatTableDataSource<npcClass>();
  classData$: Observable<npcClass[]>;
  classData: npcClass[] = [];
  raceDataSource = new MatTableDataSource<npcRace>();
  raceData$: Observable<npcRace[]>;
  raceData: npcRace[] = [];

  constructor(private api: npcService, private dialog: MatDialog) {
    this.classData$ = this.api.getAllClasses();
    this.raceData$ = this.api.getAllRaces();
    // TODO
    this.characterData$ = of(CHAR_MOC_DATA);
  }

  ngAfterViewInit(): void {
    this.classSubscriptions = this.classData$.subscribe((npcClass) => {
      this.classDataSource.data = npcClass;
      this.classData = [...npcClass];
    });
    this.raceSubscriptions = this.raceData$.subscribe((npcRace) => {
      this.raceDataSource.data = npcRace;
      this.raceData = [...npcRace];
    });
    this.characterSubscriptions = this.characterData$.subscribe((npc) => {
      this.characterDataSource.data = npc;
      this.characterData = [...npc];
    });
  }

  public classButtonTest() {
    this.api.getAllClasses().subscribe((response) => {
      console.log(response);
    });
  }

  public newClass() {
    let next_ID: number =
      this.classData
        .map((npcClass) => npcClass.id)
        .reduce((a, b) => Math.max(a, b)) + 1;

    let dialogRef = this.dialog.open(NewClassDialogComponent, {
      height: '400px',
      width: '600px',
      data: next_ID,
    });

    dialogRef.afterClosed().subscribe((result: npcClass) => {
      if (result != undefined) {
        this.classData.push(result);
      }
      this.classData$ = of(this.classData);
      this.classSubscriptions.unsubscribe();

      this.classSubscriptions = this.classData$.subscribe((npcClass) => {
        this.classDataSource.data = npcClass;
        this.classData = [...npcClass];
      });
    });
  }

  public newRace() {
    let next_ID: number =
      this.raceData
        .map((npcRace) => npcRace.raceId)
        .reduce((a, b) => Math.max(a, b)) + 1;

    let dialogRef = this.dialog.open(NewRaceDialogComponent, {
      height: '400px',
      width: '600px',
      data: next_ID,
    });

    dialogRef.afterClosed().subscribe((result: npcRace) => {
      if (result != undefined) {
        this.raceData.push(result);
      }
      this.raceData$ = of(this.raceData);
      this.raceSubscriptions.unsubscribe();

      this.raceSubscriptions = this.raceData$.subscribe((npcRace) => {
        this.raceDataSource.data = npcRace;
        this.raceData = [...npcRace];
      });
    });
  }

  public newCharacter() {
    let next_ID: number =
      this.characterData
        .map((npc) => npc.charId)
        .reduce((a, b) => Math.max(a, b)) + 1;
    // Need to create deep copies here, so that the character references its own version of the race, not the global race object
    const classDataCopy: npcClass[] = [];
    this.classData.forEach((val) => classDataCopy.push(Object.assign({}, val)));
    const raceDataCopy: npcRace[] = [];
    this.raceData.forEach((val) => raceDataCopy.push(Object.assign({}, val)));

    let dialogRef = this.dialog.open(NewCharDialogComponent, {
      height: '800px',
      width: '600px',
      data: { next_ID, classData: classDataCopy, raceData: raceDataCopy },
    });

    dialogRef.afterClosed().subscribe((result: npc) => {
      if (result != undefined) {
        console.log(result);
      }
    });
  }

  public viewClass(classToEdit: npcClass) {
    let dialogRef = this.dialog.open(ClassEditDialogComponent, {
      height: '400px',
      width: '600px',
      data: classToEdit,
    });

    dialogRef.afterClosed().subscribe((result: npcClass) => {
      if (result != undefined) {
        let index = this.classData.findIndex(
          (npcClass) => npcClass.id === result.id
        );
        this.classData[index] = result;
      }
      this.classData$ = of(this.classData);

      // TODO: Backend save call

      this.classSubscriptions.unsubscribe();

      this.classSubscriptions = this.classData$.subscribe((npcClass) => {
        this.classDataSource.data = npcClass;
        this.classData = [...npcClass];
      });
    });
  }

  public viewRace(raceToEdit: npcRace) {
    let dialogRef = this.dialog.open(RaceEditDialogComponent, {
      height: '400px',
      width: '600px',
      data: raceToEdit,
    });

    dialogRef.afterClosed().subscribe((result: npcRace) => {
      if (result != undefined) {
        console.log(result);
        let index = this.raceData.findIndex(
          (npcRace) => npcRace.raceId === result.raceId
        );
        this.raceData[index] = result;
      }
      this.raceData$ = of(this.raceData);

      // TODO: Backend save call

      this.raceSubscriptions.unsubscribe();

      this.raceSubscriptions = this.raceData$.subscribe((npcRace) => {
        this.raceDataSource.data = npcRace;
        this.raceData = [...npcRace];
      });
    });
  }

  public viewCharacter(charToEdit: npc) {
    // Need to create deep copies here, so that the character references its own version of the race, not the global race object
    const classDataCopy: npcClass[] = [];
    this.classData.forEach((val) => classDataCopy.push(Object.assign({}, val)));
    const raceDataCopy: npcRace[] = [];
    this.raceData.forEach((val) => raceDataCopy.push(Object.assign({}, val)));

    // REMOVE THIS after mock data is not necessary
    if (
      this.classData.find(
        (npcClass) => npcClass.name == charToEdit.charClass.name
      ) == undefined
    ) {
      charToEdit.charClass = classDataCopy[0];
    }
    charToEdit.charRace = raceDataCopy[0];

    let dialogRef = this.dialog.open(CharEditDialogComponent, {
      height: '800px',
      width: '600px',
      data: { charToEdit, classData: classDataCopy, raceData: raceDataCopy },
    });

    dialogRef.afterClosed().subscribe((result: npc) => {
      if (result != undefined) {
        console.log(result);
        let index = this.characterData.findIndex(
          (npcChar) => npcChar.charId === result.charId
        );
        this.characterData[index] = result;
      }
      this.characterData$ = of(this.characterData);

      this.characterSubscriptions.unsubscribe();

      this.characterSubscriptions = this.characterData$.subscribe((npcChar) => {
        this.characterDataSource.data = npcChar;
        this.characterData = [...npcChar];
      });
    });
  }
}
