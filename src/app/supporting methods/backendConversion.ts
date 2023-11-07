export function convertASIFromBackend(
  abilities: number[],
  values: number[]
): Array<[number, number]> {
  let temp_array = new Array<[number, number]>;
  console.log(abilities, values);
  if (abilities.length == values.length) {
    for (let i = 0; i < abilities.length; i++) {
      temp_array.push([abilities[0], values[0]]);
    }
  }
  return temp_array;
}
