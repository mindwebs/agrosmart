import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataChartsComponent } from './data-charts.component';

describe('DataChartsComponent', () => {
  let component: DataChartsComponent;
  let fixture: ComponentFixture<DataChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
