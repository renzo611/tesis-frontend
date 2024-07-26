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
import { PlanesDeEstudioService } from '../../../services/planes-de-estudio.service';
import { MateriasService } from '../../../services/materias.service';
import { PlanDeEstudioDTO } from '../../../models/plan-de-estudio-dto';
import { MateriaDTO } from '../../../models/materia-dto';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  form!: FormGroup;
  planes!: PlanDeEstudioDTO[];
  period = ["ANUAL","PRIMER_CUATRIMESTRE","SEGUNDO_CUATRIMESTRE"];

  constructor(private http: HttpClient, private planesDeEstudioService: PlanesDeEstudioService,private materiaService:MateriasService, private fb: FormBuilder, private router: Router,private dialogRef: MatDialogRef<RegistrarComponent>,private _snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.getPlanesDeEstudio();
    this.form = this.fb.group({
      name: ['', Validators.required],
      numberRegistered: ['', Validators.required],
      periodType: ['',Validators.required],
      subjectYear: ['', Validators.required],
      weeklyLoad: ['', Validators.required],
      studyPlan: ['', Validators.required]
    })
  }
  getPlanesDeEstudio(){
    this.planesDeEstudioService.listarPlanesDeEstudio().subscribe((response)=>{
      this.planes = response;
    }
    )
  }

  registrar() {
    const materia: MateriaDTO = this.form.value;
    console.log(materia)
    this.materiaService.registrarMateria(materia).subscribe(() => {
      this.dialogRef.close(true);
      this.openSnackBar("La materia se registro con exito","aceptar");
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
