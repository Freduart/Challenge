import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  static API_URL = `${environment.apiUrl}/products/`;

  constructor(private httpClient: HttpClient) {}

  getProducts(page: number = 1, page_size: number = 20): Observable<Result<Product>> {
    // const httpParams = new HttpParams().set('page', page.toString());
    return this.httpClient.get<Result<Product>>(ProductService.API_URL, {
      // params: httParams
      params: { page: page.toString(), page_size: page_size.toString()},
    }).pipe(
      // map((result: Result<Product>) => result.results)
      // map((result: Result<Product>) => {
      //   result.results.forEach((product: Product) => {
      //     const price = (+product.rawPrice)*0.9;
      //     product.rawPrice = price.toString();
      //   });
      //   return result;
      // }),
      tap((result: Result<Product>) => {
        result = {
          ...result,
          results: []
        };
        return result;
      })
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${ProductService.API_URL}${product.id}/`, product);
  }
}
