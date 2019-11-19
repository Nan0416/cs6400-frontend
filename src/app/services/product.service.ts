import { Injectable } from '@angular/core';
import { Product } from '../data-structure/Product';
import { CustomizedError } from '../data-structure/CustomizedError';
import { Observable ,of, Subscriber, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { products } from './local_product';
import { server_addr } from './config.js'; 
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }
  private productsEvt_ = new Subject<null>();
  private productsErrorEvt_ = new Subject<CustomizedError>();

  public products: Product[] = [];
  public productMap: Map<string, Product> = new Map();

  public products$ = this.productsEvt_.asObservable();
  public productsError$ = this.productsErrorEvt_.asObservable();

  __notifyNewProducts(){
    this.productsEvt_.next();
  }
  __notifyProductsError(err: CustomizedError){
    this.productsErrorEvt_.error(err);
  }

  
  getProduct(asin: string){
    let product_url = `${server_addr}/product?id=${asin}`;
    this.http.get(product_url, {withCredentials: true }).subscribe({
      next: data=>{
        this.productMap.set(data['product']['asin'], data['product']);
        this.products.push(data['product']);
        this.__notifyNewProducts();
      },
      error: err=>{
        let err_: CustomizedError = new CustomizedError(err.status, err.error.reason);
        this.__notifyProductsError(err_);
      }
    });
  }

}
