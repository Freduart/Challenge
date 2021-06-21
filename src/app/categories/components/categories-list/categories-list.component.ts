import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '@core/models/category.model';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnChanges {

  @Input()
  categories:Category[]=[];
  @Output() 
  categoryDelete = new EventEmitter<Category>();
  @Output() 
  categoryDetail = new EventEmitter<number>();
  @Output() 
  categoryUpdate = new EventEmitter<number>();
  displayedColumns=['id','name','main','actions'];
  dataSource:MatTableDataSource<Category>=new MatTableDataSource();

  
  constructor() { }

  ngOnChanges(changes:SimpleChanges): void {
    console.log("Categories-list is working, now we need the categories");
    console.log("Aqui esta el listado de categorias");
    console.log(this.dataSource);
    const{ categories }=changes;
    if(categories){
      this.dataSource.data=this.categories;
    }
  }

}
