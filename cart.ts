import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../product';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent implements OnInit {
  product: Product | null = null;
  orderConfirmation: string = '';

  constructor (private productService: ProductService) {}

  ngOnInit (): void {
    this.productService.selectedProduct$.subscribe(product => {
      this.product = product;
    });
  }

  submitOrder (): void {
    if (this.product){
      const orderData = {
        productID: this.product.id,
        quantity: 1,
      };

      this.productService.placeOrder(orderData).subscribe({
        next: (response) =>{
          this.orderConfirmation = "Order Placed Successfully! Order ID: " + response.message;
        },
        error: (error) => {
          console.error("Error placing order:", error);
          this.orderConfirmation = "Failed to place order. Please try again.";
        }
      });
    }
  }
}
