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
import { CharEditDialogComponent } from '../charEditDialog/charEditDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ClassEditDialogComponent } from '../classEditDialog/classEditDialog.component';
import { Observable, of, Subscription } from 'rxjs';
import { UntypedFormBuilder } from '@angular/forms';
import { NewClassDialogComponent } from '../newClassDialog/newClassDialog.component';
import { findLargestNumber } from 'src/app/supporting methods/mathOperations';

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
    ASI: [0, 1, 2],
    ASIV: [1, 1, 1],
    abilityScoreIncrease: [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
  },
];

const CHAR_MOC_DATA: npc[] = [
  {
    charId: 1,
    charName: 'Jeffery',
    charRace: RACE_MOC_DATA[0],
    charClass: CLASS_MOC_DATA[0],
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
  characterTableColumns: string[] = ['name', 'race', 'class'];
  classTableColumns: string[] = ['name', 'hitDie', 'userCreated'];
  raceTableColumns: string[] = [
    'name',
    'asiPrimary',
    'asiSecondary',
    'ageRange',
  ];
  characterDataSource = new MatTableDataSource<npc>(CHAR_MOC_DATA);
  classDataSource = new MatTableDataSource<npcClass>();
  classData$: Observable<npcClass[]>;
  classData: npcClass[] = [];
  raceDataSource = new MatTableDataSource<npcRace>(RACE_MOC_DATA);
  raceData$: Observable<npcRace[]>;
  raceData: npcRace[] = [];

  constructor(private api: npcService, private dialog: MatDialog) {
    this.classData$ = this.api.getAllClasses();
    this.raceData$ = this.api.getAllRaces();
  }

  ngAfterViewInit(): void {
    this.classSubscriptions = this.classData$.subscribe((npcClass) => {
      this.classDataSource.data = npcClass;
      this.classData = [...npcClass];
    })
    this.raceSubscriptions = this.raceData$.subscribe((npcRace) => {
      // this.raceDataSource.data = npcRace;
      this.raceData = [...npcRace];
      console.log(npcRace);
    })
  }

  public convertToStatName(stat: number): string {
    return Stat.abbreviatedStatNames.get(stat) || 'None';
  }

  public classButtonTest() {
    this.api.getAllClasses().subscribe((response) => {
      console.log(response);
    });
  }

  public newClass() {
    let next_ID: number = this.classData
      .map((npcClass) => npcClass.id)
      .reduce((a, b) => Math.max(a, b));

    let dialogRef = this.dialog.open(NewClassDialogComponent, {
      height: '400px',
      width: '600px',
      data: next_ID,
    });

    dialogRef.afterClosed().subscribe((result: npcClass) => {
      if (result != undefined) {
        this.classData.push(result);
        console.log(result);
      }
      this.classData$ = of(this.classData);

      // // TODO: Backend save call

      this.classSubscriptions.unsubscribe();

      this.classSubscriptions = this.classData$.subscribe((npcClass) => {
        this.classDataSource.data = npcClass;
        this.classData = [...npcClass];
      });
    });
  }

  public viewClass(classID: number) {
    let viewClassData = this.classDataSource.data.find(
      (npcClass) => npcClass.id === classID
    );
    let dialogRef = this.dialog.open(ClassEditDialogComponent, {
      height: '400px',
      width: '600px',
      data: viewClassData,
    });

    dialogRef.afterClosed().subscribe((result: npcClass) => {
      if (result != undefined) {
        console.log(result);
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

  public viewCharacter(charID: number) {
    let charData = this.characterDataSource.data.find(
      (npc) => npc.charId === charID
    );
    let dialogRef = this.dialog.open(CharEditDialogComponent, {
      height: '400px',
      width: '600px',
      data: charData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed');
      console.log(result);
    });
  }
}
