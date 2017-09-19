import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Menu } from '../pages/menu/menu';
import { InvolvePage } from '../pages/involve/involve';
import { ProductsByCategoryPage } from '../pages/products-by-category/products-by-category';
import { ProductDetailsPage } from '../pages/product-details/product-details';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//import { AngularFireAuthModule } from 'angularfire2/auth';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriesProvider } from '../providers/categories/categories';
import { ProductsProvider } from '../providers/products/products';
import { InvolveDataProvider } from '../providers/involve-data/involve-data';

import { LocationStrategy, PathLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    InvolvePage,
    ProductsByCategoryPage,
    ProductDetailsPage,
    Menu
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig), // imports firebase/app needed for everything
      AngularFireDatabaseModule, // imports firebase/database, only needed for database features
      HttpModule,
      //AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    InvolvePage,
    ProductsByCategoryPage,
    ProductDetailsPage,
    Menu
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    CategoriesProvider,
    ProductsProvider,
    InvolveDataProvider
  ]
})
export class AppModule {}
