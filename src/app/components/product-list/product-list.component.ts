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
      complete: ()=>{
        this.products = this.productService.products;
      }
    })
  }

  ngOnInit() {
    this.productService.getProducts();
  }

}
