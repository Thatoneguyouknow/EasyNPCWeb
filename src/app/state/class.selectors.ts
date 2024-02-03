import { createFeatureSelector, createSelector } from '@ngrx/store';
import { npcClass } from '../models';

export const selectClasses =
  createFeatureSelector<ReadonlyArray<npcClass>>('classes');

export const selectClassListState =
  createFeatureSelector<ReadonlyArray<number>>('classList');

export const selectClassList = createSelector(
  selectClasses,
  selectClassListState,
  (classes, classList) => {
    return classList.map((id) => classes.find((cClass) => cClass.id === id)!);
  }
);
