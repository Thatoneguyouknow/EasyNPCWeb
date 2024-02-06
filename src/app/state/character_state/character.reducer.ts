import { createReducer, on } from '@ngrx/store';
import { npc } from '../../models';
import { CharacterActions, CharacterApiActions } from './character.actions';

export const initialState: ReadonlyArray<npc> = [];

export const charactersReducer = createReducer(
  initialState,
  on(
    CharacterApiActions.retrievedCharacterList,
    (_state, { characters }) => characters
  ),
  on(CharacterActions.editCharacter, (state, { toEdit }) => {
    return [toEdit, ...state.filter((char) => char.charId !== toEdit.charId)];
  }),
  on(CharacterActions.addCharacter, (state, { toAdd }) => {
    if (state.indexOf(toAdd) > -1) return state;
    return [...state, toAdd];
  }),
  on(CharacterActions.removeCharacter, (state, { toRemove }) =>
    state.filter((character) => character.charId !== toRemove.charId)
  )
);
