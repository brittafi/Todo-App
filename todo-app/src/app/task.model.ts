import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';
import FieldValue = firebase.firestore.FieldValue;

export interface Task {
  id?: string;  // might be changed to string later due to firebase id format
  title?: string;
  description?: string;
  done?: boolean;
  priority?: number;
  categories?: string[];
  created?: FieldValue;
  deadline?: FieldValue;
}
