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
import { BuscarCarreraResponseModel } from '../../../models/Buscar-carrera-response-model';
import { PlanesDeEstudioService } from '../../../services/planes-de-estudio.service';
import { PlanDeEstudioDTO } from '../../../models/plan-de-estudio-dto';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  form!: FormGroup;
  carreras!: BuscarCarreraResponseModel[];
  constructor(private http: HttpClient, private planDeEstudioService: PlanesDeEstudioService,private carrerasService:CarrerasService, private fb: FormBuilder, private router: Router,private dialogRef: MatDialogRef<RegistrarComponent>,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCarreras();
    this.form = this.fb.group({
      name: ['', Validators.required],
      career: ['', Validators.required],
    })
  }
  getCarreras(){
    this.carrerasService.listarCarreras().subscribe((response)=>{
      this.carreras = response;
    }
    )
  }

  registrar() {
    const plan: PlanDeEstudioDTO = this.form.value;
    this.planDeEstudioService.registrarPlanDeEstudio(plan).subscribe(() => {
      this.dialogRef.close(true);
      this.openSnackBar("El plan de estudio se registro con exito","aceptar");
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
