import {Component, inject} from '@angular/core';
import {TuiCarouselButtons, TuiCarouselComponent} from '@taiga-ui/kit';
import {TuiButton} from '@taiga-ui/core';
import {TuiItem} from '@taiga-ui/cdk';
import {GiftCardComponent} from '../../../src/app/content/pages/main-page/components/gift-card/gift-card.component';
import {GiftsService} from '../../../src/app/services/gifts.service';
import {IGift} from '../models/gift.interface';
import {map, Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'recommended',
  imports: [
    TuiCarouselButtons,
    TuiButton,
    TuiCarouselComponent,
    TuiItem,
    GiftCardComponent,
    AsyncPipe
  ],
  templateUrl: './recommended.component.html',
  styleUrl: './recommended.component.less'
})
export class RecommendedComponent {
  private readonly giftsService = inject(GiftsService);

  readonly gifts: Observable<IGift[]> = this.giftsService.getAll().pipe(
    map(gifts => gifts.slice(0, 9))
  );
}
