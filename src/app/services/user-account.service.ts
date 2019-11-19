import { Injectable } from '@angular/core';
import { User } from '../data-structure/User';
import { CustomizedError } from '../data-structure/CustomizedError';
import { Observable ,of, Subscriber, Subject, ReplaySubject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { server_addr } from './config.js';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(
    private http: HttpClient
  ) { }
  private userMountEvt_ = new Subject<User>();
  private errorEvt_ = new Subject<CustomizedError>();

  public userMount$ = this.userMountEvt_.asObservable();
  public errorMount$ = this.errorEvt_.asObservable();
  public user: User = null;


  __notifyUserMountSubscribers(user: User){
    this.userMountEvt_.next(user);
  }
  __notifyUserUnMountSubscribers(err: CustomizedError){
    this.errorEvt_.next(err);
  }


  login(id: string, password: string){
    let loginUrl = `${server_addr}/user/login`;
    let value = {id: id, password: password};
    this.http.post(loginUrl, value, {withCredentials: true }).subscribe({
      next: data=>{
        this.user = new User(id, data['token']);
        this.__notifyUserMountSubscribers(this.user);
      },
      error: err=>{
        this.user = null;
        let err_: CustomizedError = new CustomizedError(err.status, err.error.reason);
        this.__notifyUserUnMountSubscribers(err_);
      }
    });
  }

  signup(id: string,username: string, password:string){
    let signup = `${server_addr}/user/signup`;
    let value = {id: id, username: username, password: password};
    this.http.post(signup, value, {withCredentials: true }).subscribe({
      next: data=>{
        this.user = new User(id, data['token']);
        this.__notifyUserMountSubscribers(this.user);
      },
      error: err=>{
        this.user = null;
        let err_: CustomizedError = new CustomizedError(err.status, err.error.reason);
        this.__notifyUserUnMountSubscribers(err_);
      }
    });
  }
}
