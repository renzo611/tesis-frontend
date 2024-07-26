import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanesDeEstudioRoutingModule } from './planes-de-estudio-routing.module';
import { MaterialModule } from '../../material/material.module';
import { ListadoComponent } from './listado/listado.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListadoComponent,
    RegistrarComponent
  ],
  imports: [
    CommonModule,
    PlanesDeEstudioRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PlanesDeEstudioModule { }
