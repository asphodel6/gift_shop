import {Component, inject, input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiCheckbox} from '@taiga-ui/kit';
import {TuiScrollbar, TuiTextfieldComponent, TuiTextfieldDirective, TuiTextfieldOptionsDirective} from '@taiga-ui/core';
import {BehaviorSubject, distinctUntilChanged, map, Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

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
  readonly items = input.required<string[]>();

  readonly searchFilterValue$ = new BehaviorSubject<string>('');

  readonly formBuilder = inject(FormBuilder);

  items$!: Observable<string[]>;

  protected form!: FormGroup;

  ngOnInit(): void {
    this.initForm();

    this.initItems();
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

  filterCollection(items: string[], value: string): string[] {
    const re = new RegExp(value, 'i');

    return items.filter(item => re.test(item));
  }

  initForm(): void {
    this.form = this.formBuilder.group({});

    for (let i = 0; i < this.items().length; i++) {
      const control = this.formBuilder.control(false);
      this.form.addControl(i.toString(), control);
    }
  }
}
