import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { BuscarUsuarioResponseModel } from '../models/buscar-usuario-response-model';
import { NuevoUsuarioDTO } from '../models/nuevo-usuario-dto';
import { ActualizarUsuarioDTO } from '../models/actualizar-usuario-dto';
import { ChangePasswordDTO } from '../models/change-password-dto';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private url = "http://localhost:8080/users";

  constructor(private http:HttpClient) {
  }

  listUsers():Observable<BuscarUsuarioResponseModel[]>{
    return this.http.get<BuscarUsuarioResponseModel[]>(this.url);
  }

  getUser(id: number): Observable<BuscarUsuarioResponseModel> {
    return this.http.get<any>(this.url +"/"+ id)
      .pipe(
        map((response: any) => {
          return {
            id: response.id,
            name: response.name,
            lastName: response.lastName,
            userName: response.userName,
            email: response.email,
            password: response.password,
            role: response.role
  }})
      );
  }

  registrarUsuario(usuario: NuevoUsuarioDTO): Observable<any> {
    return this.http.post(this.url, usuario, { responseType: 'text' });
  }

  actualizarUsuario(id:number,usuario:ActualizarUsuarioDTO):Observable<any>{
    return this.http.put(this.url + "/"+id,usuario, { responseType: 'text' });
  }

  eliminarUsuario(id:number):Observable<any>{
    return this.http.delete<any>(this.url + "/" + id);
  }

  changePassword(dto:ChangePasswordDTO):Observable<any>{
    return this.http.put(this.url + "/change-password",dto, { responseType: 'text' });
  }

}
