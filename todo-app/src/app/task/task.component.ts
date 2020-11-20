import {Component, OnInit} from '@angular/core';
import {Task} from '../task.model';
import {TaskService} from '../task.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  task: Task;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.taskService.getAllTasks('test');
  }

  showForm() {
    const form = document.getElementById('app-add-task');
    form.style.display = 'block';
  }

}
