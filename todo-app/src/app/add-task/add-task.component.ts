import {Component, OnInit} from '@angular/core';
import {Task} from '../task.model';
import {TaskService} from '../task.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  newTask: Task;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.newTask = {
      title: '',
      description: '',
      priority: 3,
      done: false,
      categories: []
    };
  }

  cancel() {
    document.getElementById('app-add-task').style.display = 'none';
    document.getElementById('btn-add-task').style.display = 'block';
    this.resetTask();
  }

  confirm() {
    if (this.newTask.title.length === 0) {
      this.showWarning();
      return;
    }
    this.taskService.addTask('cebr76', this.newTask); // TODO: get real user name when implementing user registration
    //console.log(this.taskService.getAllTasks('cebr76')); // only for debugging
    this.resetTask();
    document.getElementById('app-add-task').style.display = 'none';
    document.getElementById('btn-add-task').style.display = 'block';

  }

  resetTask() {
    this.newTask = {
      title: '',
      description: '',
      priority: 3,
      done: false,
      categories: []
    };
  }

  showWarning() {
    alert('Please add a title.');
  }
}


