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
import { DisponibilidadesComponent } from '../disponibilidades/disponibilidades.component';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name','lastName', 'legajo','dni', 'email','Opciones'];
  docentes = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private docentesService: DocentesService, private router: Router, private dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getDocentes();
  }

  ngAfterViewInit() {
    this.docentes.paginator = this.paginator;
    this.docentes.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.docentes.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getDocentes() {
    this.docentesService.listarDocentes().subscribe(
      (personas: BuscarDocenteResponseModel[]) => {
        this.docentes.data = personas.map(persona => ({
          ...persona,
        }));
      },
      (error) => {
        console.error('Error al obtener los docentes', error);
      }
    );
  }
  

  registrar() {
    const registrar = this.dialog.open(RegistrarComponent);
    registrar.afterClosed().subscribe(result => {
      if (result) {
        this.getDocentes();
      }
    });
  }

  disponibilidades(id: number) {
    const disp = this.dialog.open(DisponibilidadesComponent);
    disp.componentInstance.id = id;
    disp.afterClosed().subscribe(result => {
      if (result) {
        this.getDocentes();
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
