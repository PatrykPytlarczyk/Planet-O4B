import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-dashboard',
  templateUrl: './login-dashboard.component.html',
  styleUrls: ['./login-dashboard.component.scss'],
})
export class LoginDashboardComponent implements OnInit {
  passwordPattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  isLogging = false;
  @ViewChild('form') loginForm;
  constructor(
    private authService: AuthService,
    private translate: TranslateService
  ) {}
  ngOnInit() {
    this.authService.autoLogin();
  }

  onChangeLang(lang) {
    this.translate.use(lang);
  }

  onLogin() {
    this.isLogging = true;
    this.authService.login(this.loginForm.value);
  }
}
