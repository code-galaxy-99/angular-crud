import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmanagerListComponent } from './taskmanager-list.component';

describe('TaskmanagerListComponent', () => {
  let component: TaskmanagerListComponent;
  let fixture: ComponentFixture<TaskmanagerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskmanagerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskmanagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
