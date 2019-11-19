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
      next: _ =>{
        this.login_error = null;
        this.signup_error = null;
        this.router.navigateByUrl("/");
      }
    });
    userAccountService.errorMount$.subscribe({
      next: (err)=>{
        if(this.isLoginPage){
          this.login_error = err.message;
        }else{
          this.signup_error = err.message;
        }
      }
    });
  }
  
  isLoginPage:boolean = true;
  id:string = ""; // username or email address;
  password: string = ""; // password
  login_error: string = null;

  password_1: string = "";
  password_2: string = "";
  signup_error: string = null;

  
  ngOnInit() {
  }
  login(){
    this.userAccountService.login(this.id, this.password);
  }
  gotoSignup(){
    this.id = "";
    this.isLoginPage = false;
  }
  signup(){
    if(this.password_1 != this.password_2){
      this.signup_error = "different password."
      return;
    }
    this.userAccountService.signup(this.id, this.id, this.password_1);
  }
}
