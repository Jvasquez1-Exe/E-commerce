import { Routes } from '@angular/router';
import { AppComponent } from './app';
import { CartComponent } from './cart/cart';

export const routes: Routes = [
    {path: '', component : AppComponent},
    {path: 'cart', component : CartComponent},
    {path: '**', redirectTo: ''}
];
