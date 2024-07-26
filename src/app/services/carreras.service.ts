import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { CarreraDTO } from '../models/Carrera-dto';
import { BuscarCarreraResponseModel } from '../models/Buscar-carrera-response-model';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  private url = "http://localhost:8080/carreras";

  constructor(private http:HttpClient) {
  }

  listarCarreras():Observable<BuscarCarreraResponseModel[]>{
    return this.http.get<BuscarCarreraResponseModel[]>(this.url);
  }
  
  registrarCarrera(carreraDTO: CarreraDTO): Observable<any> {
    return this.http.post(this.url, carreraDTO, { responseType: 'text' });
  }
}
