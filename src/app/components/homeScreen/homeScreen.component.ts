import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  npcClass,
  npcRace,
  npcSubrace,
  npc,
  raceNameScheme,
} from 'src/app/models';
import { npcService } from 'src/app/api/npc.service';
import { CharEditDialogComponent } from '../Edit Dialogs/charEditDialog/charEditDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ClassEditDialogComponent } from '../Edit Dialogs/classEditDialog/classEditDialog.component';
import { Observable, of, Subject, Subscription, takeUntil } from 'rxjs';
import { NewClassDialogComponent } from '../New Dialogs/newClassDialog/newClassDialog.component';
import { RaceEditDialogComponent } from '../Edit Dialogs/raceEditDialog/raceEditDialog.component';
import { NewRaceDialogComponent } from '../New Dialogs/newRaceDialog/newRaceDialog.component';
import { NewCharDialogComponent } from '../New Dialogs/newCharacterDialog/newCharacterDialog.component';
import { generateCharacter } from 'src/app/supporting methods/generateCharacter';
import { Store } from '@ngrx/store';
import { selectClasses } from 'src/app/state/class_state/class.selectors';
import {
  ClassActions,
  ClassApiActions,
} from 'src/app/state/class_state/class.actions';
import { selectRaces } from 'src/app/state/race_state/race.selectors';
import {
  RaceActions,
  RaceApiActions,
} from 'src/app/state/race_state/race.actions';
import {
  CharacterActions,
  CharacterApiActions,
} from 'src/app/state/character_state/character.actions';
import { selectCharacters } from 'src/app/state/character_state/character.selectors';
import { selectSubraces } from 'src/app/state/subrace_state/subrace.selectors';
import {
  SubraceActions,
  SubraceApiActions,
} from 'src/app/state/subrace_state/subrace.actions';
import { selectNames } from 'src/app/state/name_state/name.selectors';
import { NameApiActions } from 'src/app/state/name_state/name.actions';

// const CLASS_MOC_DATA: npcClass[] = [
//   {
//     id: 1,
//     userId: 100,
//     name: 'Ligma',
//     userCreated: false,
//     hitDie: Stat.availableHitDie.filter((hitdie) => hitdie.value == 4)[0],
//     statPriority: Stat.availableAbilities,
//   },
// ];

// const RACE_MOC_DATA: npcRace[] = [
//   {
//     raceId: 1,
//     raceName: 'Sugma',
//     alignmentSkew: 0,
//     heightRange: [4, 5],
//     weightRange: [100, 350],
//     ageRange: [10, 100],
//     // ASI: [Stat.availableAbilities[0]],
//     asiRaw: [0, 1, 2],
//     asivRaw: [1, 1, 1],
//     abilityScoreIncrease: [
//       [Stat.availableAbilities[0], 1],
//       [Stat.availableAbilities[0], 1],
//       [Stat.availableAbilities[0], 1],
//     ],
//     subraces: [1],
//     nameType: 1,
//   },
// ];

// const CHAR_MOC_DATA: npc[] = [
//   {
//     charId: 1,
//     charName: 'Jeffery',
//     charRace: RACE_MOC_DATA[0],
//     charClass: CLASS_MOC_DATA[0],
//     alignment: 8,
//     personalityTraits: ['stupid'],
//     level: 1,
//     stats: [
//       { stat: Stat.availableAbilities[0], statValue: 15, statModifier: 3 },
//       { stat: Stat.availableAbilities[1], statValue: 14, statModifier: 3 },
//       { stat: Stat.availableAbilities[2], statValue: 13, statModifier: 3 },
//       { stat: Stat.availableAbilities[3], statValue: 12, statModifier: 3 },
//       { stat: Stat.availableAbilities[4], statValue: 11, statModifier: 3 },
//       { stat: Stat.availableAbilities[5], statValue: 10, statModifier: 3 },
//     ],
//     hitPoints: 12,
//     age: 50,
//     height: [5, 11],
//     weight: 120,
//   },
// ];

