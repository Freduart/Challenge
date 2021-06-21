import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../../models/brand.model';
import { ResourceService } from '../resource/resource.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService extends ResourceService<Brand>{

  constructor(protected httpClient: HttpClient) {
    super('brands',httpClient);
  }
}