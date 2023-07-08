import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginDashboardComponent } from './login-dashboard/login-dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth-guard.service';
import { MainDashboardComponent } from './dashboard/main-dashboard/main-dashboard.component';
import { MissionsComponent } from './dashboard/missions/missions.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdressesComponent } from './dashboard/adresses/adresses.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginDashboardComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'main-dashboard', component: MainDashboardComponent },
      {
        path: 'missions',
        component: MissionsComponent,
      },
      { path: 'adresses', component: AdressesComponent },
    ],
  },

  { path: 'not-found', component: PageNotFoundComponent },

  { path: '', redirectTo: 'dashboard/main-dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
