import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '@core/models/product.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnChanges {
  @Input()
  products: Product[] = [];
  @Output()
  productDelete = new EventEmitter<Product>();
  @Output()
  productDetail = new EventEmitter<number>();
  @Output()
  productUpdate = new EventEmitter<number>();
  displayedColumns = ['id', 'name', 'brand', 'category', 'currentPrice', 'actions'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {        
    console.log("Aqui esta el listado de productos");
    console.log(this.dataSource);
    const { products } = changes;
    if (products) {      
      this.dataSource.data = this.products;
    }
  }

}