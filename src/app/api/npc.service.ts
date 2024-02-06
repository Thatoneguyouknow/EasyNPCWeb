import { Injectable } from '@angular/core';
import { Observable, lastValueFrom, map } from 'rxjs';
import { nameScheme, npc, npcClass, npcRace, raceNameScheme } from '../models';
import { HttpClient } from '@angular/common/http';
import {
  characterApi,
  classApi,
  raceApi,
  raceNameSchemeApi,
  subraceApi,
} from './api.models';
import { availableAbilities, availableHitDie } from '../constants';
import {
  convertASIFromBackend,
  convertStatsFromBackend,
} from '../supporting methods/backendConversion';
import { npcSubrace } from '../models/subraceModel';

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

  async getAllCharacters(): Promise<Observable<npc[]>> {
    const url = `api/Characters`;
    const data$ = this.http
      .get<ApiResponse<characterApi>>('http://localhost:8080/Characters')
      .pipe(
        map((npcCharacterData: ApiResponse<characterApi>): npc[] =>
          npcCharacterData.data.map((data) => ({
            charId: data.id,
            charName: data.name,
            charRace: data.race_id,
            charClass: data.class_id,
            charSubrace: data.subrace_id,
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
  }

  async getAllClasses(): Promise<Observable<npcClass[]>> {
    const url = `api/Classes`;
    const data$ = this.http
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
    return data$;
  }

  async getAllRaces(): Promise<Observable<npcRace[]>> {
    const url = `api/Races`;
    const data$ = this.http
      .get<ApiResponse<raceApi>>('http://localhost:8080/Races')
      .pipe(
        map((npcRaceData: ApiResponse<raceApi>): npcRace[] =>
          npcRaceData.data.map((data) => ({
            raceId: data.id,
            raceName: data.name,
            alignmentSkew: data.alignment,
            heightRange: [data.heightRange[0], data.heightRange[1]],
            weightRange: [data.weightRange[0], data.weightRange[1]],
            ageRange: [data.ageRange[0], data.ageRange[1]],
            asiRaw: data.asi,
            asivRaw: data.asiv,
            abilityScoreIncrease: convertASIFromBackend(data.asi, data.asiv),
            subraces: data.subraces,
            nameType: data.nameType,
          }))
        )
      );
    return data$;
  }

  async getAllSubraces(): Promise<Observable<npcSubrace[]>> {
    const url = `api/Subraces`;
    const data$ = this.http
      .get<ApiResponse<subraceApi>>('http://localhost:8080/Subraces')
      .pipe(
        map((npcSubraceData: ApiResponse<subraceApi>): npcSubrace[] =>
          npcSubraceData.data.map((data) => ({
            id: data.id,
            name: data.name,
            nameScheme: data.nameScheme,
            asiRaw: data.asi,
            asivRaw: data.asiv,
            abilityScoreIncrease:
              data.asi != null && data.asiv != null
                ? convertASIFromBackend(data.asi, data.asiv)
                : null,
          }))
        )
      );
    return data$;
  }

  getAllNameSchemes(): Observable<raceNameScheme[]> {
    const url = `api/Names`;
    return this.http
      .get<ApiResponse<raceNameSchemeApi>>('http://localhost:8080/Names')
      .pipe(
        map(
          (
            npcNameShemeData: ApiResponse<raceNameSchemeApi>
          ): raceNameScheme[] =>
            npcNameShemeData.data.map((data) => ({
              id: data.id,
              firstNames: data.firstNames.map(
                (val): nameScheme => ({
                  id: val.id,
                  firstHalf: val.firstHalves,
                  secondHalf: val.secondHalves,
                })
              ),
              lastNames: data.lastNames.map(
                (val): nameScheme => ({
                  id: val.id,
                  firstHalf: val.firstHalves,
                  secondHalf: val.secondHalves,
                })
              ),
            }))
        )
      );
  }
}
