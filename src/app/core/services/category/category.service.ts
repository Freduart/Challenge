import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../models/category.model';
import { ResourceService } from '../resource/resource.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ResourceService<Category> {
  constructor(protected httpClient: HttpClient) {
    super('categories', httpClient);
  }
}