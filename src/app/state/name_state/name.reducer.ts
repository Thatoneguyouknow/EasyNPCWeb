import { createReducer, on } from '@ngrx/store';
import { raceNameScheme } from 'src/app/models';
import { NameApiActions } from './name.actions';

export const initialState: ReadonlyArray<raceNameScheme> = [];

export const namesReducer = createReducer(
  initialState,
  on(NameApiActions.retrievedNameList, (_state, { names }) => names)
);
