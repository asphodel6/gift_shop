import {Component, inject, Injector, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FilterComponent} from './components/filter/filter.component';
import {TuiInputRangeModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {TuiAppearance, TuiButton} from '@taiga-ui/core';
import {GiftCardComponent} from './components/gift-card/gift-card.component';
import {DestroyService} from '../../../services/destroy.service';
import {takeUntil} from 'rxjs';
import {GiftsService} from '../../../services/gifts.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {API_TOKEN} from '../../../auth/tokens/url.token';
import {FilterService} from './service/filter.service';

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
  readonly destroy$ = inject(DestroyService);
  readonly giftsService = inject(GiftsService);
  readonly filters = [
    {
      title: 'Кому?',
      items: [
        {
          id: "girlfriend",
          name: "Подруге"
        },
        {
          id: "pap",
          name: "Папе"
        },
        {
          id: "mum",
          name: "Маме"
        },
        {
          id: "friend",
          name: "Другу"
        }
      ]
    },
    {
      title: 'Какой повод?',
      items: [
        {
          id: "birthday",
          name: "День рождения"
        },
        {
          id: "march8",
          name: "8 марта"
        },
        {
          id: "february23",
          name: "23 февраля"
        },
        {
          id: "new_year",
          name: "Новый год"
        },
        {
          id: "may9",
          name: "9 мая"
        },
        {
          id: "christmas",
          name: "Рождество"
        }
      ]
    },
    {
      title: 'Какого типа?',
      items: [
        {
          id: "practical",
          name: "Практичные в быту"
        },
        {
          id: "funny",
          name: "С приколом"
        },
        {
          id: "memorable",
          name: "На память"
        },
        {
          id: "creativity",
          name: "Для творчества"
        }

      ]
    },
  ];

  protected readonly minBudget= 0;
  protected readonly maxBudget= 100000;
  protected readonly sliderStep = 1000;
  protected readonly steps = (this.maxBudget - this.minBudget) / this.sliderStep;
  gifts = toSignal(this.giftsService.getAll());
  readonly filterService = inject(FilterService);
  private readonly injector = inject(Injector);

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
     component.clearForm();
     component.updateSearchFilterValue('');
   }

    this.filterService.clear();

    this.gifts = toSignal(this.giftsService.getAll(), {injector: this.injector});
  }

  applyFilters(): void {
    this.gifts = toSignal(
      this.giftsService.getAllWithFilters(
        this.filterService.getFilters(), this.budgetControl.value), {injector: this.injector}
    );
  }
}
