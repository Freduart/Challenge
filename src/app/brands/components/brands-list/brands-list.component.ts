import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Brand } from '@core/models/brand.model';


@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.css']
})
export class BrandsListComponent implements OnChanges {

  @Input()
  brands:Brand[]=[];
  @Output()
  brandDelete = new EventEmitter<Brand>();
  @Output()
  brandDetail = new EventEmitter<number>();
  @Output()
  brandUpdate = new EventEmitter<number>();
  displayedColumns=['id','name','actions'];
  dataSource:MatTableDataSource<Brand>=new MatTableDataSource();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Categories-list is working, now we need the categories");
    console.log("Aqui esta el listado de categorias");
    console.log(this.dataSource);
    const{ brands }=changes;
    if(brands){
      this.dataSource.data=this.brands;
    }
  }

}
