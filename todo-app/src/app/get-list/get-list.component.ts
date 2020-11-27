import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {Task} from '../task.model';
import {Element} from '@angular/compiler';
import {tryCatch} from 'rxjs/internal-compatibility';
import {UserService} from '../user.service';

@Component({
  selector: 'app-get-list',
  templateUrl: './get-list.component.html',
  styleUrls: ['./get-list.component.css']
})

export class GetListComponent implements OnInit {

  public todoList: Task[];
  public doneList;
  editableTask: Task;
  username: string;

  constructor(private taskService: TaskService, private userService: UserService) {
  }

  async ngOnInit() {
    await this.userService.getCurrentUser().then(res => this.username = res.username);
    this.getAllTasks();
    this.editableTask = {
      id: '',
      title: '',
      description: '',
      priority: 3,
      done: false,
      categories: []
    };
  }

  getAllTasks() {
    this.taskService.getAllTasks(this.username).then(
      res => {
        this.todoList = res.filter(task => task.done == false)
        this.doneList = res.filter(task => task.done == true)
      }
    );
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
      this.taskService.updateTask(this.username, this.editableTask).then(() => {
        this.getAllTasks();
      });
    }
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(this.username, task).then(r => this.getAllTasks())
  }

  setTaskDone(task: Task) {
    task.done = true;
    this.taskService.updateTask(this.username, task).then( r => this.getAllTasks());
  }
}
