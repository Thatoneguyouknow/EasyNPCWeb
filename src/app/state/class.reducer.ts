import { createReducer, on } from '@ngrx/store';
import { npcClass } from '../models';
import { ClassActions, ClassApiActions } from './class.actions';
import { immerOn } from 'ngrx-immer/store';

export const initialState: ReadonlyArray<npcClass> = [];

export const classesReducer = createReducer(
  initialState,
  on(ClassApiActions.retrievedClassList, (_state, { classes }) => classes),
  on(ClassActions.editClass, (state, { toEdit }) => {
    return [toEdit, ...state.filter((id) => id.id !== toEdit.id)];
  }),
);
