import { Component, OnInit , Input} from '@angular/core';
import { Product } from 'src/app/data-structure/Product';
import { LikeProductService } from '../../services/like-product.service';
import { UserAccountService } from '../../services/user-account.service';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
  styleUrls: ['./product-thumbnail.component.scss']
})
export class ProductThumbnailComponent implements OnInit {

  constructor(
    private likedProductService: LikeProductService,
    private userAccount: UserAccountService,
    private router: Router
  ){}
  product: Product = null;
  next_image = null;
  cursor: number = 0;
  product_image: string = null;
  has_more: string = "";
  button_color_classname: string = "deep-button-color";
  convert_image_url(url){
    return url.split("._SS40_").join("");
  }

  @Input("like-button")
  show_like_button: boolean;
  
  @Input("product")
  set _product(product: Product){
    
    this.product = product;
    for(let i = 0; i < this.product.image_urls.length; i++){
      this.product.image_urls[i] = this.convert_image_url(this.product.image_urls[i]);
    }
    this.product_image = this.product.image_urls[this.cursor];
    if(this.product.image_urls.length > 1){
      this.has_more = "+";
    }
    // console.log(this.product);
  }
  
  mouseEnter(){
    this.next_image = setInterval(()=>{
      this.cursor += 1;
      this.cursor = this.cursor % this.product.image_urls.length;
      this.product_image = this.product.image_urls[this.cursor];
      console.log(this.cursor);
    }, 1200);
  }
  
  mouseLeave(){
    clearInterval(this.next_image);
  }

  ngOnInit() {
  }
  liked(){
    this.button_color_classname = "light-button-color";
    console.log(this.product);
    if(this.userAccount.user != null){
      this.likedProductService.likeProduct(this.product.asin);
    }else{
      // alert("Login first")
      this.router.navigateByUrl(`/login`);
    }
    
  }
}
