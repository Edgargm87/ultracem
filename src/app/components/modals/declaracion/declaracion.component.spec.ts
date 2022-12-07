import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclaracionComponent } from './declaracion.component';

describe('DeclaracionComponent', () => {
  let component: DeclaracionComponent;
  let fixture: ComponentFixture<DeclaracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclaracionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclaracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
