import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';

const routes: Routes = [
  {
    path: '',
    component: ListaComponent,
    children: [
      {
        path: 'listado',
        component: ListaComponent
      },
      {
        path: '**',
        component: ListaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AulasRoutingModule { }
