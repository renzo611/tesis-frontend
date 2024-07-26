import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListadoComponent } from './listado/listado.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ModificarComponent } from './modificar/modificar.component';
import { RegistrarComponent } from './registrar/registrar.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VerDetallesComponent } from './ver-detalles/ver-detalles.component';


@NgModule({
  declarations: [
    ListadoComponent,
    ConfirmDialogComponent,
    ModificarComponent,
    RegistrarComponent,
    VerDetallesComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UsuariosModule { }
