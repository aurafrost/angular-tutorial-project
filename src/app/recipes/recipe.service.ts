import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  //watches for changes and updates view
  recipesChanged=new Subject<Recipe[]>();
  //default recipes
  private recipes: Recipe[] = [
    new Recipe("Hot Dog", "As shown.", "/assets/images/hotdog.jpg",[new Ingredient("Hot dog",1),new Ingredient("Bun",1)]),
    new Recipe("Spaghetti and Meatballs", "Meatballs not optional.", "https://img.taste.com.au/hyE5dSN3/taste/2016/11/spaghetti-with-meatballs-and-spicy-tomato-sauce-102298-1.jpeg",[new Ingredient("Pasta",2),new Ingredient("Meatballs",2),new Ingredient("Grated Cheese",1)]),    
    new Recipe("Sandwich", "Typical sandwich.", "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-thanksgiving-leftover-sandwich-horizontal-1542326155.jpg?crop=0.846xw:0.634xh;0.153xw,0.0998xh&resize=1200:*",[new Ingredient("Bread",2),new Ingredient("Meat",2),new Ingredient("Lettuce",1),new Ingredient("Tomato",2)]),  
  ];

  constructor(private service:ShoppingListService,
    private router:Router,
    private route:ActivatedRoute) { }

  //get array of recipes
  getRecipes(){
    return this.recipes.slice(); //slice returns a copy rather than the actual array
  }

  //get recipe with id
  getRecipe(id:number){
    return this.recipes.slice()[id];
  }

  //add list of ingredients
  addIngredients(ingredients:Ingredient[]){
    this.service.addIngredients(ingredients);
  }

  //add recipe
  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  //update recipe at index
  updateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index]=newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  //update list of recipes
  updateRecipes(recipes:Recipe[]){
    this.recipes=recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  //delete recipe at index
  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
    this.router.navigate(['../'],{relativeTo:this.route})
  }
}
