import { Injectable } from '@angular/core';
import { User } from '../data-structure/User';
import { CustomizedError } from '../data-structure/CustomizedError';
import { Observable ,of, Subscriber, Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(
    private http: HttpClient
  ) { }
  private userMountEvt_ = new Subject<User>();
  //private errorEvt_ = new Subject<CustomizedError>();

  public userMount$ = this.userMountEvt_.asObservable();
  //public errorMount$ = this.errorEvt_.asObservable();
  public user: User = null;


  __notifyUserMountSubscribers(){
    this.userMountEvt_.complete();
  }
  __notifyUserUnMountSubscribers(err: CustomizedError){
    this.userMountEvt_.error(err);
  }


  login(username: string, password: string){
    let loginUrl = ``;
    let value = {username: username, password: password};
    this.http.post(loginUrl, value, {withCredentials: true }).subscribe({
      next: data=>{
        this.user = new User("qinnan", "12345");
        this.__notifyUserMountSubscribers();
      },
      error: err=>{
        this.user = new User(username, "12345");
        this.__notifyUserMountSubscribers();
        /*this.user = null;
        let err_ = new CustomizedError(400, "unknown");
        this.__notifyUserUnMountSubscribers(err_);*/
      }
    });
  }

  signup(username: string, password:string){
    let signup = ``;
    let value = {username: username, password: password};
    this.http.post(signup, value, {withCredentials: true }).subscribe({
      next: data=>{
        this.user = new User("qinnan", "12345");
        this.__notifyUserMountSubscribers();
      },
      error: err=>{
        this.user = null;
        let err_ = new CustomizedError(400, "unknown");
        this.__notifyUserUnMountSubscribers(err_);
      }
    });
  }
}
