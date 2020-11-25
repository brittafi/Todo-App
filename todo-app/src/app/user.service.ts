import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) {
  }

  /**
   * sign in user using username & password
   * @param username
   * @param password
   */
  async signIn(username: string, password: string): Promise<User>{
      console.log("sign in user: " +  username);
      return null;
  }

  /**
   * create new user using username & password
   * @param username
   * @param password
   */
  async signUp(username: string, password: string): Promise<User>{
      console.log("sign up user: " +  username);
      return null;
  }

  /**
   * sign out current user
   */
  async signOut(){
      console.log("sign out");
  }

  /**
   * get current user
   */
  async getCurrentUser(): Promise<User> {
    console.log("current user: xxx");
    return null;
  }

  /**
   * all users, but without subcollections (tasks and categories)
   */
  async getUsers(): Promise<User[]> {
    let users: User[] = [];
    await this.db.firestore.collection('users').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.id, ' => ', doc.data());
        users.push(<User> doc.data());
      });
    }).catch(
      error => console.log(error)
    );
    return users;
  }

  /*
  *  Promise will be <code>true</true> if adding user was successful
  * Pass existing username to update user values
  */
  async addOrUpdateUser(user: User): Promise<boolean> {
    let success: boolean = false;
    await this.db.firestore.collection('users')
      .doc(user.username).set(user, {merge: true})
      .then(s => success = true)
      .catch(error => {
        console.log(error);
        success = false;
      });
    return success;
  }

}
