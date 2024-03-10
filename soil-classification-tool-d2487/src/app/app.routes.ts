import { Routes } from '@angular/router';
import { VerificationDashboardComponent } from './tests/verification-dashboard/verification-dashboard.component';
import { SoilClassificationComponent } from './domain/soil-classification/soil-classification.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: '', redirectTo: '/tool', pathMatch: 'full' },
    { path: 'tool', component: SoilClassificationComponent },
    { path: 'verification', component: VerificationDashboardComponent },
    { path: 'about', component: AboutComponent },
  ];
