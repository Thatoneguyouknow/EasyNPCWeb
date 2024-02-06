import { createActionGroup, props } from "@ngrx/store";
import { raceNameScheme } from "src/app/models";

export const NameApiActions = createActionGroup({
    source: 'Names API',
    events: {
        'Retrieved Name List': props<{ names: ReadonlyArray<raceNameScheme> }>(),
    }
})