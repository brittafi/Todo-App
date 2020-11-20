import { Component, OnInit } from '@angular/core';
import {Task} from '../task.model';
import {TaskService} from '../task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  newTask: Task;
  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

}
