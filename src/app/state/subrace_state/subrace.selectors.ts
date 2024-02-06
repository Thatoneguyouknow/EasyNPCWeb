import { createFeatureSelector } from '@ngrx/store';
import { npcSubrace } from 'src/app/models';

export const selectSubraces =
  createFeatureSelector<ReadonlyArray<npcSubrace>>('subraces');
