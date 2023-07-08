import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginDashboardComponent } from './login-dashboard/login-dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainDashboardComponent } from './dashboard/main-dashboard/main-dashboard.component';
import { CommonModule } from '@angular/common';
import { MissionsComponent } from './dashboard/missions/missions.component';
import { MissionsModalComponent } from './dashboard/missions/missions-modal/missions-modal.component';
import { ModalService } from './modal.service';
import { FormsModule } from '@angular/forms';
import { AdressesComponent } from './dashboard/adresses/adresses.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginDashboardComponent,
    PageNotFoundComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    MainDashboardComponent,
    MissionsComponent,
    MissionsModalComponent,
    AdressesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [AuthService, AuthGuard, ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
