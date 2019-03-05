import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe("Hot Dog", "As shown.", "/assets/images/hotdog.jpg",[new Ingredient("Hot dog",1),new Ingredient("Bun",1)]),
    new Recipe("Spaghetti and Meatballs", "Meatballs not optional.", "https://img.taste.com.au/hyE5dSN3/taste/2016/11/spaghetti-with-meatballs-and-spicy-tomato-sauce-102298-1.jpeg",[new Ingredient("Pasta",2),new Ingredient("Meatballs",2),new Ingredient("Grated Cheese",1)]),    
    new Recipe("Sandwich", "Typical sandwich.", "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-thanksgiving-leftover-sandwich-horizontal-1542326155.jpg?crop=0.846xw:0.634xh;0.153xw,0.0998xh&resize=1200:*",[new Ingredient("Bread",2),new Ingredient("Meat",2),new Ingredient("Lettuce",1),new Ingredient("Tomato",2)]),  
  ];
  recipeSelected=new EventEmitter<Recipe>();

  constructor(private service:ShoppingListService) { }

  getRecipes(){
    return this.recipes.slice(); //slice returns a copy rather than the actual array
  }

  addIngredients(ingredients:Ingredient[]){
    this.service.addIngredients(ingredients);
  }
}
