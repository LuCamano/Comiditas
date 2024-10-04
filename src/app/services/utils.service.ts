import { inject, Injectable } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { LoadingController, NavController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  //Injections
  private toastController = inject(ToastController);
  private loadingController = inject(LoadingController);
  private navController = inject(NavController);

  presentToast(opts:ToastOptions) {
    this.toastController.create(opts).then( toast => { toast.present(); });
  }

  presentLoading() {
    return this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent',
      translucent: true
    });
  }

  navigateForward(url: string, extras?: NavigationExtras){
    this.navController.navigateForward(url, extras);
  }
}
