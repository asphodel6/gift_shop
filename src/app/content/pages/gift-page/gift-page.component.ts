import {Component, computed, inject, Injector, input, OnInit, signal} from '@angular/core';
import {TuiCurrencyPipe} from '@taiga-ui/addon-commerce';
import {TuiButton} from '@taiga-ui/core';
import {TuiTabs} from '@taiga-ui/kit';
import {MOCK_GIFT, StorageService} from '../../../../../public';
import {RecommendedComponent} from '../../../../../public/shared/recommended/recommended.component';
import {Router} from '@angular/router';
import {GiftsService} from '../../../services/gifts.service';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {map, switchMap, take} from 'rxjs';
import {IGift} from '../../../../../public/shared/models/gift.interface';
import {API_TOKEN} from '../../../auth/tokens/url.token';

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
export class GiftPageComponent implements OnInit {
  readonly id = input.required<string>();

  private readonly storageService = inject(StorageService);

  private readonly giftsService = inject(GiftsService);

  private readonly apiUrl = inject(API_TOKEN);

  private readonly injector = inject(Injector);

  mockGift!: IGift;

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

  ngOnInit(): void {
   toObservable(this.id, {injector: this.injector}).pipe(
     switchMap((id) => this.giftsService.getGiftsByIds([id]).pipe(
       take(1),
       map(item => item[0])
     ))
   ).subscribe(item => this.mockGift = item);
  }

  roundRating(number: number): string {
    return (number % 1) === 0 ? number.toFixed(0) : number.toFixed(1);
  }

  getImage(url: string): string {
    return `${this.apiUrl}api/file/${url}`
  }
}
