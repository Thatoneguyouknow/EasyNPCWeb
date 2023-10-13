import { AfterViewInit, Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as Stat from 'src/app/constants';
import { npcClass, npcRace, npc } from 'src/app/models';
import { npcService } from 'src/app/api/npc.service';
import { CharEditDialogComponent } from '../charEditDialog/charEditDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ClassEditDialogComponent } from '../classEditDialog/classEditDialog.component';

const CLASS_MOC_DATA: npcClass[] = [
  {
    id: 1,
    userId: 100, 
    name: 'Ligma',
    userCreated: false,
    hitDie: 4,
    statPriority: [1, 2, 3, 4, 5, 6],
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
  raceDataSource = new MatTableDataSource<npcRace>(RACE_MOC_DATA);

  constructor(private api: npcService, private dialog: MatDialog) {}

  ngAfterViewInit(): void {
    this.api.getAllClasses().subscribe((response) => {
      this.classDataSource.data = response;
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

  }
  
  public viewClass(classID: number) {
    let classData = this.classDataSource.data.find(npcClass => npcClass.id === classID);
    let dialogRef = this.dialog.open(ClassEditDialogComponent, {
      height: '400px',
      width: '600px',
      data: classData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      console.log(result);
    });
  }

  public viewCharacter(charID: number) {
    let charData = this.characterDataSource.data.find(npc => npc.charId === charID);
    let dialogRef = this.dialog.open(CharEditDialogComponent, {
      height: '400px',
      width: '600px',
      data: charData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      console.log(result);
    })
  }
}
