import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlHeaderComponent } from './nl-header.component';

describe('NlHeaderComponent', () => {
  let component: NlHeaderComponent;
  let fixture: ComponentFixture<NlHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
