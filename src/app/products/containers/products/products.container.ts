import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Observer, PartialObserver } from 'rxjs';
import { Product } from '@core/models/product.model';
import { Result } from '@core/models/result.model';
import { ProductDeleteComponent } from '../../components/product-delete/product-delete.component';
import { ProductDetailComponent } from '../../components/product-detail/product-detail.component';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.container.html',
  styleUrls: ['./products.container.css'],
})
export class ProductsContainer implements OnInit {
  result: Result<Product> = undefined;
  private detailProductObserver: PartialObserver<Product> = {
    next: (product: Product) => {
      const dialogRef = this.matDialog.open(ProductDetailComponent, {
        data: product,
      });
      dialogRef.afterClosed().subscribe({
        next: (resp: { edit: boolean }) => {
          if (resp?.edit) {
            this.openForm(product);
          }
        },
      });
    },
    error: () => {},
    complete: () => {},
  };

  private updateProductObserver: PartialObserver<Product> = {
    next: (product: Product) => {
      this.openForm(product);
    },
    error: () => {},
    complete: () => {},
  };

  constructor(
    private matDialog: MatDialog,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getProductsPage(0);
    console.log("Container works!");
  }

  getProductsPage(pageEvent: PageEvent | number): void {
    const number =
      (typeof pageEvent === 'number' ? pageEvent : pageEvent.pageIndex) + 1;
    let pageSize = 20;
    if (typeof pageEvent !== 'number') {
      pageSize = pageEvent.pageSize;
    }
    this.productService
      .getProducts(number, pageSize)
      .subscribe((result: Result<Product>) => {
        this.result = result;
      });
  }

  updateProduct(id: number): void {
    this.productService.getProduct(id).subscribe(this.updateProductObserver);
  }

  deleteProduct(product: Product): void {
    this.openConfirmation(product);
  }

  detailProduct(id: number): void {
    this.productService.getProduct(id).subscribe(this.detailProductObserver);
  }

  openConfirmation(product: Product): void {
    const dialogRef = this.matDialog.open(ProductDeleteComponent, {
      data: product,
      minWidth: '50%',
      maxWidth: '600px',
    });
    dialogRef.afterClosed().subscribe((id?: number) => {
      if (id) {
        this.productService
          .deleteProduct(id)
          .subscribe({
            next: (response: HttpResponse<never>) => {
              console.log(response);
              const { results } = this.result;
              this.result.results = results.filter((product: Product) => product.id !== id);
            },
            error: (response: HttpErrorResponse) => {
              if (response.status === 404) {

              }
            }
          });
      }
    });
  }

  openForm(product?: Product) {
    const dialogRef = this.matDialog.open(ProductFormComponent, {
      data: product,
      minWidth: '50%',
      maxWidth: '600px',
    });
    dialogRef.afterClosed().subscribe((modalProduct?: Product) => {
      if (modalProduct) {
        if (modalProduct.id) {
          this.productService
            .updateProduct(modalProduct)
            .subscribe((updatedProduct: Product) => {
              const index = this.result.results.findIndex((product: Product) => product.id === updatedProduct.id);
              if (index >= 0) {
                this.result.results[index] = updatedProduct;
              }
            });
        } else {
          this.productService
            .postProduct(modalProduct)
            .subscribe((newProduct: Product) =>
              this.result.results.push(newProduct)
            );
        }
      }
    });
  }
}