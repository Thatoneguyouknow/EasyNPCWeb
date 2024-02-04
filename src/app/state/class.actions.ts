import { createActionGroup, props } from '@ngrx/store';
import { npcClass } from '../models';

export const ClassActions = createActionGroup({
  source: 'Classes',
  events: {
    'Add Class': props<{ classId: number }>(),
    'Remove Class': props<{ classId: number }>(),
    'Edit Class': props<{ toEdit: npcClass }>(),
  },
});

export const ClassApiActions = createActionGroup({
  source: 'Classes API',
  events: {
    'Retrieved Class List': props<{ classes: ReadonlyArray<npcClass> }>(),
  },
});
