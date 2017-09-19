import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';
import { ProductsProvider } from '../../providers/products/products';
import { ProductDetailsPage } from '../product-details/product-details';
import { Product, Brand } from '../../store';

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

        this.prod.brand = new Brand('Apple');
        this.prod.categoryKey = "mobilephones";
        this.prod.featuredImage = "http://res.cloudinary.com/comparegenius/image/upload/c_scale,h_150,q_auto/v1505854325/products/smartphones/apple/apple-iphone-x-front-homescreen.png";
        this.prod.id = 4;
        this.prod.shortDescription = "New Apple Iphone X";
        this.prod.title = "Apple iPhone X";
        this.prod.urlName = "apple-iphone-x";
        //console.log('create prod');
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

    // Fired only when a view is stored in memory.
    // This event is NOT fired on entering a view that is already cached.It’s a nice place for init related tasks.
    ionViewDidLoad() {
        setInterval(() => {

            if (this.productSlides.getActiveIndex() == this.productSlides.length() - 1)
                this.productSlides.slideTo(0);
            else
              this.productSlides.slideNext();
        }, 3000)
    }

    openProductPage(product) {
        this.navCtrl.push(ProductDetailsPage, {"product": product} );
    }
} 
