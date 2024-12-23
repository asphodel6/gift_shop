import {Component, inject} from '@angular/core';
import {TuiCheckbox} from '@taiga-ui/kit';
import {TuiButton} from '@taiga-ui/core';
import {FormsModule} from '@angular/forms';
import {ShoppingCartService} from './service/shopping-cart.service';
import {AsyncPipe} from '@angular/common';
import {Router} from '@angular/router';
import {RecommendedComponent} from '../../../../../public/shared/recommended/recommended.component';

@Component({
  selector: 'shopping-cart',
  imports: [
    TuiCheckbox,
    TuiButton,
    FormsModule,
    AsyncPipe,
    RecommendedComponent
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.less'
})
export class ShoppingCartComponent {
  private readonly cartService = inject(ShoppingCartService);
  private readonly router = inject(Router);

  selectedAll = false;

  readonly count$ = this.cartService.count$;

  clearCart(): void {
    this.cartService.clearCart();
  }

  toMain(): void {
    this.router.navigate(['main']);
  }
}
