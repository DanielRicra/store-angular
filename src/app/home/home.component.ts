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
  perPage = 5;
  currentPage = 1;
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

  fetchProducts() {
    this.productService
      .getProducts({
        page: this.currentPage,
        perPage: this.perPage,
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

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchProducts();
  }

  updateProduct(product: ProductWidthId) {
    this.productService.updateProduct(product).subscribe({
      next: () => this.fetchProducts(),
      error: (err) => console.log(err),
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.currentPage = 1;
        this.fetchProducts();
      },
      error: (err) => console.log(err),
    });
  }

  addProduct(product: Product) {
    this.productService.addProduct(product).subscribe({
      next: () => {
        this.currentPage = 1;
        this.fetchProducts();
      },
      error: (err) => console.log(err),
    });
  }

  ngOnInit() {
    this.fetchProducts();
  }

  onChangePerPage(target: EventTarget | null) {
    if (!target) return;

    this.perPage = Number((target as HTMLSelectElement).value);
    this.currentPage = 1;
    this.fetchProducts();
  }
}
