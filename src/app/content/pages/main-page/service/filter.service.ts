import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private readonly filters = new Map<string, string[]>();

  updateFilters(title: string, item: string[]): void {
    this.filters.set(title, item);
  }

  getFilters(): string[] {
     let filters: string[] = [];

     for (let filter of this.filters.values()) {
       for (let item of filter) {
         filters.push(item);
       }
     }

   return filters;
  }

  clear(): void {
    this.filters.clear();
  }
}
