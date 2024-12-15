import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {BarComponent} from './components/bar/bar.component';
import {FilterComponent} from './components/filter/filter.component';
import {TuiInputRangeModule, TuiTextfieldControllerModule} from '@taiga-ui/legacy';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {TuiButton} from '@taiga-ui/core';

@Component({
    selector: 'main-page',
  imports: [
    BarComponent,
    FilterComponent,
    TuiInputRangeModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiButton,
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
  ]

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
