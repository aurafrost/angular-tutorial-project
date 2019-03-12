import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn:boolean=false;

  constructor(private dataStorageService:DataStorageService,
    private auth:AuthService) { }

  ngOnInit() {
  }

  //saves current recipes
  saveData(){
    this.dataStorageService.storeRecipes().subscribe((data)=>{
      console.log("Response: "+data)
    });
  }

  //fetches recipes
  fetchData(){
    this.dataStorageService.fetchRecipes();
  }

  logout(){
    this.auth.logout();
  }

  isAuthenticated(){
    if(!this.auth.isAuthenticated()){
      this.loggedIn=false;
    }
    else{
      this.loggedIn=true
    }
  }
}
