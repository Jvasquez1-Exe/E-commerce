import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';


export interface Product{
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}


@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private productsUrl:  string ="http://localhost:3000/api/products";
  private orderUrl: string = "http://localhost:3000/api/submit-order";

  private selectedProduct = new BehaviorSubject < Product | null > (null);
  selectedProduct$ = this.selectedProduct.asObservable();

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]> (this.productsUrl);
  }

  selectProduct(product: Product): void {
    this.selectedProduct.next(product);
  }

  placeOrder(orderInfo: any): Observable<any>{
    return this.http.post(this.orderUrl, orderInfo);
  }

  getselectedProduct(): Product | null{
    return this.selectedProduct.getValue();
  }
}
