import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/data-structure/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = null;
  @Input("products")
  set _product(products: Product[]){
    this.products = products;
  }
  
  constructor(){}

  ngOnInit(){

  }
}
