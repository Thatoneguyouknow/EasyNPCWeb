export interface nameScheme {
  id: number;
  firstHalf: string[];
  secondHalf: string[];
}

export interface raceNameScheme {
  id: number;
  firstNames: nameScheme[];
  lastNames: nameScheme[];
}
