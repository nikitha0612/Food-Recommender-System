import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import {auth} from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable} from 'rxjs';
import { AngularFirestore, validateEventsArray } from '@angular/fire/firestore';
import { promise } from 'selenium-webdriver';
import { app } from 'firebase/app';
import 'firebase/auth';








@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // [x: string]: any;
  private user: Observable<firebase.User | null>;
  public uid: string = '';
  configUrl = 'http://127.0.0.1:5000/createUser/';

  fetchedUser = []

  constructor( private firebaseAuth: AngularFireAuth, private http: HttpClient) { 

    this.user = this.firebaseAuth.authState;
   // this.auth =  app.auth();
  }
   signup(email: string, password: string) {
   //  this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password):
    //promise(user => console.log(user)).catch(e =>console.log(e.message));
      // Handle Errors here.
      firebase.auth().createUserWithEmailAndPassword(email,password).then(value => {
        console.log("success");
        const user1 = value.user;
        if(user1 != null)
        this.createInternalUser(user1.uid);
      }).catch(function(error) {
        
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("ERROR");
          console.log(errorCode, errorMessage);
       // console.log(errorMessage);

      });
     
      
  }
  login(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(value => {
      console.log("success");
      if(value.user != null){
      this.uid = value.user.uid;
      console.log(this.uid);
      }

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("ERROR");
        console.log(errorCode, errorMessage);
     // console.log(errorMessage);
      // ...
    });
  }

  logout(){
    this.firebaseAuth.auth.signOut();
  }
  createInternalUser(uid: string) {
    this.http.get(this.configUrl + uid).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
  
}

