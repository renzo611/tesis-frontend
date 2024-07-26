import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NuevoUsuarioDTO } from '../../../models/nuevo-usuario-dto';
import { DocentesService } from '../../../services/docentes.service';
import { DocenteDTO } from '../../../models/Docente-dto';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  form!: FormGroup;
  constructor(private http: HttpClient, private docentesService: DocentesService, private fb: FormBuilder, private router: Router,private dialogRef: MatDialogRef<RegistrarComponent>,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      legajo: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  registrar() {
    const docente: DocenteDTO = this.form.value;
    this.docentesService.registrarDocente(docente).subscribe(() => {
      this.dialogRef.close(true);
      this.openSnackBar("El docente se registro con exito","aceptar");
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
