import {Component, OnInit} from '@angular/core';
import {Task} from '../task.model';
import {TaskService} from '../task.service';
import {GetListComponent} from "../get-list/get-list.component";
import * as firebase from 'firebase';



@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit {

  newTask: Task;
  deadline: string;
  testPriorities = ['sehr hoch', 'hoch', 'mittel', 'niedrig', 'sehr niedrig'];

  constructor(private taskService: TaskService, private getListComponent: GetListComponent) {
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
    console.log(this.newTask.priority);

    if (this.newTask.title.length === 0) {
      this.showWarning('Die Aufgabe muss einen Titel haben.');
      return;
    }
    if(this.deadline != ''){
      let deadlineDate: Date = new Date(Date.parse(this.deadline));
      this.newTask.deadline = firebase.firestore.Timestamp.fromDate(deadlineDate);
    } else {
      this.showWarning('Die Aufgabe muss eine Deadline haben.');
    }
    this.taskService.addTask('cebr76', this.newTask); // TODO: get real user name when implementing user registration
    this.getListComponent.getAllTasks('cebr76');
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

  showWarning(warning: string) {
    alert(warning);
  }
}


