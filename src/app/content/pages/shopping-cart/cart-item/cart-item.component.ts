import {Component, inject, linkedSignal, model, output} from '@angular/core';
import {
  TuiInputNumberModule,
  tuiInputNumberOptionsProvider,
  TuiInputRangeModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/legacy';
import {FormsModule} from '@angular/forms';
import {tuiNumberFormatProvider} from '@taiga-ui/core';
import {ICartItem} from '../models/cart-item.interface';
import {TuiCurrencyPipe} from '@taiga-ui/addon-commerce';
import {ShoppingCartService} from '../service/shopping-cart.service';

@Component({
  selector: 'cart-item',
  imports: [
    TuiInputNumberModule,
    FormsModule,
    TuiCurrencyPipe,
    TuiInputRangeModule,
    TuiTextfieldControllerModule
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.less',
  providers: [
    tuiNumberFormatProvider({
      precision: 0,
    }),
    tuiInputNumberOptionsProvider({
      step: 1,
    }),
  ]
})
export class CartItemComponent {
  private readonly cartService = inject(ShoppingCartService);
  readonly item = model.required<ICartItem>();
  readonly finalPrice = linkedSignal(
    () => this.item().price * this.item().count
  );

  updateCount(count: number) {
    const item = this.item();

    item.count = count;

    this.finalPrice.set(count * item.price);

    this.cartService.updateCount(item.id, item.count);

    this.item.set(item);
  }
}
