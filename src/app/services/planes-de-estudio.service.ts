import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { CarreraDTO } from '../models/Carrera-dto';
import { BuscarCarreraResponseModel } from '../models/Buscar-carrera-response-model';
import { PlanDeEstudioDTO } from '../models/plan-de-estudio-dto';

@Injectable({
  providedIn: 'root'
})
export class PlanesDeEstudioService {

  private url = "http://localhost:8080/planes-de-estudio";

  constructor(private http:HttpClient) {
  }

  listarPlanesDeEstudio():Observable<PlanDeEstudioDTO[]>{
    return this.http.get<PlanDeEstudioDTO[]>(this.url);
  }
  
  registrarPlanDeEstudio(planDeEstudioDTO: PlanDeEstudioDTO): Observable<any> {
    return this.http.post(this.url, planDeEstudioDTO, { responseType: 'text' });
  }
}
