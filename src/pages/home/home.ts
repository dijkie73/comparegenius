import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { ProductsProvider } from '../../providers/products/products';
import { Product } from '../../store';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    items: FirebaseListObservable<any[]>;
    productsList: FirebaseListObservable<Product[]> = null; //  list of products


    products: any[];
    productsProvider: ProductsProvider;
    prod: Product = new Product();

    sizeSubject: Subject<any>;

    @ViewChild('productSlides') productSlides: Slides;

    constructor(
        public db: AngularFireDatabase,
        public navCtrl: NavController,
    ) {
        this.products = [];
        this.productsProvider = new ProductsProvider(db);

        this.productsList = this.productsProvider.getMainProductsList();

        this.prod.brand = "Samsung";
        this.prod.categoryKey = "mobilephones";
        this.prod.featuredImage = "";
        this.prod.id = 1;
        this.prod.shortDescription = "";
        this.prod.title = "Samsung";
        this.prod.urlName = "samsung";

        //this.productsProvider.createProduct(this.prod);

        this.sizeSubject = new Subject();
        this.items = db.list('/items', {
            query: {
                orderByChild: 'size',
                equalTo: this.sizeSubject
            }
        });
    }
    filterBy(size: string) {
        this.sizeSubject.next(size);
    }

    ionViewDidLoad() {
        setInterval(() => {

            if (this.productSlides.getActiveIndex() == this.productSlides.length() - 1)
                this.productSlides.slideTo(0);
            else
              this.productSlides.slideNext();
        }, 3000)
    }
} 
