import {Component, computed, input} from '@angular/core';
import {TuiCardLarge} from '@taiga-ui/layout';
import {TuiAppearance, TuiButton, TuiIcon} from '@taiga-ui/core';
import {CurrencyPipe, NgOptimizedImage} from '@angular/common';
import {TuiCurrencyPipe} from '@taiga-ui/addon-commerce';

@Component({
  selector: 'gift-card',
  imports: [TuiCardLarge, TuiAppearance, NgOptimizedImage, TuiButton, TuiCurrencyPipe],
  templateUrl: './gift-card.component.html',
  styleUrl: './gift-card.component.less'
})
export class GiftCardComponent {
  readonly image = input<string>('gift.png');
  readonly price = input.required<number>();
  readonly giftTitle = input.required<string>();
  readonly rating = input.required<number>();
  readonly ratingCount = input.required<number>();

  readonly ratingDescription = computed(() => {
    if (this.ratingCount() > 10 && this.ratingCount() < 20 ) {
      return 'оценок';
    }

    const ratingCount = this.ratingCount() % 10;

    switch (ratingCount) {
      case 1: return 'оценка';
      case 2:
      case 3:
      case 4: return 'оценки';
      default: return 'оценок'
    }
  })
}
