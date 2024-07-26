import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from '../../../services/token.service';
import { AuthService } from '../../../services/auth.service';
import { LoginUsuarioDTO } from '../../../models/login-usuario-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  hidePassword = true;

  constructor(
    private tokenService:TokenService,
    private authService:AuthService,
    private fb: FormBuilder, 
    private router: Router,
    private _snackBar: MatSnackBar
  ){

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onLogin():void{
    const usuario: LoginUsuarioDTO = this.form.value;
    this.authService.login(usuario).subscribe((data)=>{
      this.tokenService.setToken(data.token);
      this.openSnackBar("Inicio de Sesion Exitosa","aceptar");
      this.router.navigate(["/dashboard"]);
    
    },err=>{
      this.openSnackBar(err.error,"aceptar");
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000
    });
  }

  resetPassword(){
    this.router.navigate(["login/sendmail"])
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
