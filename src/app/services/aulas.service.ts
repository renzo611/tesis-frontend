import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { BuscarAulaResponseModel } from '../models/Buscar-aula-response-model';
import { AulaDTO } from '../models/aula-dto';

@Injectable({
  providedIn: 'root'
})
export class AulasService {

  private url = "http://localhost:8080/aulas";

  constructor(private http:HttpClient) {
  }

  listarAulas():Observable<BuscarAulaResponseModel[]>{
    return this.http.get<BuscarAulaResponseModel[]>(this.url);
  }

  getAula(id: number): Observable<BuscarAulaResponseModel> {
    return this.http.get<any>(this.url +"/"+ id)
      .pipe(
        map((response: any) => {
          return {
            id: response.id,
            name: response.name,
            capacity: response.capacity,
            classroomType: response.classroomType
  }})
      );
  }

  registrarAula(aula: AulaDTO): Observable<any> {
    return this.http.post(this.url, aula, { responseType: 'text' });
  }

  actualizarAula(id:number,aula:AulaDTO):Observable<any>{
    return this.http.put(this.url + "/"+id,aula, { responseType: 'text' });
  }

  eliminarAula(id:number):Observable<any>{
    return this.http.delete<any>(this.url + "/" + id);
  }
}
