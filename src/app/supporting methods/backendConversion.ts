import { StatTypes } from "../constants";

export function convertASIFromBackend(
  abilities: StatTypes[],
  values: number[]
): Array<[StatTypes, number]> {
  let temp_array = new Array<[StatTypes, number]>;
  if (abilities.length == values.length) {
    for (let i = 0; i < abilities.length; i++) {
      temp_array.push([abilities[0], values[0]]);
    }
  }
  return temp_array;
}
