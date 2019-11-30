import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/data-structure/Product';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { LoadingProduct } from 'src/app/data-structure/LoadingProduct';
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
    private router: Router,
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
}
