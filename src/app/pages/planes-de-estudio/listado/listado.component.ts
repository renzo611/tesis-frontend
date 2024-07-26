import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BuscarUsuarioResponseModel } from '../../../models/buscar-usuario-response-model';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrarComponent } from '../registrar/registrar.component';
import { DocentesService } from '../../../services/docentes.service';
import { BuscarDocenteResponseModel } from '../../../models/Buscar-docente-response-model';
import { CarrerasService } from '../../../services/carreras.service';
import { BuscarCarreraResponseModel } from '../../../models/Buscar-carrera-response-model';
import { PlanesDeEstudioService } from '../../../services/planes-de-estudio.service';
import { PlanDeEstudioDTO } from '../../../models/plan-de-estudio-dto';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name','career','Opciones'];
  planes_de_estudio = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private planesDeEstudioService:PlanesDeEstudioService,private carreraService: CarrerasService, private router: Router, private dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPlanesDeEstudio();
  }

  ngAfterViewInit() {
    this.planes_de_estudio.paginator = this.paginator;
    this.planes_de_estudio.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.planes_de_estudio.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getPlanesDeEstudio() {
    this.planesDeEstudioService.listarPlanesDeEstudio().subscribe(
      (planDeEstudio: PlanDeEstudioDTO[]) => {
        this.planes_de_estudio.data = planDeEstudio.map(planDeEstudio => ({
          ...planDeEstudio,
          career: planDeEstudio.career.name
        }));
      },
      (error) => {
        console.error('Error al obtener las carreras', error);
      }
    );
  }
  

  registrar() {
    const registrar = this.dialog.open(RegistrarComponent);
    registrar.afterClosed().subscribe(result => {
      if (result) {
        this.getPlanesDeEstudio();
      }
    });
  }

  verDetalles(id: number){
   
  }

  modificar(id: number) {
   
  }


  eliminar(id: number) {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000
    });
  }
}
