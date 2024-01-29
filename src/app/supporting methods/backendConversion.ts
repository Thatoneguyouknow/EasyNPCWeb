import { StatTypes, availableAbilities } from "../constants";

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
