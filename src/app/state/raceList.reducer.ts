import { createReducer, on } from '@ngrx/store';
import { RaceActions } from './race.actions';
import { race } from 'rxjs';

export const initialState: ReadonlyArray<number> = [];

export const raceListReducer = createReducer(
  initialState,
  on(RaceActions.removeRace, (state, { raceId }) =>
    state.filter((id) => id !== raceId)
  ),
  on(RaceActions.addRace, (state, { raceId }) => {
    if (state.indexOf(raceId) > -1) return state;
    return [...state, raceId];
  })
);
