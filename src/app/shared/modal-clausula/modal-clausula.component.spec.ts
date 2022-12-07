import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalClausulaComponent } from './modal-clausula.component';

describe('ModalClausulaComponent', () => {
  let component: ModalClausulaComponent;
  let fixture: ComponentFixture<ModalClausulaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalClausulaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalClausulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
