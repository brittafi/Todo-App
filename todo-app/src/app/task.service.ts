import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Task} from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private db: AngularFirestore) {}

  /**
   * Promise of all tasks created by a specific user
   * @param userName
   */
  async getAllTasks(userName: string): Promise<Task[]> {
    //todo
    return [];
  }

  /**
   * Promise will be <code>true</code> if adding task was successful
   * @param userName
   * @param task
   */
  async addTask(userName: string, task:Task): Promise<boolean> {
    //todo
    return false;
  }

  /**
   * Promise will be <code>true</code> if updating task was successful
   * @param userName
   * @param task
   */
  async updateTask(userName: string, task:Task): Promise<boolean>{
    //todo
    return false;
  }

  /**
   * Promise will be <code>true</true> if deleting task was successful
   * @param userName
   * @param task
   */
  async deleteTask(userName: string, task:Task): Promise<boolean>{
    //todo
    return false;
  }

}
