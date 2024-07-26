import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AulasRoutingModule } from './aulas-routing.module';
import { ListaComponent } from './lista/lista.component';
import { MaterialModule } from '../../material/material.module';
import { RegistrarComponent } from './registrar/registrar.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListaComponent,
    RegistrarComponent
  ],
  imports: [
    CommonModule,
    AulasRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AulasModule { }
