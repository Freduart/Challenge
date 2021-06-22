import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Category } from '@core/models/category.model';
import { Result } from '@core/models/result.model';
import { CategoryService } from '@core/services/category/category.service';
import { PartialObserver } from 'rxjs';
import { CategoryDeleteComponent } from '../../components/category-delete/category-delete.component';
import { CategoryDetailComponent } from '../../components/category-detail/category-detail.component';
import { CategoryFormComponent } from '../../components/category-form/category-form.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.container.html',
  styleUrls: ['./categories.container.css']
})
export class CategoriesContainer implements OnInit {
  result:Result<Category>=undefined;
  private detailCategoryObserver:PartialObserver<Category>={
    next:(category:Category)=>{
      const dialogRef=this.matDialog.open(CategoryDetailComponent, {
        data:category,
      });
      dialogRef.afterClosed().subscribe({
        next:(resp:{
          edit:boolean
        })=>{
          if(resp?.edit){
            this.openForm(category);
          }
        }
      });
    },
    error:()=>{},
    complete: ()=>{},
  };

  private updateCategoryObserver:PartialObserver<Category>={
    next:(category:Category)=>{
      this.openForm(category);
    },
    error:()=>{},
    complete: ()=>{},
  }

  constructor(private matDialog:MatDialog, private categoryService:CategoryService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCategoryPage(0);
    console.log("We're in the container too");
    
  }

  getCategoryPage(pageEvent:PageEvent | number):void{
    const number=(typeof pageEvent==='number'?pageEvent:pageEvent.pageIndex)+1;
    let pageSize=100;
    if(typeof pageEvent !=='number'){
      pageSize=pageEvent.pageSize;
    }
    this.categoryService.getObjects(number,pageSize).subscribe((result:Result<Category>)=>{
      this.result=result;
    });
  }

  updateCategory(id:number):void{
    this.categoryService.getObject(id).subscribe(this.updateCategoryObserver);
  }

  deleteCategory(category:Category):void{
    this.openConfirmation(category);
  }

  detailCategory(id:number):void{
    this.categoryService.getObject(id).subscribe(this.detailCategoryObserver);
  }

  openConfirmation(category:Category):void{
    const dialogRef=this.matDialog.open(CategoryDeleteComponent,{
      data:category,
      minWidth: '50%',
      maxWidth: '600px',
    });
    dialogRef.afterClosed().subscribe((id?:number)=>{
      if(id){
        this.categoryService.deleteObjet(id).subscribe({
          next:(response:HttpResponse<never>)=>{
            console.log(response);
            const{results}=this.result;
            this.result.results=results.filter((category:Category)=>category.id!==id);
          },
          error:(response:HttpErrorResponse)=>{
            if(response.status===400){

            }
          }
        });
      }
    });
  }

  openForm(category?:Category){
    const dialogRef=this.matDialog.open(CategoryFormComponent,{
      data:category,
      minWidth:'50%',
      maxWidth:'600px',
    });
    dialogRef.afterClosed().subscribe((modalCategory?:Category) => {
      if(modalCategory){
        if(modalCategory.id){
          this.categoryService
          .updateObject(modalCategory)
          .subscribe((updatedCategory:Category)=>{
            const index=this.result.results.findIndex((category:Category) => category.id === updatedCategory.id);
            if(index>=0){
              this.result.results[index]=updatedCategory;
            }
          });
        }else{
          this.categoryService.postObject(modalCategory).subscribe((newCategory: Category) => this.result.results.push(newCategory));
        } 
      }
    });
  }
}
