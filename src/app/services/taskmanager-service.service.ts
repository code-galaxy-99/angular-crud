import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators';
import { Taskmanager } from "../taskmanager";

@Injectable({
  providedIn: 'root'
})
export class TaskmanagerService {

  private serverUrl = 'https://tasksmanager-302f5.firebaseio.com/Task.json';
  private serverTaskUrl = 'https://tasksmanager-302f5.firebaseio.com/Task';

  constructor(private http: HttpClient) { }

  getTaskmanagerList(): Observable<any> {
    return this.http
      .get<Taskmanager[]>(this.serverUrl)
      .pipe(
        map(data => data)
        //,tap(console.log)
      );
  }

  addTaskmanager(taskmanager: Object): Observable<any> {
    return this.http.post(this.serverUrl, taskmanager);
  }

  updateTaskmanager(taskmanager: Object, name: string): Observable<Object> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json");
    let url = `${this.serverTaskUrl}/${name}` + '.json';
    return this.http.put(url, taskmanager, { headers });
  }

  deleteTaskmanager(name: string): Observable<any> {
    let url = `${this.serverTaskUrl}/${name}` + '.json';
    return this.http.delete(url);
  }

  getTaskmanager(name: string): Observable<any> {
    let url = `${this.serverTaskUrl}/${name}` + '.json';
    return this.http.get(url);
  }
}

