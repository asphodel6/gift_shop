import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, first} from 'rxjs';
import {TuiAlertService} from '@taiga-ui/core';

interface IStorageItem {
  id: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  readonly cartCount$ = new BehaviorSubject<number>(this.getGifts().length);
  readonly cartItems$ = new BehaviorSubject<IStorageItem[]>(this.getGifts());
  private readonly alerts = inject(TuiAlertService);

  addGiftToCart(id: string): void {
    let gifts: IStorageItem[] = this.getGifts();

    if (gifts.length > 0) {
      const index = gifts.findIndex(gift => gift.id === id)

      if (index >= 0) {
        gifts[index].count++;

        this.setGifts(gifts)
      }
      else {
        gifts.push({id: id, count: 1});

        this.setGifts(gifts)
      }
    } else {
      this.setGifts([{id: id, count: 1}])
    }

    this.alerts.open('Подарок успешно добавлен в корзину', {appearance: 'positive'}).pipe(
      first()
    ).subscribe()
  }

  clearStorage(): void {
    localStorage.removeItem('gifts');

    this.cartCount$.next(0);

    this.alerts.open('Корзина отчищена', {appearance: 'info'}).pipe(
      first()
    ).subscribe()
  }

  private setGifts(gifts: IStorageItem[]): void {
    localStorage.setItem('gifts', JSON.stringify(gifts));

    this.cartCount$.next(gifts.length);
    this.cartItems$.next(gifts);
  }

  private getGifts(): IStorageItem[] {
    const gifts = localStorage.getItem('gifts');

    if (gifts) {
      return JSON.parse(gifts) as IStorageItem[];
    }

    return [];
  }

  updateCount(id: string, count: number): void {
    let gifts: IStorageItem[] = this.getGifts();

    const index = gifts.findIndex(gift => gift.id === id);

    if (index >= 0) {
      if (count > 0) {
        gifts[index].count = count;
      }

      this.setGifts(gifts)
    }
  }
}
