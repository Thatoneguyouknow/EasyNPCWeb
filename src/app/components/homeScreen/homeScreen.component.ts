import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as Stat from 'src/app/constants';
import { npcClass, npcRace, npc } from 'src/app/models';

const CLASS_MOC_DATA: npcClass[] = [
  {
    classId: 1,
    className: 'Ligma',
    userCreated: false,
    hitDie: 4,
    statPriority: new Map(),
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
  classDataSource = new MatTableDataSource<npcClass>(CLASS_MOC_DATA);
  raceDataSource = new MatTableDataSource<npcRace>(RACE_MOC_DATA);

  constructor() {}

  ngAfterViewInit(): void {}

  public convertToStatName(stat: number): string {
    return Stat.abbreviatedStatNames.get(stat) || "None";
  }
}
