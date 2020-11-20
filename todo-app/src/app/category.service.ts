import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Category} from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFirestore) { }

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
    return categories;
  }

  /**
   * Promise will be <code>true</true> if adding task was successful
   * Pass existing category id to update category values
   * @param userName
   * @param category
   */
  async addOrUpdateCategory(userName: string, category: Category):Promise<boolean>{
    let success: boolean = false;
    await this.db.firestore.collection('users').doc(userName).collection('categories')
      .doc(category.title).set(category, {merge: true})
      .then(s => success = true)
      .catch(error => {
        console.log(error);
        success = false;
      });
    return success;
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
    return success;
  }

}
