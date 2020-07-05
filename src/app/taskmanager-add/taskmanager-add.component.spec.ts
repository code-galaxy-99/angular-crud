import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskmanagerAddComponent } from './taskmanager-add.component';

describe('TaskmanagerAddComponent', () => {
  let component: TaskmanagerAddComponent;
  let fixture: ComponentFixture<TaskmanagerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskmanagerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskmanagerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
