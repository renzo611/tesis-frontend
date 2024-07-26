import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService } from '../../../services/usuarios.service';
import { RegistrarComponent } from '../../usuarios/registrar/registrar.component';
import { ChangePasswordDTO } from '../../../models/change-password-dto';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  form!: FormGroup;

  constructor(private http: HttpClient, private usuarioService: UsuariosService, private fb: FormBuilder, private router: Router,private dialogRef: MatDialogRef<RegistrarComponent>,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }

  modificar() {
    const dto: ChangePasswordDTO = this.form.value;
    this.usuarioService.changePassword(dto).subscribe(() => {
      this.dialogRef.close(true);
      this.openSnackBar("Contraseña Actualizada","aceptar");
      this.form.reset();
    },(error)=>{
      console.log(error)
      this.openSnackBar(error.error,"aceptar");
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000
    });
  }

}
