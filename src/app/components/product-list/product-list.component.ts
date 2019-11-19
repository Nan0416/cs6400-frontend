import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/data-structure/Product';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = null;
  constructor(
    private productService: ProductService
  ) { 
    this.productService.products$.subscribe({
      next: ()=>{
        this.products = this.productService.products;
      }
    })
  }

  ngOnInit() {
    let productidlist = ['0594514886', '0594514681','059454582X','081187642X'];
    for(let i = 0; i < productidlist.length; i++){
      this.productService.getProduct(productidlist[i]);
    }
  }

}
