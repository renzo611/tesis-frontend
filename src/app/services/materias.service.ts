import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { CarreraDTO } from '../models/Carrera-dto';
import { BuscarCarreraResponseModel } from '../models/Buscar-carrera-response-model';
import { MateriaDTO } from '../models/materia-dto';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private url = "http://localhost:8080/materias";

  constructor(private http:HttpClient) {
  }

  listarMaterias():Observable<MateriaDTO[]>{
    return this.http.get<MateriaDTO[]>(this.url);
  }
  
  registrarMateria(materiaDTO: MateriaDTO): Observable<any> {
    return this.http.post(this.url, materiaDTO, { responseType: 'text' });
  }
}
