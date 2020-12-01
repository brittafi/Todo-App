import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {Task} from '../task.model';

import {UserService} from '../user.service';
import {Category} from '../category.model';
import {CategoryService} from '../category.service';


@Component({
  selector: 'app-get-list',
  templateUrl: './get-list.component.html',
  styleUrls: ['./get-list.component.css']
})

export class GetListComponent implements OnInit {

  public todoList: Task[];
  public doneList: Task[];
  public categoryList: Category[];
  editableTask: Task;
  editableCategory: Category;
  username: string;
  active = 1;
  editableCategorie: boolean;
  filterword: string;
  filtercategory: string;
  newCategory: Category;

  constructor(private taskService: TaskService, private userService: UserService, private categoryService: CategoryService) {

  }

  async ngOnInit() {
    await this.userService.getCurrentUser().then(res => this.username = res.username);
    this.getAllTasks();
    this.getCategoryList();
    this.editableTask = {
      id: '',
      title: '',
      description: '',
      priority: 3,
      done: false,
      categories: []
    };
    this.editableCategory = {
      title: ''
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



  getIconClassForPriority(priority: number){
    switch(priority.toString()){
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
    document.getElementById('btn-add-category').style.display = 'none';
  }

  showCategoryForm() {
    document.getElementById('app-add-category').style.display = 'block';
    document.getElementById('btn-add-task').style.display = 'none';
    document.getElementById('btn-add-category').style.display = 'none';
  }

  editTask(task: Task) {
    this.editableTask = task;
  }
  editCategory(category: Category) {
    this.editableCategory = category;
  }
  confirmEdit() {
    this.editableTask.title = document.getElementById(this.editableTask.id + '-title').innerText;
    this.editableTask.description = document.getElementById(this.editableTask.id + '-description').innerText;

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
  confirmEditCategory() {
    this.editableCategory.title = document.getElementById(this.editableCategory.title + '-title').innerText;
    if(this.editableCategory.title == null) {
      this.editableCategorie = null;
    }
    if (this.editableCategory.title.length === 0) {
      alert('Please add a title.');
    } else {
      this.categoryService.addOrUpdateCategory(this.username, this.editableCategory).then(() => {
        this.getCategoryList();
      });
    }
  }
  deleteTask(task: Task) {
    this.taskService.deleteTask(this.username, task).then(() => this.getAllTasks());
  }
  deleteCategory(category: Category) {
    this.categoryService.deleteCategory(this.username, category).then(() => this.getCategoryList());
  }

  setTaskDone(task: Task) {
    task.done = true;
    this.taskService.updateTask(this.username, task).then(() => this.getAllTasks());
  }

  async filter() { // TODO: case sensitivity?
    await this.getAllTasks();
    await this.getCategoryList();

    if (this.filterword != null && this.filterword.trim().length !== 0) {
      this.todoList = this.todoList.filter(task => filterCrit(task.title, task.description, this.filterword));
      this.doneList = this.doneList.filter(task => filterCrit(task.title, task.description, this.filterword));
    }

    if (this.filtercategory != null) {
      this.todoList = this.filterCategory(this.todoList, this.filtercategory);
      this.doneList = this.todoList;
      this.categoryList = this.categoryList.filter(cat => cat.title == this.filtercategory);
    }

    function filterCrit(target1: string, target2: string, search: string): boolean {
      search = search.trim().toLowerCase();
      return target1.trim().toLowerCase().includes(search) || target2.trim().toLowerCase().includes(search);
    }
  }

  filterCategory(tasks: Task[], filter: String) {
    let catTasks: Task[] = [];
    for(let task of tasks) {
      for(let cat of task.categories) {
        if(cat.title == filter) {
          catTasks.push(task);
        }
      }
    }
    return catTasks;
  }

  resetFilterCategory() {
    this.filtercategory = null;
    this.filter().then();
  }

  async getCategoryList() {
    await this.categoryService.getAllCategories(this.username).then( res => {
      this.categoryList = res;
    });
    console.log("categorylist: " + this.categoryList);
  }

  getSelectedCat(titleC: string){
    console.log(this.categoryList.find(e => e.title == titleC));
  }
}
