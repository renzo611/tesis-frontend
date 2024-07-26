import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUsuarioDTO } from '../models/login-usuario-dto';
import { JwtDTO } from '../models/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = "http://localhost:8080/auth/"

  constructor(private httpClient: HttpClient) { 
  }

  public login(loginUsuario:LoginUsuarioDTO): Observable<JwtDTO>{
    return this.httpClient.post<JwtDTO>(this.authURL+'login',loginUsuario);
  }
}
