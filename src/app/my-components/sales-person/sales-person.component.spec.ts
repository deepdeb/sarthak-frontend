import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPersonComponent } from './sales-person.component';

describe('SalesPersonComponent', () => {
  let component: SalesPersonComponent;
  let fixture: ComponentFixture<SalesPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesPersonComponent]
    });
    fixture = TestBed.createComponent(SalesPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
