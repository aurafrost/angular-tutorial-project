import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients:Ingredient[]
  private subscription:Subscription;

  constructor(private service:ShoppingListService) { }

  //retrieves initial list of ingredients and initializes subscriber to watch changes
  ngOnInit() {
    this.ingredients=this.service.getIngredients();
    this.subscription=this.service.ingredientsChanged.subscribe((ingredients:Ingredient[])=>{
      this.ingredients=ingredients;
    });
  }

  //unsubscribes subscribers
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  //sets the shopping list item to be edited by passing its index
  onEditItem(i:number){
    this.service.startedEditing.next(i);
  }
}
