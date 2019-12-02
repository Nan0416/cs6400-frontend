import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/data-structure/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = null;
  like_button: boolean = false;
  @Input("products")
  set _product(products: Product[]){
    this.products = products;
  }
  @Input("like-button")
  set _like_button(show_like_button: boolean){
    this.like_button = show_like_button;
  }
  constructor(){}

  ngOnInit(){

  }
}
