import { createFeatureSelector, createSelector } from '@ngrx/store';
import { npcRace } from '../models';

export const selectRaces =
  createFeatureSelector<ReadonlyArray<npcRace>>('races');

export const selectRaceListState =
  createFeatureSelector<ReadonlyArray<number>>('raceList');

export const selectRaceList = createSelector(
  selectRaces,
  selectRaceListState,
  (races, raceList) => {
    return raceList.map((id) => races.find((race) => race.raceId === id)!);
  }
);
