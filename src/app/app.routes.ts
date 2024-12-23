import {Routes} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegistrationComponent} from './auth/registration/registration.component';
import {MainPageComponent} from './content/pages/main-page/main-page.component';
import {MainComponent} from './content/main.component';
import {GiftPageComponent} from './content/pages/gift-page/gift-page.component';
import {ShoppingCartComponent} from './content/pages/shopping-cart/shopping-cart.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: "full"},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'main', component: MainComponent,
    children: [
      {path: '', component: MainPageComponent},
      {path: 'gift/:id', component: GiftPageComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent}
    ]
  }
];
