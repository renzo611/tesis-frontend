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
import { ModificarComponent } from '../modificar/modificar.component';
import { VerDetallesComponent } from '../ver-detalles/ver-detalles.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name','lastName', 'userName', 'email','role','Opciones'];
  personas = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usuariosService: UsuariosService, private router: Router, private dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getPersonas();
  }

  ngAfterViewInit() {
    this.personas.paginator = this.paginator;
    this.personas.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.personas.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getPersonas() {
    this.usuariosService.listUsers().subscribe(
      (personas: BuscarUsuarioResponseModel[]) => {
        this.personas.data = personas.map(persona => ({
          ...persona,
          role: persona.role.roleName // Corrigiendo el acceso a roleName
        }));
      },
      (error) => {
        console.error('Error al obtener los usuarios', error);
      }
    );
  }
  

  registrar() {
    const registrar = this.dialog.open(RegistrarComponent);
    registrar.afterClosed().subscribe(result => {
      if (result) {
        this.getPersonas();
      }
    });
  }

  verDetalles(id: number){
    const verDetalles = this.dialog.open(VerDetallesComponent);
    verDetalles.componentInstance.id = id;
    verDetalles.afterClosed().subscribe(result => {
      if (result) {
        this.getPersonas();
      }
    });
  }

  modificar(id: number) {
    const modificar = this.dialog.open(ModificarComponent);
    modificar.componentInstance.id = id;
    modificar.afterClosed().subscribe(result => {
      if (result) {
        this.getPersonas();
      }
    });
  }


  eliminar(id: number) {
    const confirmar = this.dialog.open(ConfirmDialogComponent, {
      data: { message: '¿Está seguro de que desea eliminar esta persona?' }
    });
  
    confirmar.afterClosed().subscribe(result => {
      if (result) {
        this.usuariosService.eliminarUsuario(id).subscribe(() => {
          this.getPersonas();
          this.openSnackBar('El usuario se eliminó con éxito', 'Aceptar');
        }, (error) => {
          console.log(error)
          this.openSnackBar(error.error, 'Aceptar');
        });
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000
    });
  }
}
