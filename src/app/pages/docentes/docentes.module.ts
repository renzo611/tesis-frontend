import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocentesRoutingModule } from './docentes-routing.module';
import { ListadoComponent } from './listado/listado.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DisponibilidadesComponent } from './disponibilidades/disponibilidades.component';


@NgModule({
  declarations: [
    ListadoComponent,
    RegistrarComponent,
    DisponibilidadesComponent
  ],
  imports: [
    CommonModule,
    DocentesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class DocentesModule { }
