import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoPublicoComponent } from './cargo-publico.component';

describe('CargoPublicoComponent', () => {
  let component: CargoPublicoComponent;
  let fixture: ComponentFixture<CargoPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoPublicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargoPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
