import { Component } from '@angular/core';
import {TuiCarouselButtons, TuiCarouselComponent} from '@taiga-ui/kit';
import {TuiButton} from '@taiga-ui/core';
import {TuiItem} from '@taiga-ui/cdk';
import {MOCK_GIFT_MAIN} from '../temp/mocks';
import {GiftCardComponent} from '../../../src/app/content/pages/main-page/components/gift-card/gift-card.component';

@Component({
  selector: 'recommended',
  imports: [
    TuiCarouselButtons,
    TuiButton,
    TuiCarouselComponent,
    TuiItem,
    GiftCardComponent
  ],
  templateUrl: './recommended.component.html',
  styleUrl: './recommended.component.less'
})
export class RecommendedComponent {
  readonly gifts =
    Array(10)
      .fill(0)
      .map((_, index) => {
        const gift = {
          ...MOCK_GIFT_MAIN
        };

        gift.id = String(index);

        return gift;
      });
}
