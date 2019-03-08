import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit() {
  }

  //signs up user with provided email and password by calling service
  signUp(form:NgForm){
    const email=form.value.email;
    const password=form.value.password;
    this.auth.signUp(email,password);
  }
}
