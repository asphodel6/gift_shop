import {Component, computed, inject, input} from '@angular/core';
import {TuiCurrencyPipe} from '@taiga-ui/addon-commerce';
import {TuiButton} from '@taiga-ui/core';
import {TuiTabs} from '@taiga-ui/kit';
import {MOCK_GIFT, StorageService} from '../../../../../public';
import {RecommendedComponent} from '../../../../../public/shared/recommended/recommended.component';
import {Router} from '@angular/router';

@Component({
  selector: 'gift-page',
  imports: [
    TuiCurrencyPipe,
    TuiButton,
    TuiTabs,
    RecommendedComponent
  ],
  templateUrl: './gift-page.component.html',
  styleUrl: './gift-page.component.less'
})
export class GiftPageComponent {
  readonly id = input.required();

  readonly mockGift = MOCK_GIFT;

  private readonly storageService = inject(StorageService);

  activeItemIndex = 0;

  get ratingDescription(): string{
    if (this.mockGift.ratingCount > 10 && this.mockGift.ratingCount < 20 ) {
      return 'оценок';
    }

    const ratingCount = this.mockGift.ratingCount % 10;

    switch (ratingCount) {
      case 1: return 'оценка';
      case 2:
      case 3:
      case 4: return 'оценки';
      default: return 'оценок'
    }
  }

  protected addToCart(id: string): void {
    this.storageService.addGiftToCart(id);
  }
}
