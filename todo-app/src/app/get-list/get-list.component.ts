import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {Task} from '../task.model';
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
  filterword: string;

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

  async getAllTasks() {
    await this.taskService.getAllTasks(this.username).then(
      res => {
        this.todoList = res.filter(task => task.done === false);
        this.doneList = res.filter(task => task.done === true);
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

  confirmEdit() {
    this.editableTask.title = document.getElementById(this.editableTask.id + '-title').innerText;
    this.editableTask.description = document.getElementById(this.editableTask.id + '-description').innerText;
    this.editableTask.priority = parseInt(document.getElementById(this.editableTask.id + '-priority').innerText);

    if (this.editableTask.title.length === 0) {
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
    this.taskService.deleteTask(this.username, task).then(() => this.getAllTasks());
  }

  setTaskDone(task: Task) {
    task.done = true;
    this.taskService.updateTask(this.username, task).then(() => this.getAllTasks());
  }

  async filter() { // TODO: case sensitivity?
    await this.getAllTasks();
    if (this.filterword != null && this.filterword.trim().length !== 0) {
      this.todoList = this.todoList.filter(task => filterCrit(task.title, task.description, this.filterword));
      this.doneList = this.doneList.filter(task => filterCrit(task.title, task.description, this.filterword));
    }

    function filterCrit(target1: string, target2: string,  search: string): boolean {
      search = search.trim().toLowerCase();
      return target1.trim().toLowerCase().includes(search) || target2.trim().toLowerCase().includes(search);
    }
  }


}
