import { createReducer, on } from "@ngrx/store";
import { npcClass } from "../models";
import { ClassApiActions } from "./class.actions";

export const initialState: ReadonlyArray<npcClass> = [];

export const classesReducer = createReducer(
    initialState,
    on(ClassApiActions.retrievedClassList, (_state, { classes }) => classes)
);