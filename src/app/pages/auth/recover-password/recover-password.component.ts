import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmailPasswordService } from '../../../services/email-password.service';
import { RecoverPasswordDTO } from '../../../models/recover-password-dto';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {
  form!:FormGroup
  token!:string

  constructor(private fb: FormBuilder,
    private route:Router,private _snackBar:MatSnackBar, 
    private activateRoute:ActivatedRoute,
    private emailPasswordService:EmailPasswordService){}
  ngOnInit(): void {
    this.form = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['',Validators.required],
      tokenPassword:null
    })
  }

  onRecover(){
      this.token = this.activateRoute.snapshot.params['tokenPassword'];
      console.log(this.token);
      this.form.patchValue({tokenPassword: this.token})
      console.log(this.form.value);
      const dto:RecoverPasswordDTO = this.form.value
      this.emailPasswordService.changePassword(dto).subscribe((data)=>{
        this.openSnackBar("Contraseña modificada con exito","aceptar");
        this.route.navigate(["/login"])
      },error=>{
        this.openSnackBar(error.error.mensaje,"aceptar");
        console.log(error);
      })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000
    });
  }

  cancelar(){
    this.route.navigate(["/login"])
  }

}
