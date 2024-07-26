import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarrerasRoutingModule } from './carreras-routing.module';
import { RegistrarComponent } from './registrar/registrar.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListadoComponent } from './listado/listado.component';


@NgModule({
  declarations: [
    ListadoComponent,
    RegistrarComponent
  ],
  imports: [
    CommonModule,
    CarrerasRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CarrerasModule { }
