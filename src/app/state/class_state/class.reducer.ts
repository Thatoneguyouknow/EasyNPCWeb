import { createReducer, on } from '@ngrx/store';
import { npcClass } from '../../models';
import { ClassActions, ClassApiActions } from './class.actions';
import { immerOn } from 'ngrx-immer/store';

export const initialState: ReadonlyArray<npcClass> = [];

export const classesReducer = createReducer(
  initialState,
  on(ClassApiActions.retrievedClassList, (_state, { classes }) => classes),
  on(ClassActions.editClass, (state, { toEdit }) => {
    return [toEdit, ...state.filter((id) => id.id !== toEdit.id)];
  }),
  on(ClassActions.addClass, (state, { toAdd }) => {
    if (state.indexOf(toAdd) > -1) return state;
    return [...state, toAdd];
  }),
  on(ClassActions.removeClass, (state, { toRemove }) => 
    state.filter((charClass) => charClass.id !== toRemove.id)
  ),
);
