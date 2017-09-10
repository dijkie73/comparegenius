import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Category } from '../../store';

/*
  Generated class for the CategoriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriesProvider {
    private basePath: string = '/categories';

    categories: FirebaseListObservable<Category[]> = null; //  list of objects
    category: FirebaseObjectObservable<Category> = null; //   single object

    constructor(public db: AngularFireDatabase) {
        //this.categories = db.list(this.basePath);
    }

    getCategoriesList(query = {}): FirebaseListObservable<Category[]> {
        this.categories = this.db.list(this.basePath, {
            query: query
        });
        return this.categories
    }

    // Return a single observable item
    getCategory(key: string): FirebaseObjectObservable<Category> {
        const categoryPath = '${this.basePath}/${key}';
        this.category = this.db.object(categoryPath)

        return this.category
    }

    // Return a single observable item
    getMainCategoriesList(query = {}): FirebaseListObservable<Category[]> {
        this.categories = this.db.list(this.basePath, {
            query: {
                orderByChild: 'parentKey',
                equalTo: '0'
            }
        });

        return this.categories
    }

    getMainCategories() {

    }

    // CRUD operations
    createCategory(category: Category): void {
        this.categories.push(category)
            .catch(error => this.handleError(error))
    }
    // Update an existing category
    updateCategory(key: string, value: any): void {
        this.categories.update(key, value)
            .catch(error => this.handleError(error))
    }
    // Deletes a single category
    deleteCategory(key: string): void {
        this.categories.remove(key)
            .catch(error => this.handleError(error))
    }
    // Deletes the entire list of categories
    deleteAll(): void {
        this.categories.remove()
            .catch(error => this.handleError(error))
    }
    // Default error handling for all actions
    private handleError(error) {
        console.log(error)
    }

}
