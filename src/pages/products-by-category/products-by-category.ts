import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';
import { Product, Category } from '../../store';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {

    productsList: FirebaseListObservable<Product[]> = null; //  list of products

    products: any[];
    productsProvider: ProductsProvider;
    prod: Product = new Product();

    page: number;
    category: Category;

    constructor(public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
        this.page = 1;
        this.category = navParams.get("category");

        this.productsProvider = new ProductsProvider(db);
        this.productsList = this.productsProvider.getMainProductsList();
        //this.productsList = this.productsProvider.getProductsListByCategory(this.category);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategoryPage');
  }

}
