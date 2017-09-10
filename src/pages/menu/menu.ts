import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { InvolvePage } from '../involve/involve';
import { ProductsByCategoryPage } from '../products-by-category/products-by-category';
import { CategoriesProvider } from '../../providers/categories/categories';
import { Category } from '../../store';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class Menu {

    homePage: any;
    involvePage: any;
    categories: any[];
    categoryProvider: CategoriesProvider;

    categoryList: FirebaseListObservable<Category[]> = null; //  list of categories

    constructor(
        public db: AngularFireDatabase,
        public navCtrl: NavController,
        public navParams: NavParams) {

        this.homePage = HomePage;
        this.involvePage = { title: 'Signup', component: InvolvePage }
;
        this.categories = [];
        this.categoryProvider = new CategoriesProvider(db);

        this.categoryList = this.categoryProvider.getMainCategoriesList();

        console.log(typeof(this.homePage));
        console.log(this.categoryList);
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad MenuPage');

      
  }
  openCategoryPage(category) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.navCtrl.setRoot(ProductsByCategoryPage, { "category": category});
  }

  openInvolvePage() {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.navCtrl.setRoot(InvolvePage);
  }

}
