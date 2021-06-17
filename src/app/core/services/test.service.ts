import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private httpClient:HttpClient) { }

  //Aqui traemos el get de la API 
  r;
  getProduct(id:number=1293496):Observable<Product>{
    const ruta='https://drf-products-api.herokuapp.com/api/products/';
        
    return this.httpClient.get<Product>(ruta);    
  }
}
