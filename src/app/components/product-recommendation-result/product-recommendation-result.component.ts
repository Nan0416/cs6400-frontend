import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccountService } from '../../services/user-account.service';
import { LikeProductService } from '../../services/like-product.service';
import { Product } from 'src/app/data-structure/Product';
import {RecommendationResult } from '../../data-structure/RecommendationResult';

@Component({
  selector: 'app-product-recommendation-result',
  templateUrl: './product-recommendation-result.component.html',
  styleUrls: ['./product-recommendation-result.component.scss']
})
export class ProductRecommendationResultComponent implements OnInit {

  is_loading: boolean = true;
  products : Product[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private likedProductService: LikeProductService,
    private userAccount: UserAccountService,
  ) { }

  ngOnInit() {
    let sessiond_id = this.route.snapshot.paramMap.get("sessionid");
    this.findRecommendation(sessiond_id);
    /*this.route.queryParams.subscribe((queryParams:any) => {
      this.a = queryParams.a;
      this.b = queryParams.b;
     });*/

    this.likedProductService.recommendationProduct$.subscribe({
      next: (result: RecommendationResult)=>{
        console.log(result);
        if(result.include_data){
          console.log("get result");
          this.is_loading = false;
          // setup products.
        }else{
          this.is_loading = true;
          setTimeout(()=>{
            console.log('polling');
            this.findRecommendation(this.route.snapshot.paramMap.get("sessionid"));
          }, 800); 
        }
      }
    });
  }

  findRecommendation(session_id: string){
    // this.likedProductService.queryRecommendationResult("12", session_id);
    if(this.userAccount.user == null){
      this.router.navigateByUrl(`/login`);
      return;
    }
    this.likedProductService.queryRecommendationResult(this.userAccount.user.username, session_id);
  }

}
