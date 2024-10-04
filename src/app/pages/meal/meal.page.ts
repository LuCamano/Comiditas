import { Component, inject, OnInit } from '@angular/core';
import { MealsService } from '../../services/meals.service';
import { UtilsService } from 'src/app/services/utils.service';
import { MealDetailed } from '../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {
  //Injections
  private mealsSvc = inject(MealsService);
  private utils = inject(UtilsService);
  private router = inject(Router);

  //Meal details
  meal!: MealDetailed;
  
  ngOnInit() {
    var extras = this.router.getCurrentNavigation()?.extras.state;
    if (extras && extras['id']) {
      this.getMealDetails(extras['id']);
    }
  }

  async getMealDetails(id: string) {
    const loading = await this.utils.presentLoading();
    loading.present();
    try {
      this.meal = await this.mealsSvc.getMealById(id);
    } catch (error) {
      console.log(error);
      this.utils.presentToast({
        message: 'Error al obtener los detalles de la comida',
        duration: 2500
      });
    } finally {
      loading.dismiss();
    }
  }
}
