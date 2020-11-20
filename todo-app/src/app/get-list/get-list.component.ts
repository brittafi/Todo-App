import { Component, OnInit } from '@angular/core';
import {TaskService} from '../task.service';
import {Task} from '../task.model';

@Component({
  selector: 'app-get-list',
  templateUrl: './get-list.component.html',
  styleUrls: ['./get-list.component.css']
})

export class GetListComponent implements OnInit {

  private uName: string;
  public todoList;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.taskService.getAllTasks('cebr76').then(
      res => this.todoList = res
    );
   /* const service: TaskService = new TaskService();
    service.getAllTasks('Test');*/
  }
}
