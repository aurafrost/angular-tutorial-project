import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-tutorial-project';
  loadedFeature='recipe'

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    firebase.initializeApp({
      apiKey:"AIzaSyCFeKrXeNWKKVrMGKyjL0AkyCmLXOxf8Ls",
      authDomain:"https://recipe-book-fa3b0.firebaseio.com/"
    });
  }

  onNavigate(feature:string){
    this.loadedFeature=feature;
  }
}
