import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged=new EventEmitter<Ingredient[]>();
  private ingredients:Ingredient[]=[new Ingredient("Apple",19),new Ingredient("Orange",50)];

  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients:Ingredient[]){
    // for(let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients); //"..." called the spread operator. Shortcut that separates an array into single elements
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
