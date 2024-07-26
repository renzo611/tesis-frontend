import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NuevoUsuarioDTO } from '../../../models/nuevo-usuario-dto';
import { AulaDTO } from '../../../models/aula-dto';
import { AulasService } from '../../../services/aulas.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  
  
  form!: FormGroup;
  classroomType: string[] = ['AULA_COMUN', 'AUDITORIO','LABORATORIO'];

  constructor(private http: HttpClient, private aulasService: AulasService, private fb: FormBuilder, private router: Router,private dialogRef: MatDialogRef<RegistrarComponent>,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      capacity: ['', Validators.required],
      classroomType: ['', Validators.required],
    })
  }

  registrar() {
    const aula: AulaDTO = this.form.value;
    if (!aula.classroomType) {
      this.openSnackBar("Complete los campos faltantes", "aceptar");
      return;
    }
    this.aulasService.registrarAula(aula).subscribe(() => {
      this.dialogRef.close(true);
      this.openSnackBar("El aula se registro con exito","aceptar");
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
