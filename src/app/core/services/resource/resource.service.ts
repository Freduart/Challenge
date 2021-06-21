import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Resource } from '../../models/resource.model';
import { Result } from '../../models/result.model';

export abstract class ResourceService<T extends Resource> {

  private API_URL = `${environment.apiUrl}/`;

  constructor(endpoint: string, protected httpClient: HttpClient) {
    this.API_URL = this.API_URL.concat(`${endpoint}/`)
  }

  getObjects(page: number = 1, page_size: number = 20): Observable<Result<T>> {
    return this.httpClient.get<Result<T>>(this.API_URL, {
      params: { page: page.toString(), page_size: page_size.toString()},
    });
  }

  getObject(id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.API_URL}${id}`);
  }

  updateObject(resource: T): Observable<T> {
    return this.httpClient.put<T>(`${this.API_URL}${resource.id}/`, resource);
  }

  postObject(resource: T): Observable<T> {
    return this.httpClient.post<T>(`${this.API_URL}`, resource);
  }

  deleteObjet(id:number):Observable<HttpResponse<never>>{
    return this.httpClient.delete<never>(`${this.API_URL}${id}`,{ observe: 'response'});
  }
}