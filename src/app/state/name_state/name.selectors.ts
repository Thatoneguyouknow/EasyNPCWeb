import { createFeatureSelector } from '@ngrx/store';
import { raceNameScheme } from 'src/app/models';

export const selectNames =
  createFeatureSelector<ReadonlyArray<raceNameScheme>>('names');
