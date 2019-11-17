import { Injectable } from '@angular/core';
import { Product } from '../data-structure/Product';
import { CustomizedError } from '../data-structure/CustomizedError';
import { Observable ,of, Subscriber, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { products } from './local_product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }
  private productsEvt_ = new Subject<null>();
  public products: Product[] = [];

  public products$ = this.productsEvt_.asObservable();

  __notifyNewProducts(){
    this.productsEvt_.complete();
  }
  __notifyProductsError(err: CustomizedError){
    this.productsEvt_.error(err);
  }

  createFakeProducts(): Product[]{
    this.products = products;
    return this.products;
  }
  
  getProducts(){
    let url = ``;
    this.http.get(url, {withCredentials: true }).subscribe({
      next: data=>{
        
        this.__notifyNewProducts();
      },
      error: err=>{
        this.products = this.createFakeProducts();
        this.__notifyNewProducts();
        
        
        /*this.user = null;
        let err_ = new CustomizedError(400, "unknown");
        this.__notifyUserUnMountSubscribers(err_);*/
      }
    });
  }

}
