import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ProductComponent } from '../components/product/product.component';
import { Product, ProductWidthId } from '../../types';
import { CommonModule } from '@angular/common';
import { ProductModalComponent } from '../components/product-modal/product-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, ProductModalComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  products: ProductWidthId[] = [];
  pagesNumbers: number[] = [];
  selectedProduct: ProductWidthId = {
    imgUrl: '',
    name: '',
    price: 0,
    rating: 0,
    id: 0,
  };
  displayEditDialog = false;
  displayAddDialog = false;
  constructor(private productService: ProductsService) {}

  openUpdateDialog(product: ProductWidthId) {
    this.selectedProduct = product;
    this.displayEditDialog = true;
  }

  openDeleteDialog(id: number) {
    this.deleteProduct(id);
  }

  openAddDialog() {
    this.displayAddDialog = true;
  }

  onConfirmUpdate(product: ProductWidthId) {
    this.updateProduct(product);
    this.displayEditDialog = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddDialog = false;
  }

  fetchProducts(page: number, perPage: number) {
    this.productService
      .getProducts({
        page,
        perPage,
      })
      .subscribe({
        next: (products) => {
          this.products = products.items;
          this.pagesNumbers = Array.from(
            { length: products.pages },
            (_, i) => i + 1
          );
        },
        error: (err) => console.log(err),
      });
  }

  onPageChange(page: number, rows: number) {
    this.fetchProducts(page, rows);
  }

  updateProduct(product: ProductWidthId) {
    this.productService.updateProduct(product).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err),
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => console.log(err),
    });
  }

  addProduct(product: Product) {
    this.productService.addProduct(product).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => console.log(err),
    });
  }

  ngOnInit() {
    this.fetchProducts(0, 5);
  }
}
