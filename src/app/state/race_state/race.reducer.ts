import { createReducer, on } from '@ngrx/store';
import { npcRace } from '../../models';
import { RaceActions, RaceApiActions } from './race.actions';

export const initialState: ReadonlyArray<npcRace> = [];

export const racesReducer = createReducer(
  initialState,
  on(RaceApiActions.retrievedRaceList, (_state, { races }) => races),
  on(RaceActions.editRace, (state, { toEdit }) => {
    return [toEdit, ...state.filter((id) => id.raceId !== toEdit.raceId)];
  }),
  on(RaceActions.addRace, (state, { toAdd }) => {
    if (state.indexOf(toAdd) > -1) return state;
    return [...state, toAdd];
  }),
  on(RaceActions.removeRace, (state, { toRemove }) =>
    state.filter((race) => race.raceId !== toRemove.raceId)
  )
);
