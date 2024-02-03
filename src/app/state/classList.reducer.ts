import { createReducer, on } from '@ngrx/store';
import { ClassActions } from './class.actions';

export const initialState: ReadonlyArray<number> = [];

export const classListReducer = createReducer(
  initialState,
  on(ClassActions.removeClass, (state, { classId }) =>
    state.filter((id) => id !== classId)
  ),
  on(ClassActions.addClass, (state, { classId }) => {
    if (state.indexOf(classId) > -1) return state;
    return [...state, classId];
  })
);
