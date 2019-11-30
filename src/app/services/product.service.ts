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
    this.productsErrorEvt_.next(err);
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

  searchProducts(search: LoadingProduct){
    let product_url = `${server_addr}/product?limit=${search.page_size}&offset=${search.cursor}`;
    this.http.post(product_url, {search: search.search_text}, {withCredentials: true }).subscribe({
      next: data=>{
        for(let i = 0; i < data['data'].length; i++){
          let asin = data['data'][i]['asin'];
          let product = data['data'][i];
          this.productMap.set(asin, product);
        }
        this.__helper_make_infoMap_for_search(data, search);
        this.__notifyNewProducts();
      },
      error: err=>{
        let err_: CustomizedError = new CustomizedError(err.status, err.error.reason);
        this.productMap.clear();
        this.__notifyProductsError(err_);
      }
    });
  }
  __helper_make_infoMap_for_search(products, search: LoadingProduct){
    search.total = products['total'];
    search.old_cursor = search.cursor;
    search.cursor += products['actual_number'];
    for(let i = 0; i < products['data'].length; i++){
      search.asins.push(products['data'][i]['asin']);
    }
  }

}
