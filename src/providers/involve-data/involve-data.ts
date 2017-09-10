import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the InvolveDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InvolveDataProvider {

    public jsonFile: any = "I'm new here";
    private jsonFileName: string;


  constructor(public http: Http) {
    console.log('Hello InvolveDataProvider Provider');
  }

  getJsonData() {
      this.jsonFileName = 'https://www.reddit.com/r/worldnews/.json';
      this.jsonFileName = 'https://raw.githubusercontent.com/dijkie73/comparegenius/master/src/productdata.test2.json';
    return this.http.get(this.jsonFileName).map(res => res.json());
  }

  readJsonFile(jsonFile) {
    var obj = { content: null };
         
    this.http.get('content.json').map(function (data) {
        // you can do some processing here
        obj.content = data;
    });

    return obj;
  }
}
