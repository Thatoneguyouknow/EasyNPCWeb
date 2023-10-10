// These interfaces must match 1 to 1 with what is returned from the backend

export interface classApi {
    id: number;
    name: string;
    userID: number;
    hitDie: number;
    statPriority: number[];
}