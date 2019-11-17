import { Component, OnInit } from '@angular/core';
import { User } from '../../data-structure/User';
import { UserAccountService } from '../../services/user-account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent implements OnInit {

  constructor(
    private userAccountService: UserAccountService,
    private router: Router
  ) { 
    userAccountService.userMount$.subscribe({
      complete: ()=>{
        // back to main
        this.router.navigateByUrl("/");
      },
      error: (err)=>{
        if(this.isLoginPage){
          this.login_error = err.message;
        }else{
          this.signup_error = err.message;
        }
      }
    });
  }
  
  isLoginPage:boolean = true;
  username:string = ""; // username or email address;
  password: string = ""; // password
  login_error: string = null;

  password_1: string = "";
  password_2: string = "";
  signup_error: string = null;

  
  ngOnInit() {
  }
  login(){
    this.userAccountService.login(this.username, this.password);
  }
  gotoSignup(){
    this.username = "";
    this.isLoginPage = false;
  }
  signup(){
    this.userAccountService.signup(this.username, this.password_1);
  }
}
