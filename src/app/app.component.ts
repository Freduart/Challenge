import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Product } from './core/models/product.model';
import { Result } from './core/models/result.model';
import { ProductService } from './products/service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'hello-world';
  result: Result<Product> = undefined;
  productControl = new FormControl('');
  filteredOptions: Observable<Product[]> = of([]);
  displayedColumns = ['id', 'name', 'brand', 'category', 'currentPrice'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();
  navLinks: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService) {
    this.navLinks = [
      {
          label: 'Products',
          link: './products',
          index: 0          
      }, {
          label: 'Variants',
          link: './variants',
          index: 1
      }, {
          label: 'Brands',
          link: './brands',
          index: 2
      }, 
  ];
  }

  ngOnInit(): void {
    // this.getProductsPage(0);    
    this.filteredOptions = this.productControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filter(name) : this.result?.results.slice())
      );
  }

  getProductsPage(pageEvent: PageEvent | number): void {
    const number = (typeof pageEvent === 'number' ? pageEvent : pageEvent.pageIndex) + 1;
    let pageSize = 3000;
    if (typeof pageEvent !== 'number') {
      pageSize = pageEvent.pageSize;
    }
    this.productService.getProducts(number, pageSize).subscribe((result: Result<Product>) => {
      this.result = result;
      this.dataSource = new MatTableDataSource<Product>(this.result?.results);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  displayFn(product: Product): string {
    return product && product.name ? product.name : '';
  }

  private filter(name: string): Product[] {
    const filterValue = name.toLowerCase();

    return this.result?.results.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  updateProduct(product: Product): void {
    console.log(product);
    this.productService.updateProduct(product).subscribe((product: Product) => console.log(product));
  }
}