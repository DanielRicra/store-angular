import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductWidthId } from '../../../types';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss',
})
export class ProductModalComponent {
  @Input() title!: string;
  @Input() display: boolean = false;
  @Input() selectedProduct: ProductWidthId = {
    imgUrl: '',
    name: '',
    price: 0,
    rating: 0,
    id: 0,
  };
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<ProductWidthId>();

  constructor(private formBuilder: FormBuilder) {}

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*_+=\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );

      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }

  productForm = this.formBuilder.group({
    name: ['', [Validators.required, this.specialCharacterValidator()]],
    imgUrl: [''],
    price: [0, [Validators.required]],
    rating: [1, [Validators.required]],
  });

  onConfirm() {
    const { name, imgUrl, price, rating } = this.productForm.value;
    this.confirm.emit({
      name: name ?? '',
      imgUrl: imgUrl ?? '',
      price: price ? Number(price) : 0,
      rating: rating ? Number(rating) : 1,
      id: this.selectedProduct.id,
    });
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  ngOnChanges() {
    this.productForm.patchValue(this.selectedProduct);
  }
}
