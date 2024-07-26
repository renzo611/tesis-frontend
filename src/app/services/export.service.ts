import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { CarreraDTO } from '../models/Carrera-dto';
import { BuscarCarreraResponseModel } from '../models/Buscar-carrera-response-model';
import { MateriaDTO } from '../models/materia-dto';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

    exportar(asignaciones: any[]) {
        // Implementa la lógica para exportar los datos, por ejemplo, en formato CSV o PDF
        console.log('Exportando asignaciones:', asignaciones);
      }
}
