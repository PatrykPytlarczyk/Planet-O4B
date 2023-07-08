import {
  Component,
  HostBinding,
  HostListener,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from '../auth.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentLang;
  showLanguages = false;
  showMenu = false;
  username;
  @HostBinding('class.showModal') showUserModal: boolean = false;
  @ViewChild('modal') modal: ElementRef;
  @ViewChild('menu') menu: ElementRef;
  @ViewChild('languagesShowed') languagesShowed: ElementRef;
  @HostListener('document:click', ['$event']) toggleUserModal(event: Event) {
    if (this.showUserModal) {
      this.showUserModal = this.modal.nativeElement.contains(event.target)
        ? true
        : false;
    }
    if (this.showLanguages) {
      this.showLanguages = this.languagesShowed.nativeElement.contains(
        event.target
      )
        ? true
        : false;
    }
    if (this.showMenu) {
      this.showMenu = this.menu.nativeElement.contains(event.target)
        ? true
        : false;
    }
  }
  @HostListener('document:scroll') closeModals() {
    this.showLanguages = false;
    this.showMenu = false;
  }
  constructor(
    private authService: AuthService,
    private translate: TranslateService
  ) {
    this.currentLang = translate.currentLang.toUpperCase();
  }
  onToggleMenu() {
    setTimeout(() => {
      this.showMenu = !this.showMenu;
    }, 1);
  }
  onToggleLanguages() {
    setTimeout(() => {
      this.showLanguages = !this.showLanguages;
    }, 1);
  }
  onChangeLang(lang) {
    this.translate.use(lang);
    this.currentLang = lang.toUpperCase();
    this.showLanguages = false;
  }
  onLogout() {
    this.authService.logout();
  }
  onShowUserModal() {
    if (this.showUserModal === false) {
      setTimeout(() => {
        this.showUserModal = true;
      }, 1);
    }
  }
  ngOnInit() {
    this.authService.autoLogin();
    this.username = this.authService.loggedUser.login;
  }
}
