import { Component, inject, OnInit } from '@angular/core';
import { MealsService } from 'src/app/services/meals.service';
import { UtilsService } from '../../services/utils.service';
import { Meal } from '../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage implements OnInit {
  //Injections
  private mealsSvc = inject(MealsService);
  private utils = inject(UtilsService);
  private router = inject(Router);

  category: string='';
  meals!: Meal[];

  ngOnInit() {
    var extras = this.router.getCurrentNavigation()?.extras.state;
    if (extras && extras['category']) {
      this.category = extras['category'];
      this.getMealsByCategory(extras['category']);
    }
  }

  //Get the meals by category
  async getMealsByCategory(category: string) {
    const loading = await this.utils.presentLoading();
    loading.present();
    try {
      //Get the meals by category
      this.meals = (await this.mealsSvc.getMealsByCategory(category)).meals;
    } catch (error) {
      console.log(error);
      this.utils.presentToast({
        message: 'Error al obtener las comidas',
        duration: 2500
      });
    } finally {
      loading.dismiss();
    }
  }

  //Navigate to the meal details page
  goToMealDetails(id: string) {
    this.utils.navigateForward('/meal', { state: { id } });
  }
}
