import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Task} from './task.model';
import * as firebase from 'firebase';

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
    let tasks: Task[] = [];
    await this.db.firestore.collection('users').doc(userName).collection('tasks')
      .orderBy('created','asc').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        //console.log(doc.id, ' => ', doc.data());
        let task: Task = <Task> doc.data();
        task.id = doc.id;
        tasks.push(task);
      });
    }).catch(
      error => console.log(error)
    );
    return tasks;
  }

  /**
   * Promise will be <code>true</code> if adding task was successful
   * @param userName
   * @param task
   */
  async addTask(userName: string, task:Task): Promise<boolean> {
    let success: boolean = false;
    task.created = firebase.firestore.FieldValue.serverTimestamp();
    await this.db.firestore.collection('users').doc(userName).collection('tasks')
      .add(task)
      .then(s => success = true)
      .catch(error => {
        console.log(error);
        success = false;
      });
    return success;
  }


  /**
   * Promise will be <code>true</code> if updating task was successful
   * @param userName
   * @param task
   */
  async updateTask(userName: string, task:Task): Promise<boolean> {
    let success: boolean = false;
    await this.db.firestore.collection('users').doc(userName).collection('tasks')
      .doc(task.id).set(task, {merge: true})
      .then(s => success = true)
      .catch(error => {
        console.log(error);
        success = false;
      });
    return success;
  }

  /**
   * Promise will be <code>true</true> if deleting task was successful
   * @param userName
   * @param task
   */
  async deleteTask(userName: string, task:Task): Promise<boolean>{
    let success: boolean = false;
    await this.db.firestore.collection('users').doc(userName).collection('tasks')
      .doc(task.id).delete()
      .then(s => success = true)
      .catch(error => {
        console.log(error);
        success = false;
      });
    return success;
  }

}
