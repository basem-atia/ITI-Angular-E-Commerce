import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageKeys } from '../constant';
import { AuthService } from './auth.service';
import { NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BehaviourSubjectService {
  private userExistsSubject = new BehaviorSubject<boolean>(this.userCheck());
  private TokenExpirySubject = new BehaviorSubject<boolean>(this.tokenCheck());
  constructor(private authservice: AuthService, private route: Router) {
    route.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const token = localStorage.getItem('authtoken');
        if (!token && (event.url === '/' || event.url === '/home')) {
        } else if (
          !token &&
          event.url !== '/' &&
          event.url !== '/home' &&
          event.url !== '/signup' &&
          !event.url.startsWith('/category/') &&
          event.url !== '/login'
        ) {
          route.navigate(['/signup']);
        } else if (
          token &&
          event.url !== '/login' &&
          event.url !== '/' &&
          !event.url.startsWith('/category/') &&
          event.url !== '/home' &&
          event.url !== '/signup'
        ) {
          this.updateTokenStatus();
        }
      }
    });
  }
  keyexists = this.userExistsSubject.asObservable();
  tokenExists = this.TokenExpirySubject.asObservable();
  userCheck(): boolean {
    return !!localStorage.getItem(StorageKeys.LUser);
  }
  tokenCheck(): boolean {
    let token = localStorage.getItem('authtoken');
    if (!token) {
      return true;
    }
    const expiryDate = this.getTokenExpiryDate(token);
    console.log(new Date() > expiryDate);
    return new Date() > expiryDate;
  }
  getTokenExpiryDate(token: string): Date {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('exp' + payload.exp);
    console.log('date' + new Date(payload.exp * 1000));
    return new Date(payload.exp * 1000);
  }
  updateTokenStatus() {
    const expired = this.tokenCheck();
    if (expired) {
      console.log('routed');

      this.route.navigate(['/login']);
    }
    this.TokenExpirySubject.next(expired);
  }
  updateKeyStatus() {
    this.userExistsSubject.next(this.userCheck());
  }
  login(user: any) {
    localStorage.setItem(StorageKeys.LUser, JSON.stringify(user));
    this.updateKeyStatus();
  }
  logOut() {
    localStorage.removeItem(StorageKeys.LToken);
    localStorage.removeItem(StorageKeys.LUser);
    this.updateKeyStatus();
  }
  getUserName() {
    return JSON.parse(localStorage.getItem(StorageKeys.LUser)!);
  }
}
