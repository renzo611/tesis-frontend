import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AulasService } from '../../../services/aulas.service';
import { BuscarAulaResponseModel } from '../../../models/Buscar-aula-response-model';
import { RegistrarComponent } from '../registrar/registrar.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name','capacity', 'classroomType','Opciones'];
  aulas = new MatTableDataSource();
  selectedFile!: File;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http:HttpClient,private aulasService: AulasService, private router: Router, private dialog: MatDialog, private _liveAnnouncer: LiveAnnouncer,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAulas();
  }

  ngAfterViewInit() {
    this.aulas.paginator = this.paginator;
    this.aulas.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.aulas.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getAulas() {
    this.aulasService.listarAulas().subscribe(
      (aulas: BuscarAulaResponseModel[]) => {
        this.aulas.data = aulas.map(aula => ({
          ...aula,
        }));
      },
      (error) => {
        console.error('Error al obtener las aulas', error);
      }
    );
  }
  

  registrar() {
    const registrar = this.dialog.open(RegistrarComponent);
    registrar.afterClosed().subscribe(result => {
      if (result) {
        this.getAulas();
      }
    });
  }

  verDetalles(id: number){
  }

  modificar(id: number) {
  }


  eliminar(id: number) {

  }

  onFileSelected(event:any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.http.post('http://localhost:8080/aulas/upload', formData)
        .subscribe(response => {
          this.openSnackBar("Aulas cargadas exitosamente","aceptar");
          this.getAulas();
        }, error => {
            console.error('Error al subir el archivo.', error);
        });
}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000
    });
  }
}

