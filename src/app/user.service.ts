import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from './user.model';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
  }

  /**
   * sign in user using username & password
   * @param username
   * @param password
   */
  async signIn(username: string, password: string): Promise<User>{
      let fake_email = username + "@kms-todo.de";
      let user: User = null;
      await this.auth.auth.signInWithEmailAndPassword(fake_email, password)
        .then(async firebaseUser => {
          user = await this.getUser(firebaseUser.user.email.split('@')[0]);
        });
      return user;
  }

  /**
   * create new user using username & password
   * @param username
   * @param password
   */
  async signUp(username: string, password: string): Promise<User>{
      let fake_email = username + "@kms-todo.de";
      let user: User;
      await this.auth.auth.createUserWithEmailAndPassword(fake_email, password)
        .then(firebaseUser => {
          // create user entry in database
          this.db.firestore.collection('users').doc(username).set({
            username: username
          });
          // create user object to return
          user = {
            username: username,
            password: password
          }
        });
      return user;
  }

  /**
   * sign out current user
   */
  async signOut(){
      await this.auth.auth.signOut();
      console.log("sign out");
  }

  /**
   * get current user
   */
  async getCurrentUser(): Promise<User> {
    if(this.auth.auth.currentUser == null) return null;
    let currentUserMail = this.auth.auth.currentUser.email;
    let currentUser: User = await this.getUser(currentUserMail.split('@')[0]);
    return currentUser;
  }

  /**
   * get single user by password
   */
  async getUser(username: string): Promise<User> {
    let user: User = null;
    await this.db.firestore.collection('users').doc(username).get().then(querySnapshot => {
      user = querySnapshot.data();
    }).catch(
      error => console.log(error)
    );
    return user;
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
