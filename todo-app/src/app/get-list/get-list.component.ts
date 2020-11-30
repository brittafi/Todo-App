import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {Task} from '../task.model';
import {Element} from '@angular/compiler';
import {tryCatch} from 'rxjs/internal-compatibility';
import {defaultIfEmpty} from 'rxjs/operators';

@Component({
  selector: 'app-get-list',
  templateUrl: './get-list.component.html',
  styleUrls: ['./get-list.component.css']
})

export class GetListComponent implements OnInit {

  private uName: string;
  public todoList: Task[];
  public doneList;
  editableTask: Task;

  constructor(private taskService: TaskService) {
    this.uName = 'cebr76';
  }

  ngOnInit() {
    this.getAllTasks(this.uName);
    this.editableTask = {
      id: '',
      title: '',
      description: '',
      priority: 3,
      done: false,
      categories: []
    };
    /* const service: TaskService = new TaskService();
     service.getAllTasks('Test');*/
  }

  getAllTasks(uName: string) {
    this.taskService.getAllTasks(uName).then(
      res => {
        this.todoList = res.filter(task => task.done == false)
        this.doneList = res.filter(task => task.done == true)
      }
    );
  }

  getIconClassForPriority(t: Task){
    switch(t.priority.toString()){
      case "1": return 'fa-angle-double-down fa-2x';
      case "2": return 'fa-angle-down fa-2x';
      case "3": return 'fa-bars fa-lg';
      case "4": return 'fa-angle-up fa-2x';
      case "5": return 'fa-angle-double-up fa-2x';
    }
  }

  showForm() {
    document.getElementById('app-add-task').style.display = 'block';
    document.getElementById('btn-add-task').style.display = 'none';
  }

  editTask(task: Task) {
    this.editableTask = task;
  }

  confirmEdit(task: Task) {
    this.editableTask.title = document.getElementById(this.editableTask.id + '-title').innerText;
    this.editableTask.description = document.getElementById(this.editableTask.id + '-description').innerText;
    this.editableTask.priority = parseInt(document.getElementById(this.editableTask.id + '-priority').innerText);

    if (this.editableTask.title.length == 0) {
      alert('Please add a title.');
    } else if (isNaN(this.editableTask.priority) || this.editableTask.priority < 1 || this.editableTask.priority > 5) {
      alert('Priority must be a number between 1 (very low) and 5 (very high).');
    } else {
      this.taskService.updateTask('cebr76', this.editableTask).then(() => {
        this.getAllTasks(this.uName);
      }); // TODO: get real user name when implementing user registration
    }
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(this.uName, task).then(r => this.getAllTasks(this.uName))
  }

  setTaskDone(task: Task) {
    task.done = true;
    this.taskService.updateTask(this.uName, task).then( r => this.getAllTasks(this.uName));
  }
}
