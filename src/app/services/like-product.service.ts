import { Injectable, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { Product } from '../data-structure/Product';
import { CustomizedError } from '../data-structure/CustomizedError';
import { Observable ,of, Subscriber, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { products } from './local_product';
import { server_addr } from './config.js'; 
import { LoadingProduct } from '../data-structure/LoadingProduct';
@Injectable({
  providedIn: 'root'
})

export class LikeProductService {
  constructor(
    private http: HttpClient
  ) { }
  private likeProductsEvt_ = new Subject<null>();
  private likeProductsErrorEvt_ = new Subject<CustomizedError>();

  public likeProducts$ = this.likeProductsEvt_.asObservable();
  public likeProductsError$ = this.likeProductsErrorEvt_.asObservable();

  __notifyLikedProducts(){
    this.likeProductsEvt_.next();
  }
  __notifyLikedProductsError(err: CustomizedError){
    this.likeProductsErrorEvt_.next(err);
  }

  
  likeProduct(asin: string, userid: string){
    let product_url = `${server_addr}/recommendation/like-product?asin=${asin}&userid=${userid}`;
    this.http.get(product_url, {withCredentials: true }).subscribe({
      next: data=>{
        this.__notifyLikedProducts();
      },
      error: err=>{
        let err_: CustomizedError = new CustomizedError(err.status, err.error.reason);
        this.__notifyLikedProductsError(err_);
      }
    });
  }
}