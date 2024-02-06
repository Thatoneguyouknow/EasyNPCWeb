import { createFeatureSelector, createSelector } from '@ngrx/store';
import { npcRace } from '../../models';

export const selectRaces =
  createFeatureSelector<ReadonlyArray<npcRace>>('races');