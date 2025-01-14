import {Component, computed, inject, input} from '@angular/core';
import {TuiCardLarge} from '@taiga-ui/layout';
import {TuiAppearance, TuiButton} from '@taiga-ui/core';
import {NgOptimizedImage} from '@angular/common';
import {TuiCurrencyPipe} from '@taiga-ui/addon-commerce';
import {StorageService} from '../../../../../../../public';
import {Router} from '@angular/router';
import {API_TOKEN} from '../../../../../auth/tokens/url.token';

@Component({
  selector: 'gift-card',
  imports: [TuiCardLarge, TuiAppearance, NgOptimizedImage, TuiButton, TuiCurrencyPipe],
  templateUrl: './gift-card.component.html',
  styleUrl: './gift-card.component.less'
})
export class GiftCardComponent {
  readonly image = input<string>('gift.png');
  readonly id = input.required<string>();
  readonly price = input.required<number>();
  readonly giftTitle = input.required<string>();
  readonly rating = input.required<number>();
  readonly ratingCount = input.required<number>();
  private readonly storageService = inject(StorageService);
  private readonly router = inject(Router);
  readonly apiUrl = inject(API_TOKEN);

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

  protected addToCart(event: Event): void {
    this.storageService.addGiftToCart(this.id());
    event.stopPropagation();
  }

  protected navigateToGift(): void {
    this.router.navigate(['main/gift', this.id()]);
  }

  roundRating(number: number): string {
    return (number % 1) === 0 ? number.toFixed(0) : number.toFixed(1);
  }

  getImage(url: string): string {
    return `${this.apiUrl}api/file/${url}`
  }
}
