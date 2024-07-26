import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimetableComponent } from './timetable/timetable.component';

const routes: Routes = [
  {
    path: '',
    component: TimetableComponent,
    children: [
      {
        path: 'principal',
        component: TimetableComponent
      },
      {
        path: '**',
        component: TimetableComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimetablingRoutingModule { }
