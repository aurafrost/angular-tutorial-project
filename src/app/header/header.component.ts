import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService:DataStorageService) { }

  ngOnInit() {
    this.fetchData();
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

}
