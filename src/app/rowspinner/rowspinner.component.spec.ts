import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowspinnerComponent } from './rowspinner.component';

describe('RowspinnerComponent', () => {
  let component: RowspinnerComponent;
  let fixture: ComponentFixture<RowspinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowspinnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowspinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
