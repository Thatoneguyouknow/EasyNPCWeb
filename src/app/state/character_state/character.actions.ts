import { createActionGroup, props } from '@ngrx/store';
import { npc } from '../../models';

export const CharacterActions = createActionGroup({
  source: 'Characters',
  events: {
    'Add Character': props<{ toAdd: npc }>(),
    'Remove Character': props<{ toRemove: npc }>(),
    'Edit Character': props<{ toEdit: npc }>(),
  },
});

export const CharacterApiActions = createActionGroup({
  source: 'Characters API',
  events: {
    'Retrieved Character List': props<{
      characters: ReadonlyArray<npc>;
    }>(),
  },
});
