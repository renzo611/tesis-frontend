import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimetablingRoutingModule } from './timetabling-routing.module';
import { TimetableComponent } from './timetable/timetable.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TimetableComponent
  ],
  imports: [
    CommonModule,
    TimetablingRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class TimetablingModule { }
