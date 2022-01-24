import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonServicioClienteComponent } from './boton-servicio-cliente.component';

describe('BotonServicioClienteComponent', () => {
  let component: BotonServicioClienteComponent;
  let fixture: ComponentFixture<BotonServicioClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonServicioClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonServicioClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
