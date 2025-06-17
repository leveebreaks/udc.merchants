import { Routes } from '@angular/router';
import { MerchantsPageComponent } from './components/merchant/merchants-page.component';

export const routes: Routes = [
  { path: '', component: MerchantsPageComponent },
  { path: 'merchants', component: MerchantsPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];