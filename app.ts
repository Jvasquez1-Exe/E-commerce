import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLink} from '@angular/router';
import { ProductService, Product } from './product';
import {Router} from "@angular/router";
import { NgIf, NgFor, CommonModule } from '@angular/common'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true

})
export class AppComponent implements OnInit{
  products: Product[] = [];
  title = "Online-Store";

  constructor(private productService: ProductService,
    public router: Router
  ){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = Array.isArray(data) ? data : this.createMockProduct();
      },
      
      error: (error) => {
        console.error('Error fetching products:', error);
        this.products = this.createMockProduct();
      }

    }) 
  }

  onBuyClick(product: Product): void{
    this.productService.selectProduct(product);
    this.router.navigate(['/cart']);
  }

  getsproductCount(): number{
    return this.productService.getselectedProduct() ? 1:0;
  }

  private createMockProduct(): Product[]{
    return[
      {id: 1, name: "MockPrd 1", description: "Mock Description 1", image: "FerrariDaytona(Lego).jpg", price: 179.99},
      {id: 2, name: "MockPrd 2", description: "Mock Description 2", image: "FordGt-40(Lego).jpg", price: 225.99},
      {id: 3, name: "MockPrd 3", description: "Mock Description 3", image: "LamborghiniCountach(Lego).jpg", price: 325.99},
      {id: 4, name: "MockPrd 4", description: "Mock Description 4", image: "Porsche911-GT3rs(Lego).jpg", price: 185.99},
    ]
  }
}