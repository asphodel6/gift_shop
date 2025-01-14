import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IGift} from '../../../public/shared/models/gift.interface';
import {API_TOKEN} from '../auth/tokens/url.token';

@Injectable({
  providedIn: 'root'
})
export class GiftsService {
  private readonly http = inject(HttpClient);
  private readonly url = inject(API_TOKEN);

  private readonly api = `${this.url}api/products`;

  getGiftsByIds(ids: string[]): Observable<IGift[]> {
    return this.http.get<IGift[]>(`${this.api}`, {params: {ids: ids}});
  }

  getAll(): Observable<IGift[]> {
    return this.http.get<IGift[]>(`${this.api}/all`);
  }

  getAllWithFilters(filters: string[], budget: string[]): Observable<IGift[]> {
    return this.http.get<IGift[]>(`${this.api}/all`, {
      params: {
        tags: filters,
        priceMin: budget[0],
        priceMax: budget[1]
      }
    });
  }
}
