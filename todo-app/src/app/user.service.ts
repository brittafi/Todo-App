import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from './user.model';
import {CategoryService} from './category.service';
import {TaskService} from './task.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore, private catService: CategoryService, private taskService: TaskService) {
  }

  /**
   * all users, but without subcollections
   */
  async getUsers(): Promise<User[]> {
    // todo
    return [];
  }

  /*
  *  Promise will be <code>true</true> if adding user was successful
  */
  async addUser(): Promise<boolean> {
    //todo
    return false;
  }

}
