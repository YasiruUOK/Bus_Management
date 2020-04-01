import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbusComponent } from './viewbus.component';

describe('ViewbusComponent', () => {
  let component: ViewbusComponent;
  let fixture: ComponentFixture<ViewbusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewbusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewbusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
