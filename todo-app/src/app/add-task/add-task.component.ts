import {Component, OnInit} from '@angular/core';
import {Task} from '../task.model';
import {TaskService} from '../task.service';
import {GetListComponent} from "../get-list/get-list.component";
import * as firebase from 'firebase';
import {UserService} from '../user.service';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  newTask: Task;
  deadline: string;
  private username: string;

  constructor(private taskService: TaskService, private getListComponent: GetListComponent, private userService: UserService) {
  }

  async ngOnInit() {
    await this.userService.getCurrentUser().then(res => this.username = res.username);
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
    if(this.deadline != ''){
      let deadlineDate: Date = new Date(Date.parse(this.deadline));
      this.newTask.deadline = firebase.firestore.Timestamp.fromDate(deadlineDate);
    }
    this.taskService.addTask(this.username, this.newTask).then(); // TODO: get real user name when implementing user registration
    this.getListComponent.getAllTasks();
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


