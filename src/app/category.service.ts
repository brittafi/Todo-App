import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Category} from './category.model';
import {error} from 'util';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFirestore) { }

  allCategories: Category [];

  /**
   * Promise of all categories created by a specific user
   * @param userName
   */
  async getAllCategories(userName: string): Promise<Category[]>{
    let categories: Category[] = [];
    await this.db.firestore.collection('users').doc(userName).collection('categories').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.id, ' => ', doc.data());
        categories.push(<Category> doc.data());
      });
    }).catch(
      error => console.log(error)
    );
    this.allCategories = categories;
    return categories;
  }

  /**
   * Promise will be <code>true</true> if adding task was successful
   * @param userName
   * @param category
   */
  async addCategory(userName: string, category: Category):Promise<boolean>{
    let success: boolean = false;
    await this.db.firestore.collection('users').doc(userName).collection('categories')
      .doc(category.title).set(category, {merge: true})
      .then(s => success = true)
      .catch(error => {
        console.log(error);
        success = false;
      });
    this.getAllCategories(userName);
    return success;
  }

  /**
   *  rename existing category
   * @param userName
   * @param originalCategoryId
   * @param updatedCategory
   */
  async renameCategory(userName: string, originalCategoryId: string, updatedCategory:Category):Promise<boolean>{
    let success: boolean = true;
    let fireBaseCategoriesRef = this.db.firestore.collection('users').doc(userName).collection('categories');
    await fireBaseCategoriesRef
      .doc(originalCategoryId).delete()
      .then()
      .catch(error => success=false);
    await fireBaseCategoriesRef
      .doc(updatedCategory.title).set(updatedCategory)
      .then()
      .catch(error => success = false);
    await this.updateCategoryForAllTasks(userName, originalCategoryId, updatedCategory);
    return success;
  }

  /**
   * rename category "originalCategoryId" to "updatedCategory.title" for all tasks created by <userName>
   * if no updatedCategory is specified, originalCategory will be removed instead
   * @param userName
   * @param originalCategoryId
   * @param updatedCategory?
   */
  async updateCategoryForAllTasks(userName: string, originalCategoryId: string, updatedCategory:Category = null){
    let fireBaseTasksRef = this.db.firestore.collection('users').doc(userName).collection('tasks');
    await fireBaseTasksRef.get().then(querySnapshot => {
      querySnapshot.forEach(document => {
        let task: Task = document.data();
        if(task.categories.map(cat => cat.title).includes(originalCategoryId)){
          let categories = task.categories.filter(cat => cat.title !== originalCategoryId);
          if(updatedCategory){
            categories.push(updatedCategory);
          }
          fireBaseTasksRef.doc(document.id).set({
            categories: categories
          }, {merge: true})
        }
      })
    })
  }

  /**
   * Promise will be <code>true</true> if deleting category was successful
   * @param userName
   * @param category
   */
  async deleteCategory(userName: string, category: Category):Promise<boolean>{
    let success: boolean = false;
    await this.db.firestore.collection('users').doc(userName).collection('categories')
      .doc(category.title).delete()
      .then(s => success = true)
      .catch(error => {
        console.log(error);
        success = false;
      });
    this.updateCategoryForAllTasks(userName, category.title);
    this.getAllCategories(userName);
    return success;
  }

}
