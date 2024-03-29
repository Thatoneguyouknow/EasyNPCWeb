import { createActionGroup, props } from '@ngrx/store';
import { npcRace } from '../../models';

export const RaceActions = createActionGroup({
  source: 'Races',
  events: {
    'Add Race': props<{ toAdd: npcRace }>(),
    'Remove Race': props<{ toRemove: npcRace }>(),
    'Edit Race': props<{ toEdit: npcRace }>(),
  },
});

export const RaceApiActions = createActionGroup({
  source: 'Races API',
  events: {
    'Retrieved Race List': props<{ races: ReadonlyArray<npcRace> }>(),
  },
});
