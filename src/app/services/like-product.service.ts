import { Injectable, ɵAPP_ID_RANDOM_PROVIDER } from '@angular/core';
import { Product } from '../data-structure/Product';
import { CustomizedError } from '../data-structure/CustomizedError';
import { Observable ,of, Subscriber, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { products } from './local_product';
import { server_addr } from './config.js'; 
import { LoadingProduct } from '../data-structure/LoadingProduct';
import {RecommendationResult } from '../data-structure/RecommendationResult';
@Injectable({
  providedIn: 'root'
})

export class LikeProductService {
  constructor(
    private http: HttpClient
  ) { }
  private likeProductsEvt_ = new Subject<string>();
  private likeProductsErrorEvt_ = new Subject<CustomizedError>();

  private recommendationProductsEvt_ = new Subject<RecommendationResult>();
  private recommendationErrorEvt_ = new Subject<CustomizedError>();

  public likeProducts$ = this.likeProductsEvt_.asObservable();
  public likeProductsError$ = this.likeProductsErrorEvt_.asObservable();

  public recommendationProduct$ = this.recommendationProductsEvt_.asObservable();
  public recommendationError$ = this.recommendationErrorEvt_.asObservable();


  public liked_product_asin:Set<string> = new Set();

  __notifyLikedProducts(sessionid: string){
    this.likeProductsEvt_.next(sessionid);
  }
  __notifyLikedProductsError(err: CustomizedError){
    this.likeProductsErrorEvt_.next(err);
  }

  __notifyRecommendationProducts(result: RecommendationResult){
    this.recommendationProductsEvt_.next(result);
  }
  __notifyRecommendationError(err: CustomizedError){
    this.recommendationErrorEvt_.next(err);
  }
  
  likeProduct(asin: string){
    this.liked_product_asin.add(asin);
  }
  
  startRecommend(userid: string, product_asins: string[]){
    let url = `${server_addr}/recommendation/product/start?userid=${userid}`;
    this.http.post(url, {liked_products: product_asins}, {withCredentials: true }).subscribe({
      next: data=>{
        this.__notifyLikedProducts(data['recommendation_session']);
      },
      error: err=>{
        let err_: CustomizedError = new CustomizedError(err.status, err.error.reason);
        this.__notifyLikedProductsError(err_);
      }
    });
  }

  queryRecommendationResult(userid: string, sessionid: string){
    let url = `${server_addr}/recommendation/product/result?userid=${userid}&sessionid=${sessionid}`;
    this.http.get(url, {withCredentials: true }).subscribe({
      next: data=>{
        let result = new RecommendationResult();
        result.include_data = data['include_data'];
        result.products = data['products'];
        this.__notifyRecommendationProducts(result);
      },
      error: err=>{
        let err_: CustomizedError = new CustomizedError(err.status, err.error.reason);
        this.__notifyRecommendationError(err_);
      }
    });
  }
}