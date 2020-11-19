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
    //todo
    return [];
  }

  /**
   * Promise will be <code>true</true> if adding task was successful
   * @param userName
   * @param category
   */
  async addCategory(userName: string, category: Category):Promise<boolean>{
    //todo
    return false;
  }

  /**
   * Promise will be <code>true</code> if updating category was successful
   * @param userName
   * @param category
   */
  async updateCategory(userName: string, category: Category):Promise<boolean>{
    //todo
    return false;
  }

  /**
   * Promise will be <code>true</true> if deleting category was successful
   * @param userName
   * @param category
   */
  async deleteCategory(userName: string, category: Category):Promise<boolean>{
    //todo
    return false;
  }

}
