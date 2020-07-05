import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmanagerUpdateComponent } from './taskmanager-update.component';

describe('TaskmanagerUpdateComponent', () => {
  let component: TaskmanagerUpdateComponent;
  let fixture: ComponentFixture<TaskmanagerUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskmanagerUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskmanagerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
