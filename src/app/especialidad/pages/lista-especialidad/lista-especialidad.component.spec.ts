import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEspecialidadComponent } from './lista-especialidad.component';

describe('ListaEspecialidadComponent', () => {
  let component: ListaEspecialidadComponent;
  let fixture: ComponentFixture<ListaEspecialidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaEspecialidadComponent]
    });
    fixture = TestBed.createComponent(ListaEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
