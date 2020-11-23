import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {Task} from '../task.model';
import {Element} from '@angular/compiler';
import {tryCatch} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-get-list',
  templateUrl: './get-list.component.html',
  styleUrls: ['./get-list.component.css']
})

export class GetListComponent implements OnInit {

  private uName: string;
  public todoList;
  editableTask: Task;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.taskService.getAllTasks('cebr76').then(
      res => this.todoList = res
    );
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
        this.ngOnInit();
      }); // TODO: get real user name when implementing user registration

    }
  }
}
