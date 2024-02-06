// These interfaces must match 1 to 1 with what is returned from the backend

export interface characterApi {
  id: number;
  user_id: number;
  name: string;
  class_id: number;
  race_id: number;
  subrace_id?: number;
  level: number;
  stats: number[];
  hit_points: number;
  alignment: number;
  personality: string[];
  age: number;
  height: number[];
  weight: number;
}
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
  nameType: number;
}

export interface subraceApi {
  id: number;
  name: string;
  nameScheme: number | null;
  asi: number[] | null;
  asiv: number[] | null;
}

export interface nameSchemeApi {
  id: number;
  firstHalves: string[];
  secondHalves: string[];
}

export interface raceNameSchemeApi {
  id: number;
  firstNames: nameSchemeApi[];
  lastNames: nameSchemeApi[];
}
