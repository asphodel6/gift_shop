import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FilterComponent} from './components/filter/filter.component';
import {TuiInputRangeModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {TuiAppearance, TuiButton} from '@taiga-ui/core';
import {GiftCardComponent} from './components/gift-card/gift-card.component';
import {MOCK_GIFT_MAIN} from '../../../../../public';

@Component({
    selector: 'main-page',
  imports: [
    FilterComponent,
    TuiInputRangeModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiButton,
    GiftCardComponent,
  ],
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.less'
})
export class MainPageComponent implements OnInit{
  readonly filters = [
    {
      title: 'Кому?',
      items: [
        'Маме',
        'Папе',
        'Подруге',
        'Другу'
      ]
    },
    {
      title: 'Какой повод?',
      items: [
        'День рождения',
        '8 марта',
        '23 февраля',
        'Новый год',
        '9 мая',
        'Рождество'
      ]
    },
    {
      title: 'Какого типа?',
      items: [
        'Практичные в быту',
        'С приколом',
        'На память',
        'Для творчества',
      ]
    },
  ];

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

  protected readonly minBudget= 0;
  protected readonly maxBudget= 100000;
  protected readonly sliderStep = 1000;
  protected readonly steps = (this.maxBudget - this.minBudget) / this.sliderStep;
  budgetControl!: FormControl;

  @ViewChildren(FilterComponent) filterComponents!: QueryList<FilterComponent>;

  ngOnInit(): void {
    this.initBudgetControl();
  }

  private initBudgetControl(): void {
    this.budgetControl = new FormControl([this.minBudget, this.maxBudget]);
  }

  clearFilters(): void {
    this.initBudgetControl();

   for (let component of this.filterComponents) {
     component.initForm();
     component.updateSearchFilterValue('');
   }
  }
}
