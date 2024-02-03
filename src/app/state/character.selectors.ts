import { createFeatureSelector, createSelector } from '@ngrx/store';
import { npc } from '../models';

export const selectCharacters =
  createFeatureSelector<ReadonlyArray<npc>>('characters');

export const selectCharacterListState =
  createFeatureSelector<ReadonlyArray<number>>('characterList');

export const selectCharacterList = createSelector(
  selectCharacters,
  selectCharacterListState,
  (characters, characterList) => {
    return characterList.map((id) =>
      characters.find((character) => character.charId === id)
    );
  }
);
