import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmarDocumentosComponent } from './firmar-documentos.component';

describe('FirmarDocumentosComponent', () => {
  let component: FirmarDocumentosComponent;
  let fixture: ComponentFixture<FirmarDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmarDocumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmarDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
