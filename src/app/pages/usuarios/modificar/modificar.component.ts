import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BuscarUsuarioResponseModel } from '../../../models/buscar-usuario-response-model';
import { ActualizarUsuarioDTO } from '../../../models/actualizar-usuario-dto';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent {

  @Input() id!:number;
  rols: string[] = ['ROLE_ADMIN', 'ROLE_DIRECTOR_CARRERA','ROLE_BEDELIA'];

  form!: FormGroup;

  constructor(private http: HttpClient, private usuarioService: UsuariosService, private fb: FormBuilder, private router: Router,private dialogRef: MatDialogRef<ModificarComponent>,private _snackBar: MatSnackBar) { }

  ngOnInit(): void{
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required]
    })
    this.usuarioService.getUser(this.id).subscribe((resp:BuscarUsuarioResponseModel)=>{
      this.form.patchValue({
        id: resp.id,
        name: resp.name,
        lastName: resp.lastName,
        userName: resp.userName,
        email: resp.email,
        role: resp.role.roleName
      });
    })
  }

  modificar() {
    const persona: ActualizarUsuarioDTO = this.form.value;
    console.log(persona);
    this.usuarioService.actualizarUsuario(this.id,persona).subscribe(() => {
      this.dialogRef.close(true);
      this.openSnackBar("La persona se modifico con exito","aceptar");
      this.form.reset();
    },(error)=>{
      this.openSnackBar(error.error,"aceptar");
      console.log(error)
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000
    });
  }

}
