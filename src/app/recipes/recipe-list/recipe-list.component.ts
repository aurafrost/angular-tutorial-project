import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesComponent } from '../recipes.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:Recipe[]=[new Recipe("Recipe 1","Testing one.","/assets/images/hotdog.jpg"),
    new Recipe("Recipe 2","Testing 2.","/assets/images/hotdog.jpg"),
    new Recipe("Recipe 3","Testing 3.","/assets/images/hotdog.jpg")
  ];
  constructor() { 
    
  }

  ngOnInit() {
  }

}
