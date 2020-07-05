import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, from } from "rxjs";
import { Taskmanager } from "../taskmanager";
import { Router } from '@angular/router';
import { TaskmanagerService } from "../services/taskmanager-service.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { TaskmanagerAddComponent } from '../taskmanager-add/taskmanager-add.component';
import { TaskmanagerUpdateComponent } from '../taskmanager-update/taskmanager-update.component';
import { NgxSpinnerService } from "ngx-spinner";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-taskmanager-list',
  templateUrl: './taskmanager-list.component.html',
  styleUrls: ['./taskmanager-list.component.scss']
})
export class TaskmanagerListComponent implements OnInit {
  taskmanager: Array<any>;
  dataSource: MatTableDataSource<Taskmanager>;
  displayedColumns: any[] = ['description', 'id', 'priority', 'status', 'CRUD Action'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private taskmanagerService: TaskmanagerService,
    private router: Router, private dialog: MatDialog, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.taskmanager = [];
    this.loadTasklistData();
  }

  loadTasklistData() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.taskmanagerService.getTaskmanagerList().subscribe(data => {
        this.taskmanager = data;
        let dataobj = [];
        for (let key in data) {
          let value = data[key];
          let obj = { name: key, description: value.description, id: value.id, priority: value.priority, status: value.status };
          dataobj.push(obj);
        }
        this.taskmanager = dataobj;
        this.dataSource = new MatTableDataSource(this.taskmanager);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, error => {
        console.log(error);
      });
    }, 2000);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addTaskmanager() {
    const dialogAdd = this.dialog.open(TaskmanagerAddComponent);
    dialogAdd.afterClosed().subscribe(() => {
      this.loadTasklistData();
    });
  }

  deleteTask(name: string) {
    this.taskmanagerService.deleteTaskmanager(name).subscribe(data => {
      this.loadTasklistData();
    }, error => {
      console.log(error);
    });
  }

  updateTask(name: string) {
    const dialogUpdate = this.dialog.open(TaskmanagerUpdateComponent, {
      data: {
        dataKey: name
      }
    });

    dialogUpdate.afterClosed().subscribe(() => {
      this.loadTasklistData();
    });
  }

}
