import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MateriasRoutingModule } from './materias-routing.module';
import { ListadoComponent } from './listado/listado.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListadoComponent,
    RegistrarComponent
  ],
  imports: [
    CommonModule,
    MateriasRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MateriasModule { }
