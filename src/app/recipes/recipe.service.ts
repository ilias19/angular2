import { Injectable,EventEmitter } from '@angular/core';
import {Recipe} from './recipe';
import {Ingredient} from '../ingredient';
import { Http, Headers, Response } from '@angular/http';
import  'rxjs/Rx';

@Injectable()
export class RecipeService {
  recipesChanged=new EventEmitter<Recipe[]>();
  recipes:Recipe[]=[
    new Recipe('Dummy','Dummy','https://thumb1.shutterstock.com/display_pic_with_logo/3612503/408291268/stock-vector-tailor-dummy-fashion-icon-on-white-background-atelier-object-simple-and-minimalistic-couture-408291268.jpg',
     [new Ingredient('fries',1),new Ingredient('chicken',2)]
    ),
    new Recipe('Dummy1','Dummy1','https://thumb1.shutterstock.com/display_pic_with_logo/3612503/408291268/stock-vector-tailor-dummy-fashion-icon-on-white-background-atelier-object-simple-and-minimalistic-couture-408291268.jpg',
    [new Ingredient('fries',1),new Ingredient('chicken',2)]
   )
  ];

  constructor(private http:Http) { }

  getRecipes(){
    return this.recipes;
  }

  getRecipe(id : number){
    return this.recipes[id];
  }

  deleteRecipe(recipe:Recipe){
    this.recipes.splice(this.recipes.indexOf(recipe),1);
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe:Recipe,newRecipe:Recipe){
    this.recipes[this.recipes.indexOf(oldRecipe)]=newRecipe;
  }

  storeData(){
    const body=JSON.stringify(this.recipes);
    const headers=new Headers(
      {
        'Content-Type':'application/json',
      }
    );
    return this.http.put('https://recipebook-31513.firebaseio.com/recipes.json',body,{headers:headers});

  }

  fetchData() {
   return this.http.get('https://recipebook-31513.firebaseio.com/recipes.json')
     .map((response: Response) => response.json())
     .subscribe(
       (data: Recipe[]) => {
         this.recipes = data;
         this.recipesChanged.emit(this.recipes);
       }
     );
 }


}
