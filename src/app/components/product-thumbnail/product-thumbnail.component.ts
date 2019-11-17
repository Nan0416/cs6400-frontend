import { Component, OnInit , Input} from '@angular/core';
import { Product } from 'src/app/data-structure/Product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
  styleUrls: ['./product-thumbnail.component.scss']
})
export class ProductThumbnailComponent implements OnInit {

  constructor(){}
  product: Product = null;
  
  convert_image_url(url){
    return url.split("._SS40_").join("");
  }

  @Input("product")
  set _product(product: Product){
    
    this.product = product;
    for(let i = 0; i < this.product.image_urls.length; i++){
      this.product.image_urls[i] = this.convert_image_url(this.product.image_urls[i]);
    }
  }
  
  

  ngOnInit() {
  }

}
