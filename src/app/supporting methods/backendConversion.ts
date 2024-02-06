import { Observable, map } from 'rxjs';
import { StatTypes, availableAbilities, characterStat } from '../constants';
import { ApiResponse } from '../api/npc.service';
import { characterApi } from '../api/api.models';
import { npc, npcSubrace, npcClass, npcRace } from '../models';
import { character } from '../models/characterModel';

export function convertASIFromBackend(
  abilities: number[],
  values: number[]
): Array<[StatTypes, number]> {
  let temp_array = new Array<[StatTypes, number]>();
  if (abilities.length == values.length) {
    for (let i = 0; i < abilities.length; i++) {
      temp_array.push([availableAbilities[abilities[i]], values[i]]);
    }
  }
  return temp_array;
}

export function convertStatsFromBackend(stats: number[]): characterStat[] {
  let temp_array: characterStat[] = [];
  for (let index = 0; index < stats.length; index++) {
    let stat: characterStat = {
      stat: availableAbilities[index],
      statValue: stats[index],
      statModifier: Math.floor((stats[index] - 10) / 2),
    };
    temp_array.push(stat);
  }
  return temp_array;
}

export function convertCharacterApiToCharacter(
  apiResonse: Observable<ApiResponse<characterApi>>,
  availableClasses: npcClass[],
  availableRaces: npcRace[],
  availableSubraces: npcSubrace[]
) {
  const classesById = Object.fromEntries(
    availableClasses.map((charClass) => [charClass.id, charClass])
  );
  const racesById = Object.fromEntries(
    availableRaces.map((race) => [race.raceId, race])
  );
  const subracesById = Object.fromEntries(
    availableSubraces.map((subrace) => [subrace.id, subrace])
  );
  try {
    const data$ = apiResonse.pipe(
      map((npcCharacterData: ApiResponse<characterApi>): character[] =>
        npcCharacterData.data.map((data) => ({
          charId: data.id,
          charName: data.name,
          charRace: racesById[data.race_id],
          charClass: classesById[data.class_id],
          charSubrace: data.subrace_id
            ? subracesById[data.subrace_id]
            : undefined,
          level: data.level,
          stats: convertStatsFromBackend(data.stats),
          hitPoints: data.hit_points,
          alignment: data.alignment,
          personalityTraits: data.personality,
          age: data.age,
          height: data.height,
          weight: data.weight,
        }))
      )
    );
    return data$;
  } catch (error) {
    console.log('Character may be missing class or race');
    console.log(
      'Char Race: ' +
        apiResonse.pipe(map((data) => data.data.map((stuff) => stuff.race_id)))
    );
    console.log(
      'Char Class: ' +
        apiResonse.pipe(map((data) => data.data.map((stuff) => stuff.class_id)))
    );
    console.log(
      'Available class IDs: ' + availableClasses.map((cClass) => cClass.id)
    );
    console.log(
      'Available race IDs: ' + availableRaces.map((race) => race.raceId)
    );
    return undefined;
  }
}
