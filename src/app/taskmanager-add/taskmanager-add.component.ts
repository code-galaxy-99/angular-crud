import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { TaskmanagerService } from "../services/taskmanager-service.service";

@Component({
  selector: 'app-taskmanager-add',
  templateUrl: './taskmanager-add.component.html',
  styleUrls: ['./taskmanager-add.component.scss']
})
export class TaskmanagerAddComponent implements OnInit {
  uploadForm: FormGroup;
  submitted = false;

  constructor(public dialogRef: MatDialogRef<TaskmanagerAddComponent>, private formBuilder: FormBuilder, private httpClient: HttpClient, private taskmanagerService: TaskmanagerService) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      description: ['', Validators.required],
      id: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  get f() { return this.uploadForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.uploadForm.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('description', this.uploadForm.get('description').value);
    formData.append('id', this.uploadForm.get('id').value);
    formData.append('priority', this.uploadForm.get('priority').value);
    formData.append('status', this.uploadForm.get('status').value);

    let formobj = {
      'description': this.uploadForm.get('description').value,
      'id': this.uploadForm.get('id').value,
      'priority': this.uploadForm.get('priority').value,
      'status': this.uploadForm.get('status').value
    }
    this.onAddCustomer(formobj);
  }

  public onAddCustomer(formobj: Object): void {
    this.taskmanagerService.addTaskmanager(formobj).subscribe(data => {
      this.dialogRef.close();
    }, error => {
      alert("Please try after sometime.");
      console.log(error);
    });
  }

}
