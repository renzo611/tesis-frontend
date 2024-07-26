import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { BuscarAulaResponseModel } from '../models/Buscar-aula-response-model';
import { AulaDTO } from '../models/aula-dto';
import { BuscarDocenteResponseModel } from '../models/Buscar-docente-response-model';
import { DocenteDTO } from '../models/Docente-dto';
import { disponibilidad } from '../models/disponibilidad';

@Injectable({
  providedIn: 'root'
})
export class DocentesService {

  private url = "http://localhost:8080/docentes";

  constructor(private http:HttpClient) {
  }

  listarDocentes():Observable<BuscarDocenteResponseModel[]>{
    return this.http.get<BuscarDocenteResponseModel[]>(this.url);
  }
  
  registrarDocente(docente: DocenteDTO): Observable<any> {
    return this.http.post(this.url, docente, { responseType: 'text' });
  }

  agregarDispobilidad(id: number, dispobibilidades: disponibilidad[]): Observable<any> {
    return this.http.post(this.url + "/" + id + "/disponibilidades", dispobibilidades);
  }

  obtenerDisponibilidades(id: number):Observable<disponibilidad[]>{
    return this.http.get<disponibilidad[]>(this.url + "/" + id + "/disponibilidades");
  }
}
