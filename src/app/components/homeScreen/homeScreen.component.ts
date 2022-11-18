import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { npcClass, npcRace, npc } from 'src/app/models';

const CLASS_MOC_DATA: npcClass[] = [
  {
    classId: 1,
    className: 'Jeff',
    userCreated: false,
    hitDie: 4,
    statPriority: new Map(),
  },
];

const RACE_MOC_DATA: npcRace[] = [
  {
    raceId: 1,
    raceName: 'Jeff',
    asiPrimary: [1, 1],
    asiSecondary: [2, 2],
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
  styleUrls: ['./homeScreen.component.css'],
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
}
