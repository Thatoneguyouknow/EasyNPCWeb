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
import { selectClasses } from 'src/app/state/class.selectors';
import { ClassActions, ClassApiActions } from 'src/app/state/class.actions';
import { selectRaces } from 'src/app/state/race.selectors';
import { RaceActions, RaceApiActions } from 'src/app/state/race.actions';
import {
  CharacterActions,
  CharacterApiActions,
} from 'src/app/state/character.actions';
import { selectCharacters } from 'src/app/state/character.selectors';

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
  subraceData$: Observable<npcSubrace[]> = of([]);
  subraceData: npcSubrace[] = [];
  nameData$: Observable<raceNameScheme[]> = of([]);
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
  }

  async getAllData() {
    this.nameData$ = this.api.getAllNameSchemes();

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

    this.subraceData$ = await this.api.getAllSubraces();

    this.subraceSubscriptions = this.subraceData$.subscribe({
      next: (data) => {
        this.subraceData = data;
      },
      error: (e) => console.error(e),
    });

    (await this.api.getAllCharacters()).subscribe({
      next: (characters) => {
        this.store.dispatch(
          CharacterApiActions.retrievedCharacterList({ characters })
        );
        console.log(characters);
      },
      error: (e) => console.error(e),
    });

    this.nameData$.subscribe({
      next: (data) => {
        this.nameData = data;
      },
      error: (e) => console.error(e),
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
        this.store.dispatch(ClassActions.addClass({ toAdd: result }));
      }
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
        this.store.dispatch(RaceActions.addRace({ toAdd: result }));
      }
    });
  }

  public newCharacter() {
    let next_ID: number =
      this.characterData
        .map((npc) => npc.charId)
        .reduce((a, b) => Math.max(a, b)) + 1;

    let dialogRef = this.dialog.open(NewCharDialogComponent, {
      height: '800px',
      width: '600px',
      data: { next_ID, classData: this.classData, raceData: this.raceData },
    });

    dialogRef.afterClosed().subscribe((result: npc) => {
      if (result != undefined) {
        this.store.dispatch(CharacterActions.addCharacter({ toAdd: result }));
      }
    });
  }

  public generateNewCharacter() {
    let nextID: number =
      this.characterData
        .map((npc) => npc.charId)
        .reduce((a, b) => Math.max(a, b)) + 1;

    let character: npc = generateCharacter(
      this.raceData,
      this.classData,
      this.subraceData,
      this.nameData,
      nextID
    );
    console.log(character);
    this.store.dispatch(CharacterActions.addCharacter({ toAdd: character }));
  }

  public viewClass(classToEdit: npcClass) {
    let dialogRef = this.dialog.open(ClassEditDialogComponent, {
      height: '400px',
      width: '600px',
      data: classToEdit,
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
