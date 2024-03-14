import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductWidthId } from '../../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
})
export class ProductComponent {
  @Input() product!: ProductWidthId;
  @Output() update: EventEmitter<ProductWidthId> =
    new EventEmitter<ProductWidthId>();
  @Output() delete = new EventEmitter<number>();
  ratingStarts: Boolean[] = Array(5).fill(false);

  updateProduct() {
    this.update.emit(this.product);
  }

  deleteProduct() {
    this.delete.emit(this.product.id);
  }

  ngOnInit() {
    for (let i = 0; i < this.product.rating; i++) {
      this.ratingStarts[i] = true;
    }
  }
}
