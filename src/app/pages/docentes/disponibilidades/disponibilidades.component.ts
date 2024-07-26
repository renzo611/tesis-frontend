import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DocentesService } from '../../../services/docentes.service';
import { MatDialogRef } from '@angular/material/dialog';
import { disponibilidad } from '../../../models/disponibilidad';

@Component({
  selector: 'app-disponibilidades',
  templateUrl: './disponibilidades.component.html',
  styleUrls: ['./disponibilidades.component.css']
})
export class DisponibilidadesComponent implements OnInit {
  @Input() id!:number;
  teacherForm: FormGroup;
  daysOfWeek = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
  newAvailabilitiesForm: FormGroup;
  existingAvailabilities: disponibilidad[] = [];

  constructor(private fb: FormBuilder, private docenteService: DocentesService) {
    this.teacherForm = this.fb.group({
      availabilities: this.fb.array([])
    });
    this.newAvailabilitiesForm = this.fb.group({
      availabilities: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadTeacherAvailabilities();
  }

  get availabilities(): FormArray {
    return this.newAvailabilitiesForm.get('availabilities') as FormArray;
  }

  addNewAvailability(): void {
    const availabilityGroup = this.fb.group({
      day: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
    this.availabilities.push(availabilityGroup);
  }

  removeNewAvailability(index: number): void {
    this.availabilities.removeAt(index);
  }

  loadTeacherAvailabilities(): void {
    this.docenteService.obtenerDisponibilidades(this.id).subscribe(
      (availabilities: disponibilidad[]) => {
        this.existingAvailabilities = availabilities;
      },
      (error) => {
        console.error('Error al cargar las disponibilidades', error);
      }
    );
  }

  onSubmit(): void {
    if (this.newAvailabilitiesForm.valid) {
      this.docenteService.agregarDispobilidad(this.id, this.newAvailabilitiesForm.value.availabilities).subscribe(
        response => {
          console.log('Disponibilidades registradas con éxito', response);
          this.loadTeacherAvailabilities(); // Refresh the list after adding new availabilities
          this.clearNewAvailabilities(); // Clear the form after submission
        },
        error => {
          console.error('Error al registrar disponibilidades', error);
        }
      );
    }
  }

  clearNewAvailabilities(): void {
    while (this.availabilities.length) {
      this.availabilities.removeAt(0);
    }
  }
}