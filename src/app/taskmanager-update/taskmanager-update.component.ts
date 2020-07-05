import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';
import { TaskmanagerService } from "../services/taskmanager-service.service";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-taskmanager-update',
  templateUrl: './taskmanager-update.component.html',
  styleUrls: ['./taskmanager-update.component.scss']
})
export class TaskmanagerUpdateComponent implements OnInit {
  uploadForm: FormGroup;
  submitted = false;

  constructor(public dialogRef: MatDialogRef<TaskmanagerUpdateComponent>, private formBuilder: FormBuilder, private httpClient: HttpClient, private taskmanagerService: TaskmanagerService, @Inject(MAT_DIALOG_DATA) public name: any) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      description: ['', Validators.required],
      id: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.fillForm();
  }

  fillForm() {
    let name = this.name['dataKey'];
    this.taskmanagerService.getTaskmanager(name).subscribe(data => {
      if (data.description) {
        this.uploadForm.controls["description"].setValue(data.description);
      }
      if (data.id) {
        this.uploadForm.controls["id"].setValue(data.id);
      }
      if (data.priority) {
        this.uploadForm.controls["priority"].setValue(data.priority);
      }
      if (data.status) {
        this.uploadForm.controls["status"].setValue(data.status);
      }
    }, error => {
      alert("Please try after sometime.");
      console.log(error);
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
    this.onUpdateCustomer(formobj);
  }

  public onUpdateCustomer(formobj: Object): void {
    this.taskmanagerService.updateTaskmanager(formobj, this.name['dataKey']).subscribe(data => {
      this.dialogRef.close();
    }, error => {
      alert("Please try after sometime.");
      console.log(error);
    });
  }

}
