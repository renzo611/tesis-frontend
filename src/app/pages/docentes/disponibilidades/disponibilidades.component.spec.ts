import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilidadesComponent } from './disponibilidades.component';

describe('DisponibilidadesComponent', () => {
  let component: DisponibilidadesComponent;
  let fixture: ComponentFixture<DisponibilidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisponibilidadesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisponibilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
