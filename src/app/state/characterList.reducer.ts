import { createReducer, on } from '@ngrx/store';
import { CharacterActions } from './character.actions';

export const initialState: ReadonlyArray<number> = [];

export const characterListReducer = createReducer(
  initialState,
  on(CharacterActions.removeCharacter, (state, { characterId }) =>
    state.filter((id) => id !== characterId)
  ),
  on(CharacterActions.addCharacter, (state, { characterId }) => {
    if (state.indexOf(characterId) > -1) return state;
    return [...state, characterId];
  })
);
