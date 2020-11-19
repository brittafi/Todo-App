import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private db: AngularFirestore) {
    // todo remove; just for testing
    const things = db.collection('users').valueChanges();
    things.subscribe(console.log);
    // *****
  }
  title = 'todo-app';
}
