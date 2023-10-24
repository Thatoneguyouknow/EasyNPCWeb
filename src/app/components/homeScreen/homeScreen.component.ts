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
    asiPrimary: [Stat.Stats.STRENGTH, 1],
    asiSecondary: [Stat.Stats.DEXTERITY, 2],
    ageRange: [10, 100],
    nameType: 10,
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
  subscriptions: Subscription = Subscription.EMPTY;
  raceDataSource = new MatTableDataSource<npcRace>(RACE_MOC_DATA);

  constructor(private api: npcService, private dialog: MatDialog) {
    this.classData$ = this.api.getAllClasses();
  }

  ngAfterViewInit(): void {
    this.subscriptions = this.classData$.subscribe((npcClass) => {
      this.classDataSource.data = npcClass;
      this.classData = [...npcClass];
    });
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
    let next_ID: number = this.classData.map(npcClass => npcClass.id).reduce((a, b) => Math.max(a, b));

    let dialogRef = this.dialog.open(NewClassDialogComponent, {
      height: '400px',
      width: '600px',
      data: next_ID, 
    });

    dialogRef.afterClosed().subscribe((result: npcClass) => {
      if (result != undefined) {
        console.log(result);
        // let index = this.classData.findIndex(
        //   (npcClass) => npcClass.id === result.id
        // );
        // this.classData[index] = result;
      }
      // this.classData$ = of(this.classData);

      // // TODO: Backend save call

      // this.subscriptions.unsubscribe();

      // this.subscriptions = this.classData$.subscribe((npcClass) => {
      //   this.classDataSource.data = npcClass;
      //   this.classData = [...npcClass];
      // });
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

      this.subscriptions.unsubscribe();

      this.subscriptions = this.classData$.subscribe((npcClass) => {
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
