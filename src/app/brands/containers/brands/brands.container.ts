import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Brand } from '@core/models/brand.model';
import { Result } from '@core/models/result.model';
import { BrandService } from '@core/services/brand/brand.service';
import { PartialObserver } from 'rxjs';
import { BrandDeleteComponent } from '../../components/brand-delete/brand-delete.component';
import { BrandDetailComponent } from '../../components/brand-detail/brand-detail.component';
import { BrandFormComponent } from '../../components/brand-form/brand-form.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.container.html',
  styleUrls: ['./brands.container.css']
})
export class BrandsContainer implements OnInit {
  result: Result<Brand>=undefined;

  private detailBrandObserver:PartialObserver<Brand>={
    next:(brand:Brand)=>{
      const dialogRef=this.matDialog.open(BrandDetailComponent,{
        data:brand,
      });
      dialogRef.afterClosed().subscribe({
        next:(resp:{
          edit:boolean
        })=>{
          if(resp?.edit){
            this.openForm(brand);
          }
        }
      });
    },
    error:()=>{},
    complete:()=>{},
  };

  private updateBrandObserver:PartialObserver<Brand>={
    next:(brand:Brand)=>{
      this.openForm(brand);
    },
    error:()=>{},
    complete:()=>{},
  }

  constructor(private matDialog:MatDialog, private brandService:BrandService) { }

  ngOnInit(): void {
    console.log("Brands Container Works!")
    this.getBrandPage(0);
  }

  getBrandPage(pageEvent:PageEvent | number):void{
    const number=(typeof pageEvent==='number'?pageEvent:pageEvent.pageIndex)+1;
    let pageSize=100;
    if(typeof pageEvent!=='number'){
      pageSize=pageEvent.pageSize;
    }
    // Al observable de serices le mandamos el numero de pagina y el tamaño de los items que queremos solicitar
    this.brandService.getObjects(number, pageSize).subscribe((result:Result<Brand>)=>{
      this.result=result;
    });
  }

  detailBrand(id:number):void{
    this.brandService.getObject(id).subscribe(this.detailBrandObserver);
  }

  updateBrand(id:number):void{
    this.brandService.getObject(id).subscribe(this.updateBrandObserver);
  }

  deleteBrand(brand:Brand):void{
    this.openConfirmation(brand);
  }

  openConfirmation(brand:Brand):void{    
    const dialogRef=this.matDialog.open(BrandDeleteComponent,{
      data:brand,
      minWidth:'50%',
      maxWidth:'600px',
    });
    dialogRef.afterClosed().subscribe((id?:number)=>{
      if(id){
        this.brandService.deleteObjet(id).subscribe({
          next:(response:HttpResponse<never>)=>{
            console.log(response);
            const{results}=this.result;
            this.result.results=results.filter((brand:Brand)=>brand.id!==id);
          },
          error:(response:HttpErrorResponse)=>{
            if(response.status===400){

            }
          }
        });
      }
    });
  }

  openForm(brand?:Brand){
    const dialogRef=this.matDialog.open(BrandFormComponent,{
      data:brand,
      minWidth:'50%',
      maxWidth:'600px',
    });
    dialogRef.afterClosed().subscribe((modalBrand?:Brand) =>{
      if(modalBrand){
        if(modalBrand.id){
          this.brandService.updateObject(modalBrand).subscribe((updatedBrand:Brand)=>{
            const index=this.result.results.findIndex((brand:Brand)=> brand.id===updatedBrand.id);
            if(index>=0){
              this.result.results[index]=updatedBrand;
            }
          });
        }else{
          this.brandService.postObject(modalBrand).subscribe((newBrand:Brand)=>this.result.results.push(newBrand));
        }
      }
    });
  }
}
