import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = '';

  constructor(private router: Router) { }

  //connects to firebase to add user with parameters given
  signUp(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(
      error => console.log(error)
    );
  }
  //signs in using firebase with email and password
  signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate([''])
          firebase.auth().currentUser.getIdToken().then(
            (data: string) => {
              // console.log(response)
              this.token = data;
              // console.log("Signed in: " + this.token)
            }
          )
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  //get token for authentication
  getToken() {
    firebase.auth().currentUser.getIdToken().then(
      (data: string) => {
        this.token = data;
      }
    );
    return this.token;
  }

  //check for active token. invalid with current versions
  isAuthenticated() {
    // console.log("Token Id: " + this.token)
    if (this.token == '' || this.token == null) {
      console.log("Authenticated: False")
      return false;
    }
    console.log("Authenticated: True")
    return true
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['signin'])
  }
}
