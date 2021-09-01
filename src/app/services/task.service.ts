import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkTask } from '../models/WorkTask';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  baseUrl = environment.apiUrl + 'task';

  constructor(private httpClient: HttpClient) {}

  getAllTasks(searchValue: string): Observable<WorkTask[]> {
    let searchParam;
    if (searchValue) {
      searchParam = { search: searchValue }
    }
    return this.httpClient.get<WorkTask[]>(this.baseUrl, { params: searchParam });
  }

  addTask(task: any) {
    return this.httpClient.post(this.baseUrl, task);
  }

  updateTask(task: any) {
    return this.httpClient.put(this.baseUrl + '/' + task.id, task);
  }

  deleteTask(taskId: number) {
    return this.httpClient.delete(this.baseUrl + '/' + taskId);
  }
}
