import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDatoComplementarioPnaturalComponent } from './modal-dato-complementario-pnatural.component';

describe('ModalDatoComplementarioPnaturalComponent', () => {
  let component: ModalDatoComplementarioPnaturalComponent;
  let fixture: ComponentFixture<ModalDatoComplementarioPnaturalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDatoComplementarioPnaturalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDatoComplementarioPnaturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
