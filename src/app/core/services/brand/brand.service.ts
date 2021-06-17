import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Brand } from '../../models/brand.model';
import { Result } from '../../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  static API_URL = `${environment.apiUrl}/brands/`;

  constructor(private httpClient: HttpClient) { }

  getBrands(page: number = 1, page_size: number = 20): Observable<Result<Brand>> {
    return this.httpClient.get<Result<Brand>>(BrandService.API_URL, {
      params: { page: page.toString(), page_size: page_size.toString()},
    });
  }
}