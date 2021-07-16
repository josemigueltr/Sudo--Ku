import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificarProductoComponent } from './calificar-producto.component';

describe('CalificarProductoComponent', () => {
  let component: CalificarProductoComponent;
  let fixture: ComponentFixture<CalificarProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalificarProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
