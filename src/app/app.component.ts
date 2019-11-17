import { Component, OnInit } from '@angular/core';
import { User } from './data-structure/User';
import { UserAccountService } from './services/user-account.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cs6400-project-frontend';
  username: string = null;
  constructor(
    private userAccount: UserAccountService
  ) { 
    this.userAccount.userMount$.subscribe({
      complete: ()=>{
        this.username = this.userAccount.user.username;
      }
    });
  }
  
  ngOnInit() {
  }
}
