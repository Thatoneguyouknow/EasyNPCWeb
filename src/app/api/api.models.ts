// These interfaces must match 1 to 1 with what is returned from the backend

export interface classApi {
  id: number;
  name: string;
  userID: number;
  hitDie: number;
  statPriority: number[];
}

export interface raceApi {
  id: number;
  userID: number;
  name: string;
  alignment: number;
  heightRange: number[];
  weightRange: number[];
  ageRange: number[];
  asi: number[];
  asiv: number[];
  subraces: number[];
}

export interface subraceApi {
  id: number;
  name: string;
  nameScheme: number | null;
  asi: number[] | null;
  asiv: number[] | null;
}

