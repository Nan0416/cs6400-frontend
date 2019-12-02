import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/data-structure/Product';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { UserAccountService } from '../../services/user-account.service';
import { LoadingProduct } from 'src/app/data-structure/LoadingProduct';
import { LikeProductService } from '../../services/like-product.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {

  products: Product[] = [];
  // current_page: number = 0;
  page_limit: number = 10;
  // max_page: number = 0;
  search_text: string;
  encoded_search_text: string;
  page_numbers: number[] = [];
  request: LoadingProduct = new LoadingProduct();

  constructor(
    private productService: ProductService,
    private likedProductService: LikeProductService,
    private router: Router,
    private userAccount: UserAccountService,
    private route: ActivatedRoute,
  ) { 
    this.request.page_size = 20;
  }

  searchProducts(text){
    if(text == this.search_text){
      return;
    }
    this.search_text = text;
    this.router.navigateByUrl(`/search/${encodeURI(this.search_text)}`);
    
    // this.productService.searchProducts(this.search_text, this.page_limit, 0);
  }


  loadMore(){
    if(this.request.total > this.request.cursor){
      this.productService.searchProducts(this.request);
    }else{
      alert("No more products.")
    }
  }

  ngOnInit() {
    this.productService.products$.subscribe({
      next: ()=>{
        let productMap = this.productService.productMap;
        for(let i = this.request.old_cursor ; i < this.request.cursor; i++){
          this.products.push(productMap.get(this.request.asins[i]));
        }
        console.log(this.request.cursor)
      }
    });

    this.init();
    this.router.events.subscribe((val) => { 
        if(val instanceof NavigationEnd) {
          this.init();
        }
    });
    this.likedProductService.likeProducts$.subscribe({
      next: ()=>{
        this.router.navigateByUrl("/recommendation/result");
      }
    });
  }

  init(){
    console.log("init");
    this.encoded_search_text = this.route.snapshot.paramMap.get('search-text');
    let searchText = decodeURI(this.route.snapshot.paramMap.get('search-text'));
    this.search_text = searchText;
    this.request.search_text = searchText;
    this.request.cursor = 0;
    this.request.asins = [];
    this.products = [];
    this.productService.searchProducts(this.request); 
  }

  recommend(){
    let liked_product_asin_set = this.likedProductService.liked_product_asin;
    if(liked_product_asin_set.size < 5){
      alert("Please select at least 5 product");
      return;
    }
    if(this.userAccount.user == null){
      this.router.navigateByUrl(`/login`);
      return;
    }
    let asins:string[] = []
    for(let asin of liked_product_asin_set){
      asins.push(asin);
    }
    console.log(asins);
    // let temp:string[] = ['B00012BVQ4', 'B0006281RG', 'B0009GZB3Q', 'B00006I5JT', 'B000A2TEWS'];
    // let username: string = 'qin@gmail.com'
    this.likedProductService.startRecommend(this.userAccount.user.username, asins);
  }
}
