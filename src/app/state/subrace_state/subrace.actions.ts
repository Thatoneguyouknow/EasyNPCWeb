import { createActionGroup, props } from '@ngrx/store';
import { npcSubrace } from 'src/app/models';

export const SubraceActions = createActionGroup({
  source: 'Subraces',
  events: {
    'Add Subrace': props<{ toAdd: npcSubrace }>(),
    'Remove Subrace': props<{ toRemove: npcSubrace }>(),
    'Edit Subrace': props<{ toEdit: npcSubrace }>(),
  },
});

export const SubraceApiActions = createActionGroup({
  source: 'Subraces API',
  events: {
    'Retrieved Subrace List': props<{ subraces: ReadonlyArray<npcSubrace> }>(),
  },
});
