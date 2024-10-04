import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Categories, DetailedMeals, Meal, Meals } from '../models/models';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  //Injections
  private http = inject(HttpClient);

  //Api url
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/';

  //Get the categories
  async getCategories() {
    return await lastValueFrom(this.http.get<Categories>(`${this.apiUrl}categories.php`));
  }

  //Get the meals by category
  async getMealsByCategory(category: string) {
    return await lastValueFrom(this.http.get<Meals>(`${this.apiUrl}filter.php?c=${category}`));
  }

  //Get the meal by id
  async getMealById(id: string) {
    const list = await lastValueFrom(this.http.get<DetailedMeals>(`${this.apiUrl}lookup.php?i=${id}`));
    return list.meals[0];
  }
}
