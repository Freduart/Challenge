import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Brand } from '@core/models/brand.model';
import { Category } from '@core/models/category.model';
import { Product } from '@core/models/product.model';
import { Result } from '@core/models/result.model';
import { BrandService } from '@core/services/brand/brand.service';
import { CategoryService } from '@core/services/category/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  brands: Brand[] = [];
  filteredBrands: Observable<Brand[]> = of<Brand[]>([]);
  categories: Category[] = [];
  filteredCategories: Observable<Category[]> = of<Category[]>([]);

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private dialogRef: MatDialogRef<ProductFormComponent, Product>
  ) {}

  ngOnInit(): void {
    this.setupForm();
    console.log("Product Form works!")

    if (this.product) {
      this.productForm.patchValue(this.product);
    }
    this.categoryService
      .getObjects(1, 50)
      .subscribe((result: Result<Category>) => {
        this.categories = result.results;
        if (this.product) {
          const category = this.categories.find(
            (category: Category) => category.id === this.product.category.id
          );
          this.categoryControl.setValue(category?.id);
        }
      });
    this.brandService
      .getObjects(1, 50)
      .subscribe((result: Result<Brand>) => {
        this.brands = result.results;
        if (this.product) {
          const brand = this.brands.find(
            (brand: Brand) => brand.id === this.product.brand.id
          );
          this.brandControl.setValue(brand?.id);
        }
      });

    this.filteredBrands = this.brandControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) =>
        name ? this.filter(name, this.brands) : this.brands.slice()
      )
    );
    this.filteredCategories = this.categoryControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) =>
        name ? this.filter(name, this.categories) : this.categories.slice()
      )
    );
  }

  displayFn(resource: Brand | Category): string {
    return resource && resource.name ? resource.name : '';
  }

  private filter(
    name: string,
    resources: Brand[] | Category[]
  ): Brand[] | Category[] {
    const filterValue = name.toLowerCase();

    return resources.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  setupForm() {
    this.productForm = this.formBuilder.group({
      id: [null],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(150),
        ],
      ],
      category: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      currentPrice: [0, [Validators.required, Validators.min(0)]],
      rawPrice: [0, [Validators.required, Validators.min(0)]],
      discount: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      isNew: [true, [Validators.required]],
      model: ['', [Validators.required, Validators.maxLength(9)]],
      url: ['', [Validators.maxLength(200)]],
      imageUrl: ['', [Validators.maxLength(200)]],
    });
  }

  get brandControl(): FormControl {
    return this.productForm.get('brand') as FormControl;
  }

  get categoryControl(): FormControl {
    return this.productForm.get('category') as FormControl;
  }

  get nameControl(): FormControl {
    return this.productForm.get('name') as FormControl;
  }

  getControl(name: string): FormControl {
    return this.productForm.get(name) as FormControl;
  }

  onSubmit(): void {
    this.close(this.productForm.getRawValue());
  }

  close(product?: Product): void {
    this.dialogRef.close(product);
  }
}