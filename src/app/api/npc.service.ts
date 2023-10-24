import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { npcClass } from "../models";
import { HttpClient } from "@angular/common/http";
import { classApi } from "./api.models";
import { availableHitDie, HitDie } from "../constants";

export interface ApiResponse<T> {
    id: number;
    messages: string[];
    total: number;
    data: T[];
}

@Injectable({
    providedIn: 'root'
})
export class npcService {

    constructor(private http: HttpClient) {}
    
    // map converts from backend 
    getAllClasses(): Observable<npcClass[]>{
        const url = `api/Classes`;
        return this.http.get<ApiResponse<classApi>>('http://localhost:8080/Classes').pipe(
            map((npcClassData: ApiResponse<classApi>): npcClass[] =>
                npcClassData.data.map((data) => ({
                    id: data.id,
                    userId: data.userID,
                    name: data.name,
                    userCreated: data.userID == 100 ? false : true,
                    hitDie: availableHitDie.find((hitDie) => hitDie.value == data.hitDie),
                    statPriority: data.statPriority,
                }))    
            )
        )
    }
}