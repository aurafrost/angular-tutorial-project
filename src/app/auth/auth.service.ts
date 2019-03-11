import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token='';

  constructor() { }

  //connects to firebase to add user with parameters given
  signUp(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(
      error => console.log(error)
    );
  }
  //signs in using firebase with email and password
  signIn(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(
      // response=>console.log(response)
      response=>firebase.auth().currentUser.getIdToken().then(
        (data:string)=>{
          this.token=data;
        }
      )
    )
    .catch(
      error => console.log(error)
    );
  }

  //get token for authentication
  getToken(){
    firebase.auth().currentUser.getIdToken().then(
      (data:string)=>{
        this.token=data;
      }
    );
    return this.token;
  }

  //check for active token
  isAuthenticated(){
    return this.token!=null
  }
}
