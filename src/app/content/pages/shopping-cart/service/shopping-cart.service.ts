import {inject, Injectable} from '@angular/core';
import {StorageService} from '../../../../../../public';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private readonly storageService = inject(StorageService);

  readonly count$ = this.storageService.cartCount$;

  clearCart(): void {
    this.storageService.clearStorage();
  }
}
