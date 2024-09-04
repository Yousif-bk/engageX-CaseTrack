import { Routes } from '@angular/router';
import { LandingComponent } from '../components/landing/landing.component';
import { AuthGuard } from '../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: "landing",
    pathMatch: 'full',
  },

  {
    path: "auth/login",

    loadComponent: () => import('../components/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: "case/create",
    loadComponent: () => import('../components/case/create-case/create-case.component').then(m => m.CreateCaseComponent)
  },
  {
    path: "case/list",
    loadComponent: () => import('../components/case/case-list/case-list.component').then(m => m.CaseListComponent)
  },
  {
    path: "case/details",
    loadComponent: () => import('../components/case/case-details/case-details.component').then(m => m.CaseDetailsComponent)
  },

  {
    path: "landing",
    canActivate: [AuthGuard],
    loadComponent: () => import('../components/landing/landing.component').then(m => m.LandingComponent)
  },
  { path: '**', component: LandingComponent },
]
