import {inject, Injectable} from '@angular/core';
import {StorageService} from '../../../../../../public';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private readonly storageService = inject(StorageService);

  readonly count$ = this.storageService.cartCount$;
  readonly cartItems$ = this.storageService.cartItems$;

  clearCart(): void {
    this.storageService.clearStorage();
  }

  updateCount(id: string, count: number): void {
    this.storageService.updateCount(id, count);
  }
}
