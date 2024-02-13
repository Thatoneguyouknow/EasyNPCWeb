// Angular imports
import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';

// App imports
import { AppRoutingModule } from './app-routing.module';
import { homeScreenComponent } from './components/homeScreen/homeScreen.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClassEditDialogComponent } from './components/Edit Dialogs/classEditDialog/classEditDialog.component';
import { CharEditDialogComponent } from './components/Edit Dialogs/charEditDialog/charEditDialog.component';
import { NewClassDialogComponent } from './components/New Dialogs/newClassDialog/newClassDialog.component';
import { RaceEditDialogComponent } from './components/Edit Dialogs/raceEditDialog/raceEditDialog.component';
import { NewRaceDialogComponent } from './components/New Dialogs/newRaceDialog/newRaceDialog.component';
import { NewCharDialogComponent } from './components/New Dialogs/newCharacterDialog/newCharacterDialog.component';

// Ngrx imports
import { StoreModule } from '@ngrx/store';
import { classesReducer } from './state/class_state/class.reducer';
import { ClassCardComponent } from './components/homeScreen/classCard/classCard.component';
import { racesReducer } from './state/race_state/race.reducer';
import { RaceCardComponent } from './components/homeScreen/raceCard/raceCard.component';
import { CharacterCardComponent } from './components/homeScreen/characterCard/characterCard.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { charactersReducer } from './state/character_state/character.reducer';
import { EffectsModule } from '@ngrx/effects';
import { subracesReducer } from './state/subrace_state/subrace.reducer';
import { namesReducer } from './state/name_state/name.reducer';
import { DualNumberInput } from './custom-feilds/dual-number-input/dualNumberInput';
import { AsiInput } from './custom-feilds/asi/asiInput';

@NgModule({
  declarations: [
    homeScreenComponent,
    ClassEditDialogComponent,
    CharEditDialogComponent,
    RaceEditDialogComponent,
    NewCharDialogComponent,
    NewClassDialogComponent,
    NewRaceDialogComponent,
    ClassCardComponent,
    RaceCardComponent,
    CharacterCardComponent,
    DualNumberInput,
    AsiInput,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    DragDropModule,
    MatCardModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatDialogModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      classes: classesReducer,
      races: racesReducer,
      characters: charactersReducer,
      subraces: subracesReducer,
      names: namesReducer,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [homeScreenComponent],
})
export class AppModule {}
