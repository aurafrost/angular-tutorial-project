import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient,private recipeService:RecipeService) { }

  //put request to firebase realtime database; sends body with 
  storeRecipes(){
    return this.http.put('https://recipe-book-fa3b0.firebaseio.com/recipes.json',this.recipeService.getRecipes());
  }

  //get request to firebase realtime database
  fetchRecipes(){
    this.http.get('https://recipe-book-fa3b0.firebaseio.com/recipes.json').subscribe((response)=>{
      const recipes:any = response;
      this.recipeService.updateRecipes(recipes);
      for(let recipe of recipes){
        if(!recipe['ingredients']){
          recipe['ingredients']=[];
          return recipes;
        }
      }
    });
  }
}