@Component({
  selector: 'app-root',
  templateUrl: './homeScreen.component.html',
  styleUrls: ['./homeScreen.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class homeScreenComponent implements AfterViewInit {
  title = 'EasyNPCHome';
  subraceSubscriptions: Subscription = Subscription.EMPTY;
  characterData: npc[] = [];
  classes$: Observable<readonly npcClass[]> = this.store.select(selectClasses);
  races$: Observable<readonly npcRace[]> = this.store.select(selectRaces);
  characters$: Observable<readonly npc[]> = this.store.select(selectCharacters);
  classData: npcClass[] = [];
  raceData: npcRace[] = [];
  subraces$: Observable<readonly npcSubrace[]> =
    this.store.select(selectSubraces);
  subraceData: npcSubrace[] = [];
  names$: Observable<readonly raceNameScheme[]> =
    this.store.select(selectNames);
  nameData: raceNameScheme[] = [];

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private api: npcService,
    private dialog: MatDialog,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getAllData();
  }

  ngAfterViewInit(): void {
    this.classes$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (classes) => {
        this.classData = [...classes];
      },
    });

    this.races$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (races) => {
        this.raceData = [...races];
      },
    });

    this.characters$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (characters) => {
        this.characterData = [...characters];
      },
    });

    this.subraces$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (subraces) => {
        this.subraceData = [...subraces];
      },
    });

    this.names$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (names) => {
        this.nameData = [...names];
      },
    });
  }

  async getAllData() {
    this.api.getAllNameSchemes().subscribe({
      next: (names) => {
        this.store.dispatch(NameApiActions.retrievedNameList({ names }));
      },
    });

    (await this.api.getAllClasses()).subscribe({
      next: (classes) => {
        this.store.dispatch(ClassApiActions.retrievedClassList({ classes }));
      },
      error: (e) => console.error(e),
    });

    (await this.api.getAllRaces()).subscribe({
      next: (races) => {
        this.store.dispatch(RaceApiActions.retrievedRaceList({ races }));
      },
      error: (e) => console.error(e),
    });

    (await this.api.getAllSubraces()).subscribe({
      next: (subraces) => {
        this.store.dispatch(
          SubraceApiActions.retrievedSubraceList({ subraces })
        );
      },
    });

    (await this.api.getAllCharacters()).subscribe({
      next: (characters) => {
        this.store.dispatch(
          CharacterApiActions.retrievedCharacterList({ characters })
        );
      },
      error: (e) => console.error(e),
    });
  }

  public newClass() {
    let next_ID: number = 0;
    try {
      next_ID =
        this.classData
          .map((npcClass) => npcClass.id)
          .reduce((a, b) => Math.max(a, b)) + 1;
    } catch (error) {}

    let dialogRef = this.dialog.open(NewClassDialogComponent, {
      height: '400px',
      width: '600px',
      data: next_ID,
    });

    dialogRef.afterClosed().subscribe((result: npcClass) => {
      if (result != undefined) {
        this.store.dispatch(ClassActions.addClass({ toAdd: result }));
      }
    });
  }

  public newRace() {
    let next_ID: number = 0;
    try {
      next_ID =
        this.raceData
          .map((npcRace) => npcRace.raceId)
          .reduce((a, b) => Math.max(a, b)) + 1;
    } catch (error) {}

    let dialogRef = this.dialog.open(NewRaceDialogComponent, {
      height: '400px',
      width: '600px',
      data: next_ID,
    });

    dialogRef.afterClosed().subscribe((result: npcRace) => {
      if (result != undefined) {
        this.store.dispatch(RaceActions.addRace({ toAdd: result }));
      }
    });
  }

  public newCharacter() {
    let nextID: number = 0;
    try {
      nextID =
        this.characterData
          .map((npc) => npc.charId)
          .reduce((a, b) => Math.max(a, b)) + 1;
    } catch (error) {}

    let dialogRef = this.dialog.open(NewCharDialogComponent, {
      height: '800px',
      width: '600px',
      data: { nextID, classData: this.classData, raceData: this.raceData },
    });

    dialogRef.afterClosed().subscribe((result: npc) => {
      if (result != undefined) {
        this.store.dispatch(CharacterActions.addCharacter({ toAdd: result }));
      }
    });
  }

  public generateNewCharacter() {
    let nextID: number = 0;
    try {
      nextID =
        this.characterData
          .map((npc) => npc.charId)
          .reduce((a, b) => Math.max(a, b)) + 1;
    } catch (error) {}

    let character: npc = generateCharacter(
      this.raceData,
      this.classData,
      this.subraceData,
      this.nameData,
      nextID
    );
    this.store.dispatch(CharacterActions.addCharacter({ toAdd: character }));
  }

  public viewClass(classToEdit: npcClass) {
    let dialogRef = this.dialog.open(ClassEditDialogComponent, {
      height: '400px',
      width: '600px',
      data: classToEdit,
    });

    dialogRef.componentInstance.deleteClass.subscribe((result) => {
      this.store.dispatch(ClassActions.removeClass({ toRemove: result }));
    });

    dialogRef.afterClosed().subscribe((result: npcClass) => {
      if (result != undefined) {
        this.store.dispatch(ClassActions.editClass({ toEdit: result }));
      }
    });
  }

  public viewRace(raceToEdit: npcRace) {
    let dialogRef = this.dialog.open(RaceEditDialogComponent, {
      height: '400px',
      width: '600px',
      data: raceToEdit,
    });

    dialogRef.componentInstance.deleteRace.subscribe((result) => {
      this.store.dispatch(RaceActions.removeRace({ toRemove: result }));
    });

    dialogRef.afterClosed().subscribe((result: npcRace) => {
      if (result != undefined) {
        this.store.dispatch(RaceActions.editRace({ toEdit: result }));
      }
    });
  }

  public viewCharacter(charToEdit: npc) {
    let dialogRef = this.dialog.open(CharEditDialogComponent, {
      height: '800px',
      width: '600px',
      data: { charToEdit, classData: this.classData, raceData: this.raceData },
    });

    dialogRef.componentInstance.deleteCharacter.subscribe((result) => {
      this.store.dispatch(
        CharacterActions.removeCharacter({ toRemove: result })
      );
    });

    dialogRef.afterClosed().subscribe((result: npc) => {
      if (result != undefined) {
        this.store.dispatch(CharacterActions.editCharacter({ toEdit: result }));
      }
    });
  }

  ngOnDestory() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
