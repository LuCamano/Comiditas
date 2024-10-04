import { Component, inject, OnInit } from '@angular/core';
import { MealsService } from '../../services/meals.service';
import { UtilsService } from '../../services/utils.service';
import { Category } from '../../models/models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  
  private mealsSvc = inject(MealsService);
  private utils = inject(UtilsService);

  categories!: Category[];

  ngOnInit() {
    this.getCategories();
  }

  async getCategories() {
    const loading = await this.utils.presentLoading();
    loading.present();
    try {
      this.categories = (await this.mealsSvc.getCategories()).categories;
    } catch (error) {
      console.log(error);
      this.utils.presentToast({
        message: 'Error al obtener las categorías',
        duration: 2500
      });
    } finally {
      loading.dismiss();
    }
  }

  goToCategory(category: string) {
    this.utils.navigateForward('/meals', { state: { category } });
  }
}
