import { Component, OnInit } from '@angular/core';
import { User } from './data-structure/User';
import { UserAccountService } from './services/user-account.service';
import {LikeProductService} from './services/like-product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cs6400-project-frontend';
  username: string = null;
  constructor(
    private userAccount: UserAccountService,
    private likedProductService: LikeProductService
  ) { 
    this.userAccount.userMount$.subscribe({
      next: ()=>{
        this.username = this.userAccount.user.username;
        console.log(this.username);
      }
    });
    this.likedProductService.likeProductsError$.subscribe({
      next: (err)=>{
        alert(err.message);
      }
    })
  }
  
  ngOnInit() {
  }
}
