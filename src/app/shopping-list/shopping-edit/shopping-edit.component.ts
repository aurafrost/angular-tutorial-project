import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm, Form } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm:NgForm;
  subscription:Subscription;
  editMode=false;
  editedItemIndex:number;
  editedItem:Ingredient;

  constructor(private service:ShoppingListService) { }

  ngOnInit() {
    this.subscription=this.service.startedEditing.subscribe((index:number)=>{
      this.editedItemIndex=index;
      this.editMode=true;
      this.editedItem=this.service.getIngredient(index);
      this.slForm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount,
      });
    });
  }

  onSubmit(form:NgForm){
    const value=form.value;
    const ingredient=new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.service.updateIngredient(this.editedItemIndex,ingredient);
    }
    else{
      this.service.addIngredient(ingredient);
    }
    this.clearForm();
  }

  clearForm(){
    this.editMode=false;
    this.slForm.reset();
  }

  deleteItem(){
    this.service.deleteIngredient(this.editedItemIndex);
    this.clearForm();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
