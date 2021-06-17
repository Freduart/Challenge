import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/core/models/product.model';
import { Result } from 'src/app/core/models/result.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  static API_URL=`${environment.apiUrl}/products/`;
  observable: Observable<number>=of<number>(10);

  constructor(private httpClient:HttpClient) { }

  //Con get obtenemos la lista de recursos asociada al sustantivo 
  // The observer pattern is a software design pattern in which an object, called the subject, maintains 
  // a list of its dependents, called observers, and notifies them automatically of state changes. 
  getProducts(page:number=1, pagesize:number=20):Observable<Result<Product>>{
    return this.httpClient.get<Result<Product>>(ProductService.API_URL, {
      params: {
        page: page.toString(),
        pagesize: pagesize.toString(),
      }
    })
  }

  getProduct(id:number): Observable<Product> {
    return this.httpClient.get<Product>(`${ProductService.API_URL}${id}/`);
  }

  deleteProduct(id: number): Observable<HttpResponse<never>>{
    return this.httpClient.delete<never>(
      `${ProductService.API_URL}${id}/`,{ observe: 'response' }
    );
  }

  updateProduct(product:Product): Observable<Product> {
    return this.httpClient.put<Product>(
      `${ProductService.API_URL}${product.id}/`,product
    );
  }

  postProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${ProductService.API_URL}`, product);
  }
}
