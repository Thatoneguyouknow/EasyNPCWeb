import { createReducer, on } from '@ngrx/store';
import { npcSubrace } from 'src/app/models';
import { SubraceActions, SubraceApiActions } from './subrace.actions';

export const initialState: ReadonlyArray<npcSubrace> = [];

export const subracesReducer = createReducer(
  initialState,
  on(
    SubraceApiActions.retrievedSubraceList,
    (_state, { subraces }) => subraces
  ),
  on(SubraceActions.editSubrace, (state, { toEdit }) => {
    return [toEdit, ...state.filter((subrace) => subrace.id !== toEdit.id)];
  }),
  on(SubraceActions.addSubrace, (state, { toAdd }) => {
    if (state.indexOf(toAdd) > -1) return state;
    return [...state, toAdd];
  }),
  on(SubraceActions.removeSubrace, (state, { toRemove }) =>
    state.filter((subrace) => subrace.id !== toRemove.id)
  )
);
