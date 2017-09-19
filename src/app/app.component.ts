import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { InvolvePage } from '../pages/involve/involve';
import { ProductsByCategoryPage } from '../pages/products-by-category/products-by-category';
import { Menu } from '../pages/menu/menu';
import * as Constant from '../environment';

declare var gtag: Function;

declare const ENV: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = HomePage;
  rootPage: any = Menu;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    console.log('isProduction : ' + ENV.PRODUCTION);

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Involve', component: InvolvePage }
    ];

    console.log('Tracking in initializeApp with ' + Constant.GA_TRACKING_ID);
    //gtag('config', Constant.GA_TRACKING_ID);
    gtag('event', 'screen_view', { 'screen_name': 'Home' });
    gtag('config', Constant.GA_TRACKING_ID, {
        'page_title': 'menupage2 test',
        'page_location': 'https://comparegenius.com/menu-test',
        'page_path': '/menu-test'
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
