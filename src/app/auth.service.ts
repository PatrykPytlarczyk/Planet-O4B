import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor(private router: Router) {}
  loggedIn = false;
  loggedUser;
  isAuthenticated() {
    if (localStorage.getItem('remember')) {
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    } else {
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 800);
      });
      return promise;
    }
  }
  autoLogin() {
    if (localStorage.getItem('remember')) {
      this.loggedUser = JSON.parse(localStorage.getItem('remember'));
      this.loggedIn = true;
      if (this.router.routerState.snapshot.url === '/login') {
        this.router.navigate(['dashboard/main-dashboard']);
      }
    }
  }
  login(loginFormData) {
    this.loggedUser = loginFormData;
    this.loggedIn = true;
    setTimeout(() => {
      if (loginFormData.rememberMe === true) {
        localStorage.setItem('remember', JSON.stringify(loginFormData));
      }
    }, 1500);
    this.router.navigate(['dashboard/main-dashboard']);
  }
  logout() {
    this.loggedIn = false;
    localStorage.removeItem('remember');
    this.router.navigate(['login']);
  }
}
