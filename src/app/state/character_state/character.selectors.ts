import { createFeatureSelector, createSelector } from '@ngrx/store';
import { npc } from '../../models';

export const selectCharacters =
  createFeatureSelector<ReadonlyArray<npc>>('characters');
