import { createActionGroup, props } from '@ngrx/store';
import { npcClass } from '../models';

export const ClassActions = createActionGroup({
  source: 'Classes',
  events: {
    'Add Class': props<{ toAdd: npcClass }>(),
    'Remove Class': props<{ toRemove: npcClass }>(),
    'Edit Class': props<{ toEdit: npcClass }>(),
  },
});

export const ClassApiActions = createActionGroup({
  source: 'Classes API',
  events: {
    'Retrieved Class List': props<{ classes: ReadonlyArray<npcClass> }>(),
  },
});
