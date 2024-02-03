import { createActionGroup, props } from "@ngrx/store";
import { npcRace } from "../models";


export const RaceActions = createActionGroup({
    source: 'Races',
    events: {
        'Add Race': props<{ raceId: number}>(),
        'Remove Race': props<{ raceId: number}>(),
    }
})

export const RaceApiActions = createActionGroup({
    source: 'Races API',
    events: {
        'Retrieved Race List': props<{ races: ReadonlyArray<npcRace> }>()
    }
})