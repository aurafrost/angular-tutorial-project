import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, 
    private recipeService: RecipeService, 
    private auth: AuthService) { }

  //put request to firebase realtime database; sends body with 
  storeRecipes() {
    const token=this.auth.getToken();
    return this.http.put('https://recipe-book-fa3b0.firebaseio.com/recipes.json?auth='+token, this.recipeService.getRecipes());
  }

  //get request to firebase realtime database
  fetchRecipes() {
    const token=this.auth.getToken();
    this.http.get('https://recipe-book-fa3b0.firebaseio.com/recipes.json?auth='+token).subscribe((response) => {
      const recipes: any = response;
      this.recipeService.updateRecipes(recipes);
      for (let recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
          return recipes;
        }
      }
    });
  }
}
