import {Component, inject, linkedSignal, OnDestroy, OnInit, signal} from '@angular/core';
import {TuiCheckbox} from '@taiga-ui/kit';
import {TuiButton} from '@taiga-ui/core';
import {FormsModule} from '@angular/forms';
import {ShoppingCartService} from './service/shopping-cart.service';
import {AsyncPipe} from '@angular/common';
import {Router} from '@angular/router';
import {RecommendedComponent} from '../../../../../public/shared/recommended/recommended.component';
import {CartItemComponent} from './cart-item/cart-item.component';
import {ICartItem} from './models/cart-item.interface';
import {Subject, switchMap, takeUntil, withLatestFrom} from 'rxjs';
import {GiftsService} from '../../../services/gifts.service';

@Component({
  selector: 'shopping-cart',
  imports: [
    TuiCheckbox,
    TuiButton,
    FormsModule,
    AsyncPipe,
    RecommendedComponent,
    CartItemComponent
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.less'
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  private readonly cartService = inject(ShoppingCartService);
  private readonly router = inject(Router);
  readonly giftsService = inject(GiftsService);
  private readonly destroy$ = new Subject<void>();

  selectedAll = false;

  readonly count$ = this.cartService.count$;
  readonly storageItems$ = this.cartService.cartItems$;
  readonly cartItems = signal<ICartItem[]>([]);

  readonly orderLabels = ['Количество товаров',
    'Стоимость доставки',
    'Бонусов доступно',
    'Списать бонусы'
  ]

  readonly finalPrice = signal<number>(0);

  clearCart(): void {
    this.cartService.clearCart();
  }

  toMain(): void {
    this.router.navigate(['main']);
  }

  ngOnInit(): void {
    this.storageItems$.pipe(takeUntil(this.destroy$),
      switchMap(items => {
        console.log(items);
         return  this.giftsService.getGiftsByIds(items.map(item => item.id)).pipe(
            withLatestFrom(this.storageItems$)
          )
        }
      )
      )
      .subscribe(([items, storageItems]) => {
        const gifts: ICartItem[] = [];
        let price = 0;
        let newItem: ICartItem;
        for (const item of items) {
         let storageItem = storageItems.find(elem => elem.id === item.id) ;

          // @ts-ignore
          price = price + item.price * storageItem.count;

          newItem = {
            ...item,
            count: storageItem?.count ?? 1
          }

          gifts.push(newItem);

        }

        this.finalPrice.set(price);
        this.cartItems.set(gifts)
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
