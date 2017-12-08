import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventShortComponent } from './event-short.component';

describe('EventShortComponent', () => {
  let component: EventShortComponent;
  let fixture: ComponentFixture<EventShortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventShortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
