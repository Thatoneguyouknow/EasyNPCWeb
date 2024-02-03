import { createReducer, on } from '@ngrx/store';
import { npc } from '../models';
import { CharacterApiActions } from './character.actions';

export const initialState: ReadonlyArray<npc> = [];

export const charactersReducer = createReducer(
  initialState,
  on(
    CharacterApiActions.retrievedCharacterList,
    (_state, { characters }) => characters
  )
);
