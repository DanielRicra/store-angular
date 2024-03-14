import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import {
  PaginationParams,
  Product,
  ProductList,
  ProductWidthId,
} from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly baseEndpoint = '/products';
  constructor(private apiService: ApiService) {}

  getProducts = (params: PaginationParams): Observable<ProductList> => {
    return this.apiService.get(this.baseEndpoint, {
      params,
      responseType: 'json',
    });
  };

  addProduct(body: Product): Observable<any> {
    return this.apiService.post(this.baseEndpoint, body, {});
  }

  updateProduct(body: ProductWidthId): Observable<any> {
    return this.apiService.put(`${this.baseEndpoint}/${body.id}`, body, {});
  }

  deleteProduct(id: number): Observable<void> {
    return this.apiService.delete(`${this.baseEndpoint}/${id}`, {});
  }
}
