import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {TaskService} from './task.service';
import {CategoryService} from './category.service';
import { Task } from './task.model';
import {Category} from './category.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private userService: UserService, private taskService: TaskService, private categoryService: CategoryService){}

  ngOnInit(){
    // usage examples // todo delete
    this.userService.getUsers().then(
      res => console.log(res)
    );
    let category1: Category = {
      title: 'work'
    };
    let category2: Category = {
      title: 'household'
    };
    this.categoryService.addOrUpdateCategory('cebr76', category1);
    this.categoryService.addOrUpdateCategory('cebr76', category2);
    this.categoryService.getAllCategories('cebr76').then();
    let task: Task = {
      title: 'new task!',
      description: 'add some description',
      priority: 5,
      categories: ['study', 'work', 'household'],
      done: false
    };
    this.taskService.addTask('cebr76', task).then();
    this.taskService.getAllTasks('cebr76').then(
      res => console.log(res)
    );
  }

}
