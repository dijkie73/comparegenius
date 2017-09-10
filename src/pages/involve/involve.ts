import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { InvolveDataProvider } from '../../providers/involve-data/involve-data';
import { Http } from '@angular/http';

@Component({
  selector: 'page-involve',
  templateUrl: 'involve.html',
  providers: [InvolveDataProvider],
})
export class InvolvePage {
    newsData: any;
    loading: any;

    constructor(public navCtrl: NavController, private httpProvider: InvolveDataProvider, public loadingCtrl: LoadingController, public navParams: NavParams) {
        this.loading = this.loadingCtrl.create({
            content:
              '<ion-spinner ></ion-spinner>'
        });

        this.getdata();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvolvePage');
  }

  getdata() {
      this.loading.present();

      this.httpProvider.getJsonData().subscribe(
          result => {
              this.newsData = result.data.children;
              console.log("Success : " + this.newsData);
          },
          err => {
              console.error("Error : " + err);
          },
          () => {
              this.loading.dismiss();
              console.log('getData completed');
          }
      );
  }


}
