import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { npcClass, npcRace } from '../models';
import { HttpClient } from '@angular/common/http';
import { classApi, raceApi } from './api.models';
import { availableAbilities, availableHitDie, HitDie } from '../constants';
import { convertASIFromBackend } from '../supporting methods/backendConversion';

export interface ApiResponse<T> {
  id: number;
  messages: string[];
  total: number;
  data: T[];
}

@Injectable({
  providedIn: 'root',
})
export class npcService {
  constructor(private http: HttpClient) {}

  // map converts from backend
  getAllClasses(): Observable<npcClass[]> {
    const url = `api/Classes`;
    return this.http
      .get<ApiResponse<classApi>>('http://localhost:8080/Classes')
      .pipe(
        map((npcClassData: ApiResponse<classApi>): npcClass[] =>
          npcClassData.data.map((data) => ({
            id: data.id,
            userId: data.userID,
            name: data.name,
            userCreated: data.userID == 100 ? false : true,
            hitDie: availableHitDie.filter(
              (hitDie) => hitDie.value == data.hitDie
            )[0],
            statPriority: data.statPriority.map(
              (stat) => availableAbilities.filter((val) => val.value == stat)[0]
            ),
          }))
        )
      );
  }

  getAllRaces(): Observable<npcRace[]> {
    const url = `api/Races`;
    return this.http
      .get<ApiResponse<raceApi>>('http://localhost:8080/Races')
      .pipe(
        map((npcRaceData: ApiResponse<raceApi>): npcRace[] =>
          npcRaceData.data.map((data) => ({
            raceId: data.id,
            raceName: data.name,
            alignmentSkew: data.alignmentSkew,
            heightRange: [data.heightRange[0], data.heightRange[1]],
            weightRange: [data.weightRange[0], data.weightRange[1]],
            ageRange: [data.ageRange[0], data.ageRange[1]],
            asiRaw: data.asi,
            asivRaw: data.asiv,
            abilityScoreIncrease: convertASIFromBackend(data.asi.map(
                (stat) => availableAbilities.filter((val) => val.value == stat)[0]
            ), data.asiv),
            // abilityScoreIncrease: null,
          }))
        )
      );
  }
}
