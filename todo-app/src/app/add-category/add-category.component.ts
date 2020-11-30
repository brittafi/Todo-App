import { Component, OnInit } from '@angular/core';
import {Category} from '../category.model';
import {CategoryService} from '../category.service';
import {GetListComponent} from '../get-list/get-list.component';
import * as firebase from 'firebase';
import {UserService} from '../user.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  newCategory: Category;
  private username: string;
  constructor(private categoryService: CategoryService, private getListComponent: GetListComponent, private userService: UserService) {
    this.newCategory = {
      title: ''
    };
  }

  async ngOnInit() {
    await this.userService.getCurrentUser().then(res => this.username = res.username);
  }
  cancel() {
    document.getElementById('app-add-category').style.display = 'none';
    document.getElementById('btn-add-category').style.display = 'block';
    this.resetCategory();
  }
  confirm() {
    if (this.newCategory.title.length === 0) {
      this.showWarning();
      return;
    }
    this.categoryService.addOrUpdateCategory(this.username, this.newCategory).then();
    this.getListComponent.getCategoryList();
    this.resetCategory();
    document.getElementById('app-add-category').style.display = 'none';
    document.getElementById('btn-add-category').style.display = 'block';
  }
  resetCategory() {
    this.newCategory = {
      title: ''
    };
  }
  showWarning() {
    alert('Please add a title.');
  }
}
