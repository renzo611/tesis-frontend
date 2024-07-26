import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValuesDTO } from '../models/email-values-dto';
import { Observable } from 'rxjs';
import { RecoverPasswordDTO } from '../models/recover-password-dto';

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService {

  url = "http://localhost:8080/email-password/"

  constructor(private http:HttpClient) { }

  public sendEmail(dto: EmailValuesDTO):Observable<any>{
    return this.http.post<any>(this.url + 'send-email',dto);
  }

  public changePassword(dto: RecoverPasswordDTO):Observable<any>{
    return this.http.post<any>(this.url + 'recover-password',dto);
  }
}
