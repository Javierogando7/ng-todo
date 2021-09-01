import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { WorkTask } from './../../models/WorkTask';
import { TaskService } from './../../services/task.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TaskComponent implements OnInit {
  newTasks: WorkTask[] = [];
  completedTasks: WorkTask[] = [];
  private searchValue = new Subject<string>();

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  search(value: string): void {
    this.searchValue.next(value);
  }

  ngOnInit() {
    this.getAllTasks();

    this.searchValue
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((value: string) => this.taskService.getAllTasks(value))
      )
      .subscribe((res) => {
        this.addTaskList(res);
      });
  }

  getAllTasks() {
    this.taskService.getAllTasks('').subscribe((res) => {
      this.addTaskList(res);
    });
  }

  addTaskList(tasks: WorkTask[]) {
    let completedTasks: WorkTask[] = [];
    let newTasks: WorkTask[] = [];
    tasks.forEach((t) => {
      if (t.isCompleted) {
        completedTasks.push(t);
      } else {
        newTasks.push(t);
      }
    });
    this.completedTasks = completedTasks;
    this.newTasks = newTasks;
  }

  openDialog(task: any): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '250px',
      data: Object.assign({}, task),
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(task);
      if (task) {
        this.updateTask(result);
      } else {
        this.addTask(result);
      }
    });
  }

  updateTask(task: any) {
    this.taskService.updateTask(task).subscribe(() => {
      this.getAllTasks();
    });
  }

  addTask(task: any) {
    this.taskService.addTask(task).subscribe(() => {
      this.getAllTasks();
    });
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.getAllTasks();
    });
  }

  changeTaskIsComplete(event: any, task: WorkTask) {
    task.isCompleted = (event as HTMLInputElement).checked;
    this.updateTask(task);
  }
}
