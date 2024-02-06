import { createFeatureSelector, createSelector } from '@ngrx/store';
import { npcClass } from '../../models';

export const selectClasses =
  createFeatureSelector<ReadonlyArray<npcClass>>('classes');
