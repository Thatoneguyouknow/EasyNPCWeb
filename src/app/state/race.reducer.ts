import { createReducer, on } from "@ngrx/store";
import { npcRace } from "../models";
import { RaceApiActions } from "./race.actions";

export const initialState: ReadonlyArray<npcRace> = [];

export const racesReducer = createReducer(
    initialState,
    on(RaceApiActions.retrievedRaceList, (_state, { races }) => races)
)