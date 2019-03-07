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

  ngOnInit() {
    this.ingredients=this.service.getIngredients();
    this.subscription=this.service.ingredientsChanged.subscribe((ingredients:Ingredient[])=>{
      this.ingredients=ingredients;
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onEditItem(i:number){
    this.service.startedEditing.next(i);
  }
}
