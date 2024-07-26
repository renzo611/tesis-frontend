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
import { CarrerasService } from '../../../services/carreras.service';
import { BuscarDocenteResponseModel } from '../../../models/Buscar-docente-response-model';
import { CarreraDTO } from '../../../models/Carrera-dto';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  form!: FormGroup;
  docentes!: BuscarDocenteResponseModel[];
  constructor(private http: HttpClient, private docentesService: DocentesService,private carrerasService:CarrerasService, private fb: FormBuilder, private router: Router,private dialogRef: MatDialogRef<RegistrarComponent>,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getDocentes();
    this.form = this.fb.group({
      name: ['', Validators.required],
      director: ['', Validators.required],
    })
  }
  getDocentes(){
    this.docentesService.listarDocentes().subscribe((response)=>{
      this.docentes = response;
    }
    )
  }

  registrar() {
    const carrera: CarreraDTO = this.form.value;
    this.carrerasService.registrarCarrera(carrera).subscribe(() => {
      this.dialogRef.close(true);
      this.openSnackBar("La carrera se registro con exito","aceptar");
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
