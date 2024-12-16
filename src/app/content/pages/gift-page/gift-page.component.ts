import {Component, computed, input} from '@angular/core';
import {TuiCurrencyPipe} from '@taiga-ui/addon-commerce';

@Component({
  selector: 'gift-page',
  imports: [
    TuiCurrencyPipe
  ],
  templateUrl: './gift-page.component.html',
  styleUrl: './gift-page.component.less'
})
export class GiftPageComponent {
  readonly id = input.required();

  readonly mockGift = {
    price: 499,
    title: 'Свечка в форме котика',
    rating: 4.9,
    ratingCount: 11,
    info: [
      {label: 'Название бренда', value: 'Нет'},
      {label: 'Происхождение', value: 'Китай'},
      {label: 'Материал', value: 'Смола'},
      {label: 'Стиль', value: 'Современный'},
      {label: 'Размер', value: '6 х 6 см'},
      {label: 'Количество', value: '1'}
    ]
  };

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
}
