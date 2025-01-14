import {Component, inject, input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiCheckbox} from '@taiga-ui/kit';
import {TuiScrollbar, TuiTextfieldComponent, TuiTextfieldDirective, TuiTextfieldOptionsDirective} from '@taiga-ui/core';
import {BehaviorSubject, distinctUntilChanged, map, Observable, takeUntil} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {DestroyService} from '../../../../../services/destroy.service';
import {IFilter} from './models/filter.interface';
import {FilterService} from '../../service/filter.service';

@Component({
  selector: 'filter',
  imports: [
    ReactiveFormsModule,
    TuiCheckbox,
    TuiTextfieldComponent,
    FormsModule,
    AsyncPipe,
    TuiTextfieldDirective,
    TuiTextfieldOptionsDirective,
    TuiScrollbar
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.less'
})
export class FilterComponent implements OnInit {
  readonly title = input.required<string>();
  readonly items = input.required<IFilter[]>();

  readonly searchFilterValue$ = new BehaviorSubject<string>('');

  readonly formBuilder = inject(FormBuilder);
  readonly destroy$ = inject(DestroyService);
  readonly filterService = inject(FilterService);

  items$!: Observable<IFilter[]>;

  protected form!: FormGroup;

  ngOnInit(): void {
    this.initForm();

    this.initItems();

    this.initListener();
  }

  updateSearchFilterValue(value: string): void {
    this.searchFilterValue$.next(value);
  }

  initItems(): void {
    this.items$ = this.searchFilterValue$.pipe(
      distinctUntilChanged(),
      map(search => this.filterCollection(this.items(), search))
    )
  }

  filterCollection(items: IFilter[], value: string): IFilter[] {
    const re = new RegExp(value, 'i');

    return items.filter(item => re.test(item.name));
  }

  initForm(): void {
    this.form = this.formBuilder.group({});

    for (let item of this.items()) {
      const control = this.formBuilder.control(false);
      this.form.addControl(item.id, control);
    }
  }

  clearForm(): void {
    for (let item of this.items()) {
      this.form.get(item.id)?.setValue(false);
    }
  }

  initListener(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      let applyFilters = [];
      for (let item in value) {
        if (value[item]) {
          applyFilters.push(item)
        }
      }

      this.filterService.updateFilters(this.title(), applyFilters)
    });
  }
}
