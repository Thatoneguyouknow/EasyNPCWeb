import { StatTypes, availableAbilities, characterStat } from "../constants";

export function convertASIFromBackend(
  abilities: number[],
  values: number[]
): Array<[StatTypes, number]> {
  let temp_array = new Array<[StatTypes, number]>;
  if (abilities.length == values.length) {
    for (let i = 0; i < abilities.length; i++) {
      temp_array.push([availableAbilities[abilities[i]], values[i]]);
    }
  }
  return temp_array;
}

export function convertStatsFromBackend(stats: number[]): characterStat[] {
  let temp_array: characterStat[] = [];
  for(let index = 0; index < stats.length; index++) {
    let stat: characterStat = {stat: availableAbilities[index], statValue: stats[index], statModifier: Math.floor((stats[index] - 10)/2)}
    temp_array.push(stat);
  }
  return temp_array;
}
