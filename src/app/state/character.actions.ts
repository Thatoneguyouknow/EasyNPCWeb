import { createActionGroup, props } from '@ngrx/store';
import { npc } from '../models';

export const CharacterActions = createActionGroup({
  source: 'Characters',
  events: {
    'Add Character': props<{ characterId: number }>(),
    'Remove Character': props<{ characterId: number }>(),
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
