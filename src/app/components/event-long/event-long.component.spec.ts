import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLongComponent } from './event-long.component';

describe('EventLongComponent', () => {
  let component: EventLongComponent;
  let fixture: ComponentFixture<EventLongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventLongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventLongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
